import LinkCard from './LinkCard'

export default function LinksList({ links, slideDir, theme }) {
  return (
    <div
      key={slideDir + '-links'}
      className={`flex flex-col gap-3 ${slideDir === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
    >
      {links.map(link => (
        <LinkCard key={link.id} {...link} theme={theme} />
      ))}
    </div>
  )
}
