# typio

> Lightweight Customizable Performant WYSIWYG Rich Text Editor

This text editor is indended to be similar to Medium's text editor in appearance and is intended for
use in a blog type website with limited and opinionated styling options for creating a cohesive
website look i.e. only one font-family, font color, etc... per document.

The editor features a floating or set toolbar with your choice of text styling buttons.

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

A primary goal of this editor is to internally represent any text in only one way, here is an
example of what is avoided: 

|HTML DOM |Render |
|:----------------------------------:|:----------------------------:|
|`<strong><em>word</em></strong>`|<strong><em>word</em></strong>|
|`<em><strong>word</strong></em>`|<em><strong>word</strong></em>|

these two would display the same way but have different internal representations. View types.d.ts
for the current data structure representing the text document.

Unlike other lightweight editors, this does not use the deprecated document.execCommand().

Currently this project is focused on use as a Svelte component, and may or may not work in vanilla
JS, though full support is planned.
