# Shopware PWA Vibration

This provides [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) functionality for [Shopware PWA](https://github.com/vuestorefront/shopware-pwa) using its interceptor feature.

## Setup

1. Installation from npm: `npm install shopware-pwa-vibration` or `yarn add shopware-pwa-vibration`
2. Add a new Nuxt plugin, e.g.:

```js
// src/plugins/vibration.js
import { vibration } from 'shopware-pwa-vibration';

export default ({ app }) => {
  vibration(app); // using defaults
  vibration(app, options); // using custom options, see "Options"
};
```

3. Add the new plugin in `nuxt.config.js`

```js
// nuxt.config.js
...
plugins: [{ src: '~/plugins/vibration', mode: 'client' }],
...
```

## Options

This plugin ships with the following options:

### vibrationEvents

Array of `VibrationEvent` objects that are used to configure the vibration events (when should the device vibrate) and patterns (how should the device vibrate)

Default: vibrate when:

- adding a product to cart
- adding a promotion code

```js
[
  {
    interceptorKey: INTERCEPTOR_KEYS.ADD_TO_CART,
  },
  {
    interceptorKey: INTERCEPTOR_KEYS.ADD_PROMOTION_CODE,
  },
];
```

#### VibrationEvent

| Property       | required | default | description                                                                                                             |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| interceptorKey | yes      |         | event when the device should vibrate                                                                                    |
| pattern        | no       | 100     | vibration pattern description, see https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Describing_vibrations |

## Example

Here is an example only vibrating on "add to cart" with a custom vibration pattern:

```js
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
```

## Supported Browsers

This depends obviously on the current status of [browser compatibility for the Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Browser_compatibility).
Also this is mostly relevant on mobile devices, so here's the compatibility in short ast time I checked:

- ✅ Android Browsers
- ❌ Safari & iOS Safari
