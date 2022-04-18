# vite-plugin-twig-loader

[Vite](https://github.com/vitejs/vite) plugin for [Twig](https://github.com/twigjs/twig.js/).

This plugin is based on the [vite-plugin-twig](https://github.com/fiadone/vite-plugin-twig) plugin.

---

## Installation
```shell
# no npm available
```

Currently, only `git clone` is possible.

## Usage

```js
/* vite.config.js */
const twig = require('./.vite/plugins/vite-plugin-twig-loader');

module.exports = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      twig()
    ]
  };
})
```

## NOTE: Supports Storybook Stories

```js
/* path/to/App.stories.js */
import Twig from 'twig';

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
The plugin can be configured both via the *twig.config.js* file from the project root or by passing a configuration object directly as argument to the function above (in this last case, the configuration file will be ignored).

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


### Templates
The *html* files located by default in the *Vite* project root are not intented to be replaced directly by the *twig* ones as the normal page files resolution/linking on the *Vite*'s dev server is wanted to be preserved along with the build logic. However, those files are supposed to contain a json definition instead of the traditional markup, which should be moved on the *twig* side.

More in details, a *html* file should be empty.

Where `template` is the path of the *twig* template to be rendered (relative to the *cwd*), and `data` is the local context for that page (eventually merged with the *globals* provided via plugin options).