import { useState, useCallback, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export function useWaterIntake() {
    const db = useSQLiteContext();
    const [dailyTotal, setDailyTotal] = useState<number>(0);

    const fetchDailyTotal = useCallback(async () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

        try {
            const result = await db.getFirstAsync<{ total: number }>(
                'SELECT SUM(amount) as total FROM water_logs WHERE timestamp >= ? AND timestamp <= ?',
                [startOfDay, endOfDay]
            );
            setDailyTotal(result?.total || 0);
        } catch (e) {
            console.error('Failed to fetch daily total', e);
            setDailyTotal(0);
        }
    }, [db]);

    const addIntake = async (amount: number) => {
        try {
            await db.runAsync(
                'INSERT INTO water_logs (amount, timestamp) VALUES (?, ?)',
                [amount, Date.now()]
            );
            fetchDailyTotal();
        } catch (e) {
            console.error('Failed to add intake', e);
        }
    };

    useEffect(() => {
        fetchDailyTotal();
    }, [fetchDailyTotal]);

    return {
        dailyTotal,
        addIntake,
        fetchDailyTotal,
    };
}
