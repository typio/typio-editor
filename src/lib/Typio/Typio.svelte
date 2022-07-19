<script lang="ts">
    import boldIcon from '$lib/static/boldIcon.svg'
    import italicIcon from '$lib/static/italicIcon.svg'
    import dropcapIcon from '$lib/static/dropcapIcon.svg'
    import linkIcon from '$lib/static/linkIcon.svg'
    import quoteIcon from '$lib/static/quoteIcon.svg'
    import headingIcon from '$lib/static/headingIcon.svg'
    import subheadingIcon from '$lib/static/subheadingIcon.svg'
    import undoIcon from '$lib/static/undoIcon.svg'
    import redoIcon from '$lib/static/redoIcon.svg'

    import '$lib/Typio/app.css'

    import type { Text, Features, TextDocument } from '$lib/types'

    let className = 'typio'
    export { className as class }

    type Command = {
        [name: string]: {
            icon: {
                type: string
                src: string
            }
            command: string
        }
    }

    const commands: Command = {
        bold: {
            icon: {
                type: 'svg',
                src: boldIcon,
            },
            command: 'bold',
        },
        italic: {
            icon: {
                type: 'svg',
                src: italicIcon,
            },
            command: 'italic',
        },
        underline: {
            icon: {
                type: 'html',
                src: '<u>U</u>',
            },
            command: 'underline',
        },
        strike: {
            icon: {
                type: 'html',
                src: '<s>S</s>',
            },
            command: 'strike',
        },
        link: {
            icon: {
                type: 'svg',
                src: linkIcon,
            },
            command: 'link',
        },
        code: {
            icon: {
                type: 'html',
                src: 'C',
            },
            command: 'code',
        },
        blockquote: {
            icon: {
                type: 'svg',
                src: quoteIcon,
            },
            command: 'blockquote',
        },
        heading: {
            icon: {
                type: 'svg',
                src: headingIcon,
            },
            command: 'heading',
        },
        subheading: {
            icon: {
                type: 'svg',
                src: subheadingIcon,
            },
            command: 'subheading',
        },
        oList: {
            icon: {
                type: 'html',
                src: '1.',
            },
            command: 'redo',
        },
        uList: {
            icon: {
                type: 'html',
                src: '&#8226',
            },
            command: 'uList',
        },
        dropCap: {
            icon: {
                type: 'svg',
                src: dropcapIcon,
            },
            command: 'dropCap',
        },
        undo: {
            icon: {
                type: 'svg',
                src: undoIcon,
            },
            command: 'undo',
        },
        redo: {
            icon: {
                type: 'svg',
                src: redoIcon,
            },
            command: 'redo',
        },
    }

    type Preset = { [name: string]: string }
    const presets: Preset = {
        default: 'floating-b-i-l-q-h-sh-limpl-dc-undo-redo',
        default_set: 'set-b-i-l-q-h-sh-limpl-dc-undo-redo',
        full: 'set-b-i-u-l-c-s-q-h-sh-ol-ul-dc-undo-redo',
    }

    const settings: string =
        $$restProps.settings ?? presets[$$restProps.preset] ?? presets['default']

    const enabledFeatures: Features = (() => {
        type Map = { [name: string]: string }
        const mapping: Map = {
            b: 'bold',
            i: 'italic',
            u: 'underline',
            s: 'strike',
            l: 'link',
            c: 'code',
            q: 'blockquote',
            h: 'heading',
            sh: 'subheading',
            ol: 'oList',
            ul: 'uList',
            limpl: 'listImplicit',
            dc: 'dropCap',
        }

        const features: Features = {
            bold: false,
            italic: false,
            underline: false,
            strike: false,
            link: false,
            code: false,
            blockquote: false,
            heading: false,
            subheading: false,
            oList: false,
            uList: false,
            listImplicit: false,
            dropCap: false,
        }

        settings.split('-').forEach((key) => {
            if (mapping[key] && mapping[key] in features) {
                features[mapping[key] as keyof Features] = true
            }
        })

        return features
    })()

    const toolbar = {
        type: settings.toLowerCase().includes('floating') ? 'floating' : 'set',
        style: 'display: none;',
        pos: { x: 0, y: 0 },
        marginY: 63,
    }
    const showUndo = settings.toLowerCase().includes('undo')
    const showRedo = settings.toLowerCase().includes('redo')

    let textDocument: TextDocument = {
        title: 'Tile',
        subtitle: 'Subtitle',
        sections: [
            [
                {
                    pTexts: [
                        { textContent: 'This is the ', types: ['strike'] },
                        { textContent: 'default ', types: ['bold', 'italic'] },
                        { textContent: 'text', types: ['italic'] },
                        { textContent: '. Here is ', types: [] },
                        {
                            textContent: 'google.com',
                            types: ['link'],
                            href: 'https://google.com',
                        },
                        { textContent: '.', types: [] },
                    ],
                    type: 'default',
                    attrs: {
                        dropCap: true,
                    },
                    contentType: 'paragraph',
                },
                {
                    href: 'https://www.fillmurray.com/100/100',
                    caption: [
                        { textContent: 'Ca', types: ['bold'] },
                        {
                            textContent: 'pti',
                            types: ['bold', 'italic', 'link'],
                            href: 'https://www.fillmurray.com/',
                        },
                        { textContent: 'on', types: ['italic'] },
                    ],
                    alt: 'Image alt text',
                    contentType: 'figure',
                },
            ],
        ],
    }

    const parseText = (textArr: Text[]) =>
        textArr
            .map((text) => {
                let { textContent } = text
                const { href } = text
                text.types.forEach((type) => {
                    if (type === 'bold' && enabledFeatures.bold) {
                        textContent = `<strong>${textContent}</strong>`
                    }
                    if (type === 'italic' && enabledFeatures.italic) {
                        textContent = `<em>${textContent}</em>`
                    }
                    if (type === 'underline' && enabledFeatures.underline) {
                        textContent = `<u>${textContent}</u>`
                    }
                    if (type === 'strike' && enabledFeatures.strike) {
                        textContent = `<s>${textContent}</s>`
                    }
                    if (type === 'link' && enabledFeatures.link) {
                        textContent = `<a href="${href}">${textContent}</a>`
                    }
                })
                return textContent
            })
            .join('')

    /**
     * Generate HTML DOM from internal text document model
     * @param textDoc
     */
    const parseDocument = (textDoc: TextDocument) => {
        let dom = ''
        dom += `<h1>${textDoc.title}</h1>`
        dom += `<h2>${textDoc.subtitle}</h2>`
        textDoc.sections?.forEach((section, sectionIdx) => {
            dom += `<section class="${sectionIdx}nth">`
            section.forEach((paraOrFig, paraOrFigIdx) => {
                if (paraOrFig.contentType === 'paragraph') {
                    dom += `<p 
                    class="${paraOrFigIdx}nth ${
                        paraOrFig.attrs?.dropCap ? 'dropCap' : ''
                    }">
                         ${parseText(paraOrFig.pTexts)}
                         </p>`
                } else if (paraOrFig.contentType === 'figure') {
                    dom += `<figure class="${paraOrFigIdx}nth">`
                    dom += `<img src="${paraOrFig.href}" alt="${paraOrFig.alt}">`
                    const { caption } = paraOrFig
                    if (caption) {
                        dom += `<figcaption>${parseText(caption)}</figcaption>`
                    }
                    dom += '</figure>'
                }
            })
            dom += '</section>'
        })
        return dom
    }

    const parseDOMText = (parentNode: HTMLElement): Text[] => {
        const texts: Text[] = []
        parentNode.childNodes.forEach((child, index) => {
            let element = child // avoids param reassignment
            const textContent = element.textContent ?? ''
            const types: string[] = []
            let href: Text['href'] = ''
            while (element.firstChild != null) {
                if (element.nodeName === 'STRONG') {
                    types.push('bold')
                } else if (element.nodeName === 'EM') {
                    types.push('italic')
                } else if (element.nodeName === 'U') {
                    types.push('underline')
                } else if (element.nodeName === 'S') {
                    types.push('strike')
                } else if (element.nodeName === 'A') {
                    types.push('link')
                    href = (element as HTMLAnchorElement).href
                }
                element = element.firstChild
            }
            texts[index] = {
                textContent,
                types: types as Text['types'],
                href,
            }
        })
        return texts
    }

    /**
     * Generate internal text document model from an HTML DOM
     * @param dom
     */
    const parseDOM = (dom: HTMLDivElement): TextDocument => {
        const textDoc: TextDocument = {
            title: dom.querySelector('h1')?.textContent ?? '',
            subtitle: dom.querySelector('h2')?.textContent ?? '',
            sections: [],
        }

        dom.querySelectorAll('section').forEach((section) => {
            section.childNodes.forEach((child) => {
                if (child.nodeName === 'P') {
                    const p = child as HTMLParagraphElement
                    const dropCap = p.classList.contains('dropCap')
                    const pTexts: Text[] = parseDOMText(p)
                    textDoc.sections.push([
                        {
                            pTexts,
                            type: 'default',
                            attrs: {
                                dropCap,
                            },
                            contentType: 'paragraph',
                        },
                    ])
                } else if (child.nodeName === 'FIGURE') {
                    const fig = child as HTMLElement
                    const href = fig.querySelector('img')?.src ?? ''
                    const alt = fig.querySelector('img')?.alt
                    const caption: Text[] = parseDOMText(
                        fig.querySelector('figcaption') ?? fig,
                    )
                    textDoc.sections.push([
                        {
                            href,
                            caption,
                            alt,
                            contentType: 'figure',
                        },
                    ])
                }
            })
        })

        return textDoc
    }

    // const format = (sectionIdx, paragraphIdx, startChar, endChar, command) => {}

    const positionToolbar = () => {
        const selection = window.getSelection()
        if (selection && selection?.toString().length > 0) {
            const range = selection.getRangeAt(0)
            const rect = range.getBoundingClientRect()
            toolbar.pos = {
                x: rect.left + (rect.right - rect.left) / 2,
                y: rect.top,
            }
            toolbar.style = `top: ${toolbar.pos.y - toolbar.marginY}px; left: ${
                toolbar.pos.x
            }px;`
        } else {
            toolbar.style = 'display: none'
        }
    }

    const buttonList = Object.entries(enabledFeatures)
        .filter((item) => item[1] && item[0] !== 'listImplicit')
        .map((item) => item[0])
    if (showUndo) buttonList.push('undo')
    if (showRedo) buttonList.push('redo')

    let dom: HTMLDivElement
    let html = parseDocument(textDocument)
</script>

<!-- @component
A WYSIWYG rich text editor component.
- Usage:
    ```js
    <Typio class="my-custom-class" preset="default" | settings="set-b-i-l-h-sh-ol_implicit-undo-redo"/>
    ```
-->
<div class={`${className} typio`} {...$$restProps}>
    <div
        class="typio-toolbar {toolbar.type}"
        style={(() => (toolbar.type === 'floating' ? toolbar.style : ''))()}>
        {#each buttonList as c}
            <button class="btn" on:click={() => positionToolbar()}>
                {#if commands[c]?.icon.type === 'svg'}
                    <img src={commands[c]?.icon?.src} alt="" />
                {:else}
                    {@html commands[c]?.icon?.src}
                {/if}
            </button>
        {/each}
        {#if toolbar.type === 'floating'}
            <span class="typio-toolbar-arrow" />
        {/if}
    </div>

    <!-- mouseup for showing the menu -->
    <!-- mouseleave to help clean it up when it shouldn't be showing -->
    <div
        class="typio-editor"
        on:mouseup={positionToolbar}
        on:mouseleave={positionToolbar}
        on:keydown={(e) => {
            if (e.key === 'Escape') {
                // bring dom and textDocument into sync, by updating textDocument to match dom visually
                textDocument = parseDOM(dom)
                html = parseDocument(textDocument)
            }
        }}
        bind:this={dom}
        contenteditable="true">
        {@html html}
    </div>
</div>
