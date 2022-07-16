type Text = {
    textContent: string
    types: [] | ('bold' | 'italic' | 'underline' | 'strike' | 'link')[]
    href?: string
}

type Figure = {
    href: string
    caption?: Text[]
    alt?: string
    contentType: 'figure'
}

type Paragraph = {
    pContent: Text[]
    type: 'default' | 'code' | 'blockquote' | 'heading' | 'subheading' | 'oList' | 'uList'
    attrs?: {
        dropCap?: boolean
        listNumber?: number
    }
    contentType: 'paragraph'
}

export type TextDocument = {
    title: string
    subtitle: string
    sections: (Paragraph | Figure)[]
}

export type Features = {
    bold: boolean
    italic: boolean
    underline: boolean
    strike: boolean
    link: boolean
    code: boolean
    blockquote: boolean
    heading: boolean
    subheading: boolean
    oList: boolean
    uList: boolean
    listImplicit: boolean
    dropCap: boolean
}
