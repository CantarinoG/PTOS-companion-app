export interface MacroResult {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
}

const GEMINI_MODEL = 'gemini-3.1-flash-lite-preview';

const SYSTEM_PROMPT = `You are a professional nutritionist with deep knowledge of food composition.
When given a meal description, estimate its macronutrient content.
Respond ONLY with a valid JSON object — no explanation, no markdown, no code blocks.
The JSON must have exactly these keys: calories (kcal), carbs (grams), protein (grams), fat (grams).
Base your estimates on standard portion sizes if not specified.
Example response: {"calories":450,"carbs":55,"protein":30,"fat":14}`;

export async function extractMacros(description: string, apiKey: string): Promise<MacroResult> {
    if (!apiKey) {
        throw new Error('No API key configured. Please add your Gemini API key in Settings.');
    }

    if (!description.trim()) {
        throw new Error('Please describe your meal before extracting macros.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const body = {
        contents: [
            {
                parts: [
                    { text: `${SYSTEM_PROMPT}\n\nMeal: ${description}` }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 100,
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const message = error?.error?.message || `HTTP ${response.status}`;
        throw new Error(`Gemini API error: ${message}`);
    }

    const data = await response.json();
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    const cleaned = text.replace(/```json?/gi, '').replace(/```/g, '').trim();

    let macros: MacroResult;
    try {
        macros = JSON.parse(cleaned);
    } catch {
        throw new Error('Could not parse the AI response. Please try a different description.');
    }

    return {
        calories: Math.round(Number(macros.calories) || 0),
        carbs: Math.round(Number(macros.carbs) || 0),
        protein: Math.round(Number(macros.protein) || 0),
        fat: Math.round(Number(macros.fat) || 0),
    };
}
