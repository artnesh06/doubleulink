import ShopCard from './ShopCard'

export default function ShopGrid({ items, slideDir, theme, cornerRadius = '14px', hoverZoom = 1 }) {
  const animClass = slideDir === null ? '' : slideDir === 'right' ? 'slide-in-right' : 'slide-in-left'
  return (
    <div
      key={slideDir + '-shop'}
      className={`grid grid-cols-2 gap-3 ${animClass}`}
    >
      {items.map(item => (
        <ShopCard key={item.id} {...item} theme={theme} cornerRadius={cornerRadius} hoverZoom={hoverZoom} />
      ))}
    </div>
  )
}
