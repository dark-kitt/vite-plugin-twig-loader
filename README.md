# vite-plugin-twig-loader

[Vite](https://github.com/vitejs/vite) plugin for [Twig](https://github.com/twigjs/twig.js/). This plugin is based on the [vite-plugin-twig](https://github.com/fiadone/vite-plugin-twig) plugin.

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

## Storybook Stories Supports

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
The plugin can be configured both via the *twig.config.js* file from the project root or by passing a configuration object directly as argument to the function above.

Here below the list of the supported options.

#### `index`
__type__ `[key: string]: string`

__default__ `null`

Option to define `src/template/index.twig` file. *NOTE: the vite index.html file is required.*

#### `filters`
__type__ `{ [key: string]: (...args: any[]) => any }`

__default__ `{}`

A collection of custom filters to extend *Twig*. Look at [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/Extending-twig.js) to learn more.

#### `functions`
__type__ `{ [key: string]: (...args: any[]) => any }`

__default__ `{}`

A collection of custom functions to extend *Twig*. Look at [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/Extending-twig.js) to learn more.

#### `globals`
__type__ `{ [key: string]: any }`

__default__ `{}`

The global variables to be injected in each template.

#### `settings`
__type__ `{ [key: string]: any }`

__default__ `{}`

The *Twig* settings. Please refer to [*twig.js* documentation](https://github.com/twigjs/twig.js/wiki/) to learn more.
