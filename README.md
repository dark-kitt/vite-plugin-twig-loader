# vite-plugin-twig-loader

A [Vite](https://github.com/vitejs/vite) plugin to load [Twig](https://github.com/twigjs/twig.js/) files.

---

## Installation
```shell
yarn add -D vite-plugin-twig-loader
```

```shell
npm i vite-plugin-twig-loader --save-dev
```

## Usage

```js
/* vite.config.js */
const twig = require('vite-plugin-twig-loader');

module.exports = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      twig()
    ]
  };
})
```

### Config
The plugin can be configured via the *twig.config.js* file from the project root directory or by passing a configuration object directly as an argument to the function above.

## Usage: Storybook

```js
/* path/to/App.stories.js */
import Twig from 'twig';
// Vue App
// index.js => createApp(App).mount('#app');
import App from './index.js';
import AppTwig, { path, ctx, globals, settings } from './App.html.twig';

export default {
  title: 'Apps',
  component: App
};

const Template = (args) => ({
  components: { App },
  setup() {
    return { args };
  },
  template: Twig.twig({data: ctx}).render(args)
});

export const AppStorie = Template.bind({});

AppStorie.args = {
  primary: true
};

AppStorie.parameters = { layout: 'fullscreen' };
AppStorie.storyName = 'My example App';
```
or
```js
/* path/to/Button.stories.js */
import Twig from 'twig';
import Button, { path, ctx, globals, settings } from './Button.html.twig';

export default {
  title: 'Components/Atom',
  component: Button
};

const Template = (args) => ({
  template: Twig.twig({data: ctx}).render(args)
});

export const ButtonStorie = Template.bind({});

ButtonStorie.args = {
  primary: true
};

ButtonStorie.parameters = { layout: 'fullscreen' };
ButtonStorie.storyName = 'My Button';
```

### Options
Below is a list of the supported options.

#### `index`
__type__ `string`

__default__ `null`

Option to define a file path for the main entry point (e.g. `src/template/index.twig`). *NOTE: the vite index.html file is required.*

#### `filters`
__type__ `object`

__default__ `{}`

A collection of custom filters to extend *Twig*. Take a look at [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/Extending-twig.js) to learn more.

#### `functions`
__type__ `object`

__default__ `{}`

A collection of custom functions to extend *Twig*. Find out more at [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/Extending-twig.js).

#### `globals`
__type__ `object`

__default__ `{}`

Global variables are injected into each template.

#### `settings`
__type__ `object`

__default__ `{}`

*Twig* settings. Please, take a look at [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/).

---

This plugin is based on the [vite-plugin-twig](https://github.com/fiadone/vite-plugin-twig) plugin.