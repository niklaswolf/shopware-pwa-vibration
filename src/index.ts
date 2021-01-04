import { useIntercept, ApplicationVueContext } from '@shopware-pwa/composables';
import { DEFAULT_PATTERN, DEFAULT_VIBRATION_EVENTS } from './defaults';

export type VibrationPattern = number | number[];
export interface VibrationEvent {
  interceptorKey: string;
  pattern?: VibrationPattern;
}

function vibration(
  appContext: ApplicationVueContext,
  vibrationEvents: VibrationEvent[] = DEFAULT_VIBRATION_EVENTS
) {
  const { intercept } = useIntercept(appContext);

  for (const vibrationEvent of vibrationEvents) {
    let pattern: VibrationPattern = DEFAULT_PATTERN;
    if (vibrationEvent.pattern) {
      pattern = vibrationEvent.pattern;
    }
    intercept(vibrationEvent.interceptorKey, () => vibrate(pattern));
  }
}
export default vibration;

/**
 * Triggers the vibration if supported.
 * @param {number|Array} pattern see https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Describing_vibrations
 */
export const vibrate = (pattern: VibrationPattern = DEFAULT_PATTERN) => {
  console.log('Vibrate brrrr');
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
