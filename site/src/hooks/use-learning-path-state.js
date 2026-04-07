import { useEffect, useState } from 'react';
import { readStorageJson, writeStorageJson } from '../lib/browser-runtime.js';

export function useLearningPathState() {
  const [pathProgress, setPathProgress] = useState(() => readStorageJson('java-book-learning-paths', {}));

  useEffect(() => {
    writeStorageJson('java-book-learning-paths', pathProgress);
  }, [pathProgress]);

  function toggleStep(pathId, stepId) {
    setPathProgress((current) => {
      const existing = Array.isArray(current[pathId]) ? current[pathId] : [];
      return {
        ...current,
        [pathId]: existing.includes(stepId)
          ? existing.filter((item) => item !== stepId)
          : [...existing, stepId]
      };
    });
  }

  function resetPath(pathId) {
    setPathProgress((current) => ({
      ...current,
      [pathId]: []
    }));
  }

  function isStepDone(pathId, stepId) {
    return Array.isArray(pathProgress[pathId]) && pathProgress[pathId].includes(stepId);
  }

  return {
    pathProgress,
    toggleStep,
    resetPath,
    isStepDone
  };
}
