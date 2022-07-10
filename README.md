# typio

> Lightweight Aesthetic WYSIWYG Rich Text Editor

## Install

```bash
$ npm i @typio/typio
```

## Basic Usage

Once you've installed the package, import and use the component:

### Svelte

`index.svelte`:
```html
<script>
    import typio as Editor from '@typio/typio'
</script>

<Editor />
```

### JS

`index.js`:
```js
import typio from '@typio/typio'

const typio = new typio({
    // initialize editor on some HTMLElement
    target: document.getElementById('typio-wrapper')
})
```