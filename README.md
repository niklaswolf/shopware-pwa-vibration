# Shopware PWA Vibration

This plugin provides [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) functionality for [Shopware PWA](https://github.com/vuestorefront/shopware-pwa) using its [interceptor feature](https://shopware-pwa-docs.vuestorefront.io/landing/concepts/interceptor.html#usage-examples). This works as an progressive enhancement: if the feature is not supported by the clients browser or the used device does not have a vibration feature (e.g. notebooks), this plugin will do nothing.

## Setup

1. Installation from npm: `npm install shopware-pwa-vibration` or `yarn add shopware-pwa-vibration`
2. Add a new Nuxt plugin, e.g.:

```js
// src/plugins/vibration.js
import vibration from 'shopware-pwa-vibration';

export default ({ app }) => {
  vibration(app); // using defaults
  vibration(app, options); // using custom options, see "Options"
};
```

3. Add the new plugin in `nuxt.config.js`. It's important that the **mode** is set to **client**, so that the code only ends up in the client bundle and therefore only runs on the client side.

```js
// nuxt.config.js
...
plugins: [{ src: '~/plugins/vibration', mode: 'client' }],
...
```

## Options

You can customize some of the behaviour of this plugin using the following options:

### vibrationEvents

Array of `VibrationEvent` objects that are used to configure the vibration events (when should the device vibrate) and patterns (how should the device vibrate)

Per default the device vibrates when:

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
import vibration from 'shopware-pwa-vibration';

export default ({ app }) => {
  vibration(app, [
    {
      interceptorKey: INTERCEPTOR_KEYS.ADD_TO_CART,
      pattern: [200, 500, 200], // Vibrate 200ms, 500ms pause, vibrate another 200ms
    },
  ]);
};
```

## Trigger vibration programatically

This package also exports the `vibrate` function itself to use it anywhere in your application.

```js
import { vibrate } from 'shopware-pwa-vibration';

vibrate(); // uses default vibration pattern
vibrate(pattern); // custom vibration pattern, see options
```

## Supported Browsers

This depends obviously on the current status of [browser compatibility for the Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Browser_compatibility).
Also this is mostly relevant on mobile devices, so here's the compatibility in short (last time I checked):

- ✅ Android Browsers
- ❌ Safari & iOS Safari
