<script lang="ts">
    import bold_icon from '$lib/static/bold_icon.svg'
    import italic_icon from '$lib/static/italic_icon.svg'
    import dropcap_icon from '$lib/static/dropcap_icon.svg'
    import link_icon from '$lib/static/link_icon.svg'
    import quote_icon from '$lib/static/quote_icon.svg'
    import heading_icon from '$lib/static/heading_icon.svg'
    import subheading_icon from '$lib/static/subheading_icon.svg'
    import undo_icon from '$lib/static/undo_icon.svg'
    import redo_icon from '$lib/static/redo_icon.svg'

    import type { Features, TextDocument } from '$lib/types'

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
                src: bold_icon
            },
            command: 'bold'
        },
        italic: {
            icon: {
                type: 'svg',
                src: italic_icon
            },
            command: 'italic'
        },
        underline: {
            icon: {
                type: 'html',
                src: '<u>U</u>'
            },
            command: 'underline'
        },
        strikethrough: {
            icon: {
                type: 'html',
                src: '<s>S</s>'
            },
            command: 'strikethrough'
        },
        link: {
            icon: {
                type: 'svg',
                src: link_icon
            },
            command: 'link'
        },
        code: {
            icon: {
                type: 'html',
                src: 'C'
            },
            command: 'code'
        },
        blockquote: {
            icon: {
                type: 'svg',
                src: quote_icon
            },
            command: 'blockquote'
        },
        heading: {
            icon: {
                type: 'svg',
                src: heading_icon
            },
            command: 'heading'
        },
        subheading: {
            icon: {
                type: 'svg',
                src: subheading_icon
            },
            command: 'subheading'
        },
        oList: {
            icon: {
                type: 'html',
                src: '1.'
            },
            command: 'redo'
        },
        uList: {
            icon: {
                type: 'html',
                src: '&#8226'
            },
            command: 'uList'
        },
        dropCap: {
            icon: {
                type: 'svg',
                src: dropcap_icon
            },
            command: 'dropCap'
        },
        undo: {
            icon: {
                type: 'svg',
                src: undo_icon
            },
            command: 'undo'
        },
        redo: {
            icon: {
                type: 'svg',
                src: redo_icon
            },
            command: 'redo'
        }
    }

    type Preset = { [name: string]: string }
    const presets: Preset = {
        default: 'floating-b-i-l-q-h-sh-limpl-dc-undo-redo',
        default_set: 'set-b-i-l-q-h-sh-limpl-dc-undo-redo',
        full: 'set-b-i-u-l-c-s-q-h-sh-ol-ul-dc-undo-redo'
    }

    const settings: string =
        $$restProps.settings ?? presets[$$restProps.preset] ?? presets['default']

    const enabledFeatures: Features = ((settings) => {
        const mapping = {
            b: 'bold',
            i: 'italic',
            u: 'underline',
            s: 'strikethrough',
            l: 'link',
            c: 'code',
            q: 'blockquote',
            h: 'heading',
            sh: 'subheading',
            ol: 'oList',
            ul: 'uList',
            limpl: 'listImplicit',
            dc: 'dropCap'
        }

        const features: Features = {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            link: false,
            code: false,
            blockquote: false,
            heading: false,
            subheading: false,
            oList: false,
            uList: false,
            listImplicit: false,
            dropCap: false
        }

        for (const key of settings.split('-')) {
            // @ts-ignore
            if (mapping[key]) {
                // @ts-ignore
                features[mapping[key]] = true
            }
        }
        return features
    })(settings)

    let toolbar = {
        type: settings.toLowerCase().includes('floating') ? 'floating' : 'set',
        style: 'display: none;',
        pos: { x: 0, y: 0 },
        marginY: 63
    }
    const showUndo = settings.toLowerCase().includes('undo')
    const showRedo = settings.toLowerCase().includes('redo')

    let textDoc: TextDocument = {
        title: 'Tile',
        subtitle: 'Subtitle',
        sections: [
            {
                content: [{ content: 'text', type: 'default' }],
                type: 'default',
                attrs: {
                    dropCap: true
                }
            }
        ]
    }

    const textDocToDom = (textDoc: TextDocument) => {
        let dom = ''
        dom += '<h1>' + textDoc.title + '</h1>'
        dom += '<h2>' + textDoc.subtitle + '</h2>'
        return dom
    }

    // const format = (sectionIdx, paragraphIdx, startChar, endChar, command) => {}

    const positionToolbar = () => {
        let selection = window.getSelection()
        if (selection && selection?.toString().length > 0) {
            console.log(selection.toString())

            let range = selection.getRangeAt(0)
            let rect = range.getBoundingClientRect()
            toolbar.pos = {
                x: rect.left + (rect.right - rect.left) / 2,
                y: rect.top
            }
            toolbar.style =
                'top: ' + (toolbar.pos.y - toolbar.marginY) + 'px; left: ' + toolbar.pos.x + 'px;'
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
<div class={className + ' typio'} {...$$restProps}>
    <div
        class="typio-toolbar {toolbar.type}"
        style={(() => {
            return toolbar.type === 'floating' ? toolbar.style : ''
        })()}>
        {#each buttonList as c}
            <button
                class="btn"
                on:click={() => {
                    // let selection = window.getSelection()
                    // format(0, 0, 0, 0, commands[c[1]])
                    positionToolbar()
                }}>
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
        contenteditable="true">
        {@html textDocToDom(textDoc)}
        This is the default content
    </div>
</div>

<style>
    @import url('https://rsms.me/inter/inter.css');

    .typio {
        max-width: 740px;
        width: 100%;
        margin: 0 auto;
    }

    .btn {
        font-family: 'Inter', sans-serif;
        background-color: #fff;
        border: 2px solid #000;
        /* border-radius: 0.4rem; */
        user-select: none;
        width: var(--button-width, 2.4rem);
        height: var(--button-height, 2.4rem);

        font-size: 1vmax;
    }

    .btn img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;

        max-width: 1vmax;
        max-height: 1vmax;
    }

    .typio-editor {
        font-family: 'Inter', sans-serif;
        border: 2px solid #aaa;
        border-radius: 0.4rem;
        padding: 1rem;
    }

    .typio-editor:focus {
        outline: none;
    }

    .floating {
        padding: 0.5rem;
        border-radius: 0.4rem;
        background-color: var(--toolbar-background-color, #333);
        position: absolute;
        transform: translateX(-50%);

        padding: 0.2rem 0.5rem;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .floating .btn {
        background-color: transparent;
        color: #f5f5f5;
        font-size: 1rem;
        border: none;
    }

    .set .btn {
        /* padding: 1rem; */
    }

    .typio-toolbar-arrow {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 100%;
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;

        border-top: 10px solid var(--toolbar-background-color);
    }

    .b {
        font-weight: 700;
    }

    .i {
        font-style: italic;
    }

    .u {
        text-decoration: underline;
    }
</style>
