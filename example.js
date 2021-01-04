// src/plugins/vibration.js
import { INTERCEPTOR_KEYS } from '@shopware-pwa/composables';
import { vibration } from 'shopware-pwa-vibration';

export default ({ app }) => {
  vibration(app, [
    {
      interceptorKey: INTERCEPTOR_KEYS.ADD_TO_CART,
      pattern: [200, 500, 200], // Vibrate 200ms, 500ms pause, vibrate another 200ms
    },
  ]);
};
