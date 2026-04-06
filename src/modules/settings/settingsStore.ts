import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  intakeGoal: number;
  wakeUpTime: string; // ISO String for time persisting
  sleepTime: string;  // ISO String for time persisting
  smartReminders: boolean;

  setIntakeGoal: (goal: number) => void;
  setWakeUpTime: (time: Date) => void;
  setSleepTime: (time: Date) => void;
  setSmartReminders: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      intakeGoal: 2000,
      wakeUpTime: new Date(new Date().setHours(6, 0, 0, 0)).toISOString(),
      sleepTime: new Date(new Date().setHours(20, 0, 0, 0)).toISOString(),
      smartReminders: false,

      setIntakeGoal: (goal) => set({ intakeGoal: goal }),
      setWakeUpTime: (time) => set({ wakeUpTime: time.toISOString() }),
      setSleepTime: (time) => set({ sleepTime: time.toISOString() }),
      setSmartReminders: (enabled) => set({ smartReminders: enabled }),
    }),
    {
      name: 'ptos-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
