/**
 * NOTE: 計算処理のロジックを記述
 */

import { useCallback } from 'react';

export const useCalculationFuncs = () => {
  // TODO: bmiの計算は要検討
  const idealBodyWeight = useCallback((height: number, weight: number) => {
    const heightSquared = (height / 100) ** 2;
    const appropriateWeight = heightSquared * 22;
    const cosmeticWeight = heightSquared * 20;
    const cinderellaWeight = heightSquared * 18;

    return {
      appropriateWeight: appropriateWeight.toFixed(1),
      cosmeticWeight: cosmeticWeight.toFixed(1),
      cinderellaWeight: cinderellaWeight.toFixed(1),
    };
  }, []);

  return { idealBodyWeight };
};
