import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { STAGES, ACHIEVEMENTS } from '../data/stages.js';

const STORAGE_KEY = 'journey-best-memory:v1';

const defaultState = {
  introSeen: false,
  firstGiftOpened: false,
  completedStages: [],
  unlockedAchievements: [],
  gameHighScore: 0
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const markIntroSeen = useCallback(() => {
    setState((s) => ({ ...s, introSeen: true }));
  }, []);

  const openFirstGift = useCallback(() => {
    setState((s) => ({
      ...s,
      firstGiftOpened: true,
      unlockedAchievements: s.unlockedAchievements.includes('firstGift')
        ? s.unlockedAchievements
        : [...s.unlockedAchievements, 'firstGift']
    }));
  }, []);

  const completeStage = useCallback((stageId) => {
    setState((s) => {
      if (s.completedStages.includes(stageId)) return s;
      const completedStages = [...s.completedStages, stageId];
      const allDone = STAGES.every((st) => completedStages.includes(st.id));
      const unlockedAchievements = allDone && !s.unlockedAchievements.includes('journeyComplete')
        ? [...s.unlockedAchievements, 'journeyComplete']
        : s.unlockedAchievements;
      return { ...s, completedStages, unlockedAchievements };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    setState((s) =>
      s.unlockedAchievements.includes(achievementId)
        ? s
        : { ...s, unlockedAchievements: [...s.unlockedAchievements, achievementId] }
    );
  }, []);

  const setGameHighScore = useCallback((score) => {
    setState((s) => ({ ...s, gameHighScore: Math.max(s.gameHighScore, score) }));
  }, []);

  const isStageUnlocked = useCallback(
    (stageId) => {
      const idx = STAGES.findIndex((s) => s.id === stageId);
      if (idx <= 0) return true;
      const prevStage = STAGES[idx - 1];
      return state.completedStages.includes(prevStage.id);
    },
    [state.completedStages]
  );

  const value = {
    ...state,
    stages: STAGES,
    achievements: ACHIEVEMENTS,
    markIntroSeen,
    openFirstGift,
    completeStage,
    unlockAchievement,
    setGameHighScore,
    isStageUnlocked
  };

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney يجب أن يُستخدم داخل JourneyProvider');
  return ctx;
}
