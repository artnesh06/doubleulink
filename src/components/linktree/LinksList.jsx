import { useState } from 'react'
import LinkCard from './LinkCard'

export default function LinksList({ links, slideDir, theme, editMode, onReorder, onEdit }) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  function handleDragStart(e, index) {
    if (!editMode) return
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, index) {
    if (!editMode) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  function handleDragLeave() {
    setDragOverIndex(null)
  }

  function handleDrop(e, dropIndex) {
    if (!editMode) return
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    // Reorder the links
    const newLinks = [...links]
    const [draggedItem] = newLinks.splice(draggedIndex, 1)
    newLinks.splice(dropIndex, 0, draggedItem)
    
    onReorder(newLinks)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  function handleDragEnd() {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div
      key={slideDir + '-links'}
      className={`flex flex-col gap-3 ${slideDir === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
    >
      {links.map((link, index) => (
        <div
          key={link.id}
          draggable={editMode}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            opacity: draggedIndex === index ? 0.5 : 1,
            transform: dragOverIndex === index && draggedIndex !== index ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
            cursor: editMode ? 'move' : 'pointer',
            position: 'relative',
          }}
        >
          {editMode && (
            <div style={{
              position: 'absolute',
              left: '-32px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '18px',
              cursor: 'move',
              zIndex: 10,
            }}>
              ⋮⋮
            </div>
          )}
          <LinkCard 
            {...link} 
            theme={theme} 
            editMode={editMode}
            onEdit={() => onEdit && onEdit(link)}
          />
          {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
            <div style={{
              position: 'absolute',
              top: draggedIndex < index ? '100%' : '-2px',
              left: 0,
              right: 0,
              height: '2px',
              background: '#00ff88',
              borderRadius: '1px',
              boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

