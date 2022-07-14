# typio

> Lightweight, Robust, Customizable, Performant WYSIWYG Editor for the Web

This is a customizable Medium-style text editor.

## Install

```bash
$ npm i @typio/typio
```

## Usage

This is a **[SvelteKit](https://github.com/sveltejs/kit)** component.

<!-- , but also works great in **vanilla JS**. -->

Once you've installed the package, start using it with the following code:

<!-- ### Svelte -->

`index.svelte`:

```html
<script>
    import { Typio } from '@typio/typio'
</script>

<Typio class="my-typio-classname" preset="default" />
```

<!--
### JS

`index.js`:

```js
import typio from '@typio/typio'

const typio = new typio({
    // initialize editor on some HTMLElement
    target: document.getElementById('typio-wrapper')
})
```

## CDN Usage

Or if you want to use the package without npm, you can use the following code:

`index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@typio/typio/@0.1.0"></script>

<script>
    const typio = new typio({
        // initialize editor on some HTMLElement
        target: document.getElementById('typio-wrapper')
    })
</script>

<div id="typio-wrapper" />
``` -->

## About

The design of this editor is based on principles from [this blog post](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480). A primary goal of is to internally represent any text in only one way; here is an example of what is avoided:

|             HTML DOM             |             Render             |
| :------------------------------: | :----------------------------: |
| `<strong><em>word</em></strong>` | <strong><em>word</em></strong> |
| `<em><strong>word</strong></em>` | <em><strong>word</strong></em> |

these two are displayed by the browser the same yet have different internal representations, which can lead to an inconsistent and undefined user experience. View [types.d.ts](https://github.com/typio/typio/blob/main/src/lib/types.d.ts)
for the current data structure representing the text document. This data structure is edited by the user directly which is then written to the HTML DOM.

**Unlike other lightweight editors, this does not use the deprecated `document.execCommand()`.**

Currently this project intended for use as a Svelte component. It may or may not work in vanilla
JS, though full support is planned.