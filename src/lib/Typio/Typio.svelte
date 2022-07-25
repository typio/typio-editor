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

    import type {
        TextDocumentRange,
        Text,
        Features,
        TextDocument,
    } from '$lib/types'

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
                    dom += `<p class="${paraOrFigIdx}nth ${
                        paraOrFig.attrs?.dropCap ? 'dropCap' : ''
                    }">${parseText(paraOrFig.pTexts)}</p>`
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

    let dom: HTMLDivElement
    let html = parseDocument(textDocument)

    const typio_id = Math.random().toString(36).substring(2, 12)

    // TODO: resync only single paragraphs and figures at a time for performance
    const syncDocAndDOM = () => {
        // bring dom and textDocument into sync, by updating textDocument to match dom visually
        textDocument = parseDOM(dom)
        html = parseDocument(textDocument)
    }

    const getWindowRange = (
        editorElement: Element,
    ): TextDocumentRange | null => {
        let selection = window.getSelection()
        if (selection != null) {
            let start = 0,
                length = 0
            if (selection.rangeCount > 0) {
                let windowRange = selection.getRangeAt(0)
                let preCaretRange = windowRange.cloneRange()
                preCaretRange.selectNodeContents(editorElement)
                preCaretRange.setEnd(
                    windowRange.startContainer,
                    windowRange.startOffset,
                )
                start = preCaretRange.toString().length
                preCaretRange.setEnd(
                    windowRange.endContainer,
                    windowRange.endOffset,
                )
                length = preCaretRange.toString().length - start
            }

            return {
                start,
                length,
            }
        }

        return null
    }

    const processChildren = (
        node: Node,
        offsetCount: number,
        targetOffset: number,
    ): null | { node: Node; offset: number } => {
        for (let i = 0; i < node.childNodes.length; i++) {
            console.log('offsetCount', offsetCount);
            
            node = node.childNodes[i]
            if (node.nodeType === Node.TEXT_NODE) {
                console.log('text node', node)
                ;[...(node.textContent ?? '')].forEach((char, index) => {
                    offsetCount++
                    if (offsetCount === targetOffset) {
                        return {
                            node,
                            offset: index,
                        }
                    }
                })
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                console.log('element node', node)
                processChildren(node, offsetCount, targetOffset)
            }
        }
        

        return { node, offset: offsetCount }
    }

    const setWindowRange = (
        editorElement: Element,
        start: number,
        length: number,
    ) => {
        let selection = window.getSelection()
        let range = document.createRange()

        let res = processChildren(editorElement, 0, start)
        if (res != null) {
            range.setStart(res.node, res.offset)
        }
        res = processChildren(editorElement, 0, start + length)
        if (res != null) {
            range.setEnd(res.node, res.offset)
        }

        console.log(res)

        selection?.removeAllRanges()
        selection?.addRange(range)
    }

    const handleInput = (e: KeyboardEvent, dom: HTMLDivElement) => {
        let text_selected = false

        const windowRange = getWindowRange(
            document.getElementsByClassName(typio_id)[0].children[1],
        )

        console.log(windowRange)

        if (windowRange !== null) {
            setWindowRange(
                document.getElementsByClassName(typio_id)[0].children[1],
                windowRange.start,
                windowRange.length,
            )

            if (windowRange.length > 0) {
                text_selected = true
            }
        }


        switch (e.key) {
            case 'Enter':
                e.preventDefault()
                // syncDocAndDOM()
                break
            case 'Backspace':
                e.preventDefault()
                syncDocAndDOM()
                break
            case 'Control':
                e.preventDefault()
                // syncDocAndDOM()
                break

            default:
                break
        }
    }

    const addStyle = (
        range: TextDocumentRange,
        textDoc: TextDocument,
    ): TextDocument => {
        return textDoc
    }

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
</script>

<!-- @component
A WYSIWYG rich text editor component.
- Usage:
    ```js
    <Typio class="my-custom-class" preset="default" | settings="set-b-i-l-h-sh-ol_implicit-undo-redo"/>
    ```
-->
<div class={`${className} typio ${typio_id}`} {...$$restProps}>
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
        on:keydown={(e) => handleInput(e, dom)}
        bind:this={dom}
        contenteditable="true">
        {@html html}
    </div>
</div>
