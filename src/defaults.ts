import { INTERCEPTOR_KEYS } from '@shopware-pwa/composables';
import { VibrationEvent, VibrationPattern } from './index';

export const DEFAULT_VIBRATION_EVENTS: VibrationEvent[] = [
  {
    interceptorKey: INTERCEPTOR_KEYS.ADD_TO_CART,
  },
  {
    interceptorKey: INTERCEPTOR_KEYS.ADD_PROMOTION_CODE,
  },
];
export const DEFAULT_PATTERN: VibrationPattern = 100;
