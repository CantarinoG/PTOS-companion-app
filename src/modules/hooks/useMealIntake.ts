import { useState, useCallback, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export interface MealLog {
    id: number;
    description: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    timestamp: number;
}

export interface MealTotals {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
}

export function useMealIntake() {
    const db = useSQLiteContext();
    const [dailyTotals, setDailyTotals] = useState<MealTotals>({ calories: 0, carbs: 0, protein: 0, fat: 0 });
    const [meals, setMeals] = useState<MealLog[]>([]);

    const fetchDailyTotals = useCallback(async () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

        try {
            const result = await db.getFirstAsync<MealTotals>(
                `SELECT 
                    SUM(calories) as calories,
                    SUM(carbs) as carbs,
                    SUM(protein) as protein,
                    SUM(fat) as fat
                FROM meal_logs WHERE timestamp >= ? AND timestamp <= ?`,
                [startOfDay, endOfDay]
            );
            setDailyTotals({
                calories: result?.calories || 0,
                carbs: result?.carbs || 0,
                protein: result?.protein || 0,
                fat: result?.fat || 0,
            });
        } catch (e) {
            console.error('Failed to fetch daily meal totals', e);
        }
    }, [db]);

    const fetchMeals = useCallback(async () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

        try {
            const result = await db.getAllAsync<MealLog>(
                'SELECT * FROM meal_logs WHERE timestamp >= ? AND timestamp <= ? ORDER BY timestamp DESC',
                [startOfDay, endOfDay]
            );
            setMeals(result);
        } catch (e) {
            console.error('Failed to fetch meals', e);
        }
    }, [db]);

    const addMeal = async (
        description: string,
        calories: number,
        carbs: number,
        protein: number,
        fat: number,
    ) => {
        try {
            await db.runAsync(
                'INSERT INTO meal_logs (description, calories, carbs, protein, fat, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
                [description, calories, carbs, protein, fat, Date.now()]
            );
            fetchDailyTotals();
            fetchMeals();
        } catch (e) {
            console.error('Failed to add meal', e);
        }
    };

    useEffect(() => {
        fetchDailyTotals();
        fetchMeals();
    }, [fetchDailyTotals, fetchMeals]);

    return {
        dailyTotals,
        meals,
        addMeal,
        fetchDailyTotals,
        fetchMeals,
    };
}
