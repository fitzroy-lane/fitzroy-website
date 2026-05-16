import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@/lib/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-inter text-fitzroy-charcoal leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-playfair text-2xl lg:text-3xl text-fitzroy-charcoal mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-playfair text-xl text-fitzroy-charcoal mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-fitzroy-bronze pl-4 italic text-fitzroy-taupe my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-inter text-fitzroy-charcoal flex gap-2">
        <span className="text-fitzroy-bronze mt-1 shrink-0">—</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="font-inter text-fitzroy-charcoal">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-fitzroy-bronze hover:text-fitzroy-taupe underline underline-offset-2 transition-colors">
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ content }: { content: PortableTextBlock[] }) {
  return <PortableText value={content} components={components} />
}
