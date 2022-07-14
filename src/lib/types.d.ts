type Text = {
    content: string
    type: 'default' | ['bold' | 'italic' | 'underline' | 'strikethrough' | 'link']
    href?: string
}

type Figure = {
    href: string
    caption?: Text[]
    alt?: string
}

type Paragraph = {
    content: Text[]
    type: 'default' | 'code' | 'blockquote' | 'heading' | 'subheading' | 'oList' | 'uList'
    attrs?: {
        dropCap?: boolean
        listNumber?: number
    }
}

type Section = [Paragraph | Figure]

export type TextDocument = {
    title: string
    subtitle: string
    sections: Section[]
}

export type Features = {
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
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
