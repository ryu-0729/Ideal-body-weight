/**
 * NOTE: 計算処理のロジックを記述
 */

import { useCallback } from 'react';

export const useCalculationFuncs = () => {
  const idealBodyWeight = useCallback((height: number, weight: number) => {
    const heightSquared = (height / 100) ** 2;
    const bmi = weight / heightSquared;
    const appropriateWeight = heightSquared * 22;
    const cosmeticWeight = heightSquared * 20;
    const cinderellaWeight = heightSquared * 18;

    return {
      bmi: bmi.toFixed(1),
      appropriateWeight: appropriateWeight.toFixed(1),
      cosmeticWeight: cosmeticWeight.toFixed(1),
      cinderellaWeight: cinderellaWeight.toFixed(1),
    };
  }, []);

  return { idealBodyWeight };
};
