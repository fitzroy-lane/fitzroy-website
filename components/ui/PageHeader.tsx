interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
  light?: boolean
}

export default function PageHeader({ label, title, subtitle, light = false }: PageHeaderProps) {
  return (
    <div className={`py-16 lg:py-20 ${light ? 'bg-fitzroy-cream' : 'bg-fitzroy-charcoal'}`}>
      <div className="container-site text-center">
        {label && (
          <p className={`section-label mb-3 ${light ? '' : 'text-fitzroy-stone'}`}>{label}</p>
        )}
        <h1 className={`font-playfair text-4xl lg:text-5xl leading-tight ${light ? 'text-fitzroy-charcoal' : 'text-fitzroy-cream'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`font-inter text-base lg:text-lg mt-4 max-w-2xl mx-auto leading-relaxed ${light ? 'text-fitzroy-taupe' : 'text-fitzroy-stone'}`}>
            {subtitle}
          </p>
        )}
        <div className={`w-12 h-px mx-auto mt-6 ${light ? 'bg-fitzroy-bronze' : 'bg-fitzroy-stone'}`} />
      </div>
    </div>
  )
}
