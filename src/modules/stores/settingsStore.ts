import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  caloriesGoal: number;
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
  apiKey: string;

  intakeGoal: number;
  wakeUpTime: string; // ISO String for time persisting
  sleepTime: string;  // ISO String for time persisting
  smartReminders: boolean;

  setCaloriesGoal: (goal: number) => void;
  setCarbsGoal: (goal: number) => void;
  setProteinGoal: (goal: number) => void;
  setFatGoal: (goal: number) => void;
  setApiKey: (key: string) => void;
  setIntakeGoal: (goal: number) => void;
  setWakeUpTime: (time: Date) => void;
  setSleepTime: (time: Date) => void;
  setSmartReminders: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      caloriesGoal: 2000,
      carbsGoal: 200,
      proteinGoal: 100,
      fatGoal: 67,
      apiKey: '',

      intakeGoal: 2000,
      wakeUpTime: new Date(new Date().setHours(6, 0, 0, 0)).toISOString(),
      sleepTime: new Date(new Date().setHours(20, 0, 0, 0)).toISOString(),
      smartReminders: false,

      setCaloriesGoal: (goal) => set({ caloriesGoal: goal }),
      setCarbsGoal: (goal) => set({ carbsGoal: goal }),
      setProteinGoal: (goal) => set({ proteinGoal: goal }),
      setFatGoal: (goal) => set({ fatGoal: goal }),
      setApiKey: (key) => set({ apiKey: key }),
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
