# Storybook Chartlib Addon

This addon is used to preview charts in storybook

```sh
yarn add storybook-addon-chartlib --dev
```

Add this line to your `addons.js` file

```js
import 'storybook-addon-chartlib/register';
```

Use this hook to a custom webpack.config. This will generate a decorator call in every story:

```js
module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('storybook-addon-chartlib/loader')],
    enforce: 'pre',
  });

  return config;
};
```
