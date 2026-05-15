import { useState } from 'react'

const FONT_OPTIONS = ['Inter', 'Poppins', 'Roboto', 'Playfair Display', 'Space Mono', 'DM Sans']

const BG_ANIMATION_OPTIONS = [
  ['none', 'None'],
  ['aurora', 'Aurora'],
  ['particles', 'Particles'],
  ['waves', 'Waves'],
  ['silk', 'Silk'],
  ['retroGrid', 'Retro Grid'],
  ['lightning', 'Lightning'],
  ['orb', 'Orb'],
  ['pixelSnow', 'Pixel Snow'],
  ['threads', 'Threads'],
  ['radar', 'Radar'],
]

const IMAGE_EFFECT_OPTIONS = [
  { id: 'none', label: 'None', icon: '∅' },
  { id: 'mono', label: 'Mono', icon: '◐' },
  { id: 'blur', label: 'Blur', icon: '◌' },
  { id: 'halftone', label: 'Halftone', icon: '⠿' },
]

const cardShell = {
  marginBottom: '12px',
  padding: '14px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.08)',
}

function Section({ id, title, children, action, collapsible, expanded, onToggle, muted, dragHandleProps, isDragging, isDragOver, dragOverPosition, dragOffset = 0 }) {
  const titleNode = (
    <>
      <span>{title}</span>
      {collapsible && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease', opacity: 0.75 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </>
  )

  return (
    <section
      data-section-id={id}
      style={{
        ...cardShell,
        color: muted,
        opacity: 1,
        borderTop: isDragOver && dragOverPosition === 'before' ? '2px solid #69f493' : '1px solid rgba(255,255,255,0.08)',
        borderBottom: isDragOver && dragOverPosition === 'after' ? '2px solid #69f493' : '1px solid rgba(255,255,255,0.08)',
        transform: isDragging ? `translateY(${dragOffset}px) scale(1.012)` : 'translateY(0) scale(1)',
        transition: isDragging ? 'none' : 'border 0.1s, transform 0.16s ease, box-shadow 0.16s ease',
        position: 'relative',
        zIndex: isDragging ? 50 : 1,
        boxShadow: isDragging ? '0 18px 42px rgba(0,0,0,0.35)' : 'none',
        background: isDragging ? 'rgba(45,45,45,0.98)' : cardShell.background,
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        {/* Drag handle */}
        <div
          className="drag-handle-icon"
          title="Drag to reorder"
          {...dragHandleProps}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            padding: '2px 4px 2px 0',
            opacity: 0.4,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
            <circle cx="4" cy="3" r="1.5"/>
            <circle cx="8" cy="3" r="1.5"/>
            <circle cx="4" cy="8" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="4" cy="13" r="1.5"/>
            <circle cx="8" cy="13" r="1.5"/>
          </svg>
        </div>

        {collapsible ? (
          <button
            type="button"
            onClick={onToggle}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              padding: 0,
              color: muted,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              font: 'inherit',
            }}
          >
            <SectionTitle>{titleNode}</SectionTitle>
          </button>
        ) : (
          <SectionTitle>{title}</SectionTitle>
        )}
        {action}
      </div>
      {(!collapsible || expanded) && <div style={{ marginTop: '12px' }}>{children}</div>}
    </section>
  )
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: '12px',
        fontWeight: 700,
        color: 'inherit',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {children}
    </h3>
  )
}

function Field({ label, children, value }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '12px' }}>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--panel-muted)',
          fontWeight: 600,
        }}
      >
        {label}
        {value !== undefined && <span style={{ color: 'var(--panel-soft)', fontWeight: 600 }}>{value}</span>}
      </span>
      {children}
    </label>
  )
}

function PanelSelect({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.055)',
        color: 'var(--panel-text)',
        fontSize: '13px',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {children}
    </select>
  )
}

function ColorInput({ value, onChange }) {
  const normalizedValue = typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'

  function handleTextChange(nextValue) {
    const withHash = nextValue.startsWith('#') ? nextValue : `#${nextValue}`
    const sanitized = `#${withHash.slice(1).replace(/[^0-9a-fA-F]/g, '').slice(0, 6)}`
    if (/^#[0-9a-fA-F]{6}$/.test(sanitized)) {
      onChange({ target: { value: sanitized } })
    }
  }

  return (
    <div className="panel-color-control">
      <input
        type="color"
        value={normalizedValue}
        onChange={onChange}
        aria-label="Color picker"
      />
      <input
        key={normalizedValue}
        type="text"
        defaultValue={normalizedValue}
        onChange={(e) => handleTextChange(e.target.value)}
        aria-label="Color hex code"
        spellCheck="false"
      />
    </div>
  )
}

function Slider({ label, value, min, max, step, suffix = 'px', onChange }) {
  return (
    <Field label={label} value={`${value}${suffix}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </Field>
  )
}

function PositionControl({ value = {}, onChange }) {
  const x = value.imageX ?? 50
  const y = value.imageY ?? 50

  return (
    <Field label="Position" value={`X ${x}% · Y ${y}%`}>
      <div className="panel-position-control">
        <div className="panel-position-half">
          <span>X</span>
          <input
            type="range"
            min="0"
            max="100"
            value={x}
            onChange={(e) => onChange({ ...value, style: 'image', imageX: parseInt(e.target.value) })}
          />
        </div>
        <div className="panel-position-half">
          <span>Y</span>
          <input
            type="range"
            min="0"
            max="100"
            value={y}
            onChange={(e) => onChange({ ...value, style: 'image', imageY: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </Field>
  )
}

function Segmented({ value, options, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: '8px' }}>
      {options.map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            style={{
              minHeight: '42px',
              borderRadius: '8px',
              border: active ? '1.5px solid #69f493' : '1px solid rgba(255,255,255,0.1)',
              background: active ? 'rgba(105, 244, 147, 0.13)' : 'rgba(255,255,255,0.045)',
              color: active ? '#69f493' : 'var(--panel-text)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="panel-checkbox-row">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

function ImageBackgroundControls({ label = 'Background image', value = {}, fallbackColor, onChange }) {
  const imageUrl = value.imageUrl
  const effect = value.effect || 'none'
  const effectValue = value.effectIntensity ?? (effect === 'mono' ? 100 : effect === 'blur' ? 35 : 60)
  const noiseValue = value.noiseAmount ?? 25

  function handleUpload(file) {
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    onChange({
      ...value,
      style: 'image',
      imageUrl,
      imageName: file.name,
      imageScale: value.imageScale || 120,
      imageX: value.imageX ?? 50,
      imageY: value.imageY ?? 50,
      effect: value.effect || 'none',
    })
  }

  return (
    <div className="panel-image-bg-card">
      <div className="panel-image-bg-header">
        <span>{label}</span>
        {imageUrl && <em>{value.style === 'image' ? 'Active' : 'Ready'}</em>}
      </div>

      <div className="panel-image-bg-row">
        <div
          className="panel-image-preview"
          style={{
            background: imageUrl
              ? `url(${imageUrl}) center/cover no-repeat`
              : fallbackColor,
          }}
        />
        <label className="panel-upload-button">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files?.[0])}
          />
          <span>{imageUrl ? 'Change' : 'Upload'}</span>
        </label>
        {imageUrl && value.style !== 'image' && (
          <button
            type="button"
            className="panel-activate-button"
            onClick={() => onChange({ ...value, style: 'image' })}
          >
            Use
          </button>
        )}
      </div>

      {imageUrl && (
        <>
          <Field label="Effect">
            <div className="panel-effect-grid">
              {IMAGE_EFFECT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={effect === option.id ? 'panel-effect-option active' : 'panel-effect-option'}
                  onClick={() => onChange({
                    ...value,
                    effect: option.id,
                    style: 'image',
                    effectIntensity: option.id === 'none'
                      ? 0
                      : value.effectIntensity ?? (option.id === 'mono' ? 100 : option.id === 'blur' ? 35 : 60),
                  })}
                >
                  <span>{option.icon}</span>
                  <small>{option.label}</small>
                </button>
              ))}
            </div>
          </Field>

          <Slider
            label="Image zoom"
            min="100"
            max="220"
            value={value.imageScale || 120}
            onChange={(e) => onChange({ ...value, style: 'image', imageScale: parseInt(e.target.value) })}
          />
          <PositionControl value={value} onChange={onChange} />
          {effect === 'mono' && (
            <Slider
              label="Mono strength"
              min="0"
              max="100"
              value={effectValue}
              suffix="%"
              onChange={(e) => onChange({ ...value, style: 'image', effect: 'mono', effectIntensity: parseInt(e.target.value) })}
            />
          )}
          {effect === 'blur' && (
            <Slider
              label="Blur strength"
              min="0"
              max="100"
              value={effectValue}
              suffix="%"
              onChange={(e) => onChange({ ...value, style: 'image', effect: 'blur', effectIntensity: parseInt(e.target.value) })}
            />
          )}
          {effect === 'halftone' && (
            <Slider
              label="Halftone strength"
              min="0"
              max="100"
              value={effectValue}
              suffix="%"
              onChange={(e) => onChange({ ...value, style: 'image', effect: 'halftone', effectIntensity: parseInt(e.target.value) })}
            />
          )}
          <Slider
            label="Tint"
            min="0"
            max="100"
            value={value.tint ?? 0}
            suffix="%"
            onChange={(e) => onChange({ ...value, style: 'image', tint: parseInt(e.target.value) })}
          />
          <ToggleRow
            label="Noise texture"
            checked={value.noise || false}
            onChange={(checked) => onChange({ ...value, style: 'image', noise: checked })}
          />
          {value.noise && (
            <Slider
              label="Noise strength"
              min="0"
              max="100"
              value={noiseValue}
              suffix="%"
              onChange={(e) => onChange({ ...value, style: 'image', noise: true, noiseAmount: parseInt(e.target.value) })}
            />
          )}
        </>
      )}
    </div>
  )
}

function FontFamilyPicker({ value, onChange }) {
  return (
    <div className="panel-font-grid">
      {FONT_OPTIONS.map((font) => {
        const active = value === font
        return (
          <button
            key={font}
            type="button"
            onClick={() => onChange(font)}
            className={active ? 'panel-font-option active' : 'panel-font-option'}
            style={{ fontFamily: `'${font}', sans-serif` }}
          >
            <span>{font}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function LeftSettingsPanel({
  open,
  state,
  onUpdate,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  cardBgStyle,
  cardRadius,
  maxHeight,
}) {
  const [expandedSections, setExpandedSections] = useState({
    themeMode: true,
    wallpaper: false,
    cardBg: false,
    spacing: true,
    socials: true,
    tabs: true,
    subtitles: true,
    buttons: true,
    typography: true,
    cornerRadius: true,
  })
  const [spacingMode, setSpacingMode] = useState('simple')

  // Drag & drop state
  const DEFAULT_ORDER = [
    'themeMode', 'wallpaper', 'cardBg', 'spacing',
    'socials', 'tabs', 'subtitles', 'buttons', 'typography', 'cornerRadius',
  ]
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_ORDER)
  const [dragState, setDragState] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)
  const [dragOverPosition, setDragOverPosition] = useState(null) // 'before' or 'after'
  const draggingId = dragState?.id || null
  const dragOffset = dragState ? dragState.currentY - dragState.startY : 0

  if (!open) return null

  function toggleSection(section) {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  function handlePointerDown(e, id) {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragState({ id, startY: e.clientY, currentY: e.clientY })
    setDragOverId(null)
    setDragOverPosition(null)
  }

  function updateDragTarget(clientX, clientY) {
    const target = document
      .elementsFromPoint(clientX, clientY)
      .map(element => element.closest?.('[data-section-id]'))
      .find(element => element && element.getAttribute('data-section-id') !== draggingId)
    const id = target?.getAttribute('data-section-id')
    if (!id || id === draggingId) return

    const rect = target.getBoundingClientRect()
    const midpoint = rect.top + rect.height / 2
    const position = clientY < midpoint ? 'before' : 'after'
    setDragOverId(id)
    setDragOverPosition(position)

    setSectionOrder(prev => {
      const fromIdx = prev.indexOf(draggingId)
      const hoverIdx = prev.indexOf(id)
      if (fromIdx < 0 || hoverIdx < 0) return prev

      const shouldMoveBefore = position === 'before' && fromIdx > hoverIdx
      const shouldMoveAfter = position === 'after' && fromIdx < hoverIdx
      if (!shouldMoveBefore && !shouldMoveAfter) return prev

      const next = [...prev]
      const [moving] = next.splice(fromIdx, 1)
      const targetIdx = next.indexOf(id)
      next.splice(position === 'after' ? targetIdx + 1 : targetIdx, 0, moving)
      setDragState(current => current ? { ...current, startY: clientY, currentY: clientY } : current)
      return next
    })
  }

  function handlePointerMove(e) {
    if (!dragState) return
    setDragState(prev => prev ? { ...prev, currentY: e.clientY } : prev)
    updateDragTarget(e.clientX, e.clientY)
  }

  function finishDrag() {
    setDragState(null)
    setDragOverId(null)
    setDragOverPosition(null)
  }

  function dragHandleProps(id) {
    return {
      onPointerDown: (e) => handlePointerDown(e, id),
    }
  }

  const panelTextColor = state.themeMode === 'bright' ? '#0f0f0f' : '#ffffff'
  const panelSecondaryColor = state.themeMode === 'bright' ? '#575757' : '#b5b5b5'
  const panelTertiaryColor = state.themeMode === 'bright' ? '#858585' : '#7f7f7f'

  const spacing = state.spacing || {}
  const socialSettings = state.socialSettings || {}
  const tabSettings = state.tabSettings || {}
  const subtitleSettings = state.subtitleSettings || {}
  const buttonSettings = state.buttonSettings || {}
  const panelHeight = maxHeight > 0
    ? `min(${maxHeight}px, calc(100vh - 60px))`
    : 'calc(100vh - 60px)'

  // Section definitions — keyed by id
  const SECTIONS = {
    themeMode: (
      <Section
        key="themeMode"
        id="themeMode"
        title="Theme mode"
        collapsible
        expanded={expandedSections.themeMode}
        onToggle={() => toggleSection('themeMode')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('themeMode')}
        isDragging={draggingId === 'themeMode'}
        isDragOver={dragOverId === 'themeMode'}
        dragOverPosition={dragOverId === 'themeMode' ? dragOverPosition : null}
        dragOffset={draggingId === 'themeMode' ? dragOffset : 0}
      >
        <Segmented
          value={state.themeMode}
          options={[
            { id: 'system', label: 'System' },
            { id: 'bright', label: 'Bright' },
            { id: 'night', label: 'Night' },
          ]}
          onChange={(mode) => onUpdate('themeMode', mode)}
        />
      </Section>
    ),

    wallpaper: (
      <Section
        key="wallpaper"
        id="wallpaper"
        title="Wallpaper background"
        collapsible
        expanded={expandedSections.wallpaper}
        onToggle={() => toggleSection('wallpaper')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('wallpaper')}
        isDragging={draggingId === 'wallpaper'}
        isDragOver={dragOverId === 'wallpaper'}
        dragOverPosition={dragOverId === 'wallpaper' ? dragOverPosition : null}
        dragOffset={draggingId === 'wallpaper' ? dragOffset : 0}
      >
        <Field label="Style">
          <PanelSelect
            value={state.wallpaper?.style || 'solid'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, style: e.target.value })}
          >
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
            <option value="image">Image</option>
          </PanelSelect>
        </Field>
        <Field label="Color">
          <ColorInput
            value={state.wallpaper?.color || '#1a1a1a'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, color: e.target.value })}
          />
        </Field>
        <ImageBackgroundControls
          value={state.wallpaper}
          fallbackColor={state.wallpaper?.color || '#1a1a1a'}
          onChange={(updates) => onUpdate('wallpaper', updates)}
        />
        <Field label="Animation">
          <PanelSelect
            value={state.wallpaper?.animation?.id || 'none'}
            onChange={(e) => onUpdate('wallpaper', { ...state.wallpaper, animation: { id: e.target.value, params: {} } })}
          >
            {BG_ANIMATION_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </PanelSelect>
        </Field>
      </Section>
    ),

    cardBg: (
      <Section
        key="cardBg"
        id="cardBg"
        title="Card background"
        collapsible
        expanded={expandedSections.cardBg}
        onToggle={() => toggleSection('cardBg')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('cardBg')}
        isDragging={draggingId === 'cardBg'}
        isDragOver={dragOverId === 'cardBg'}
        dragOverPosition={dragOverId === 'cardBg' ? dragOverPosition : null}
        dragOffset={draggingId === 'cardBg' ? dragOffset : 0}
      >
        <Field label="Style">
          <PanelSelect
            value={state.cardBg?.style || 'solid'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, style: e.target.value })}
          >
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
            <option value="dots">Dots</option>
            <option value="grid">Grid</option>
            <option value="mesh">Mesh</option>
            <option value="image">Image</option>
          </PanelSelect>
        </Field>
        <Field label="Color">
          <ColorInput
            value={state.cardBg?.color || '#242424'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, color: e.target.value })}
          />
        </Field>
        <ImageBackgroundControls
          value={state.cardBg}
          fallbackColor={state.cardBg?.color || '#242424'}
          onChange={(updates) => onUpdate('cardBg', updates)}
        />
        <Field label="Animation">
          <PanelSelect
            value={state.cardBg?.animation?.id || 'none'}
            onChange={(e) => onUpdate('cardBg', { ...state.cardBg, animation: { id: e.target.value, params: {} } })}
          >
            {BG_ANIMATION_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </PanelSelect>
        </Field>
      </Section>
    ),

    spacing: (
      <Section
        key="spacing"
        id="spacing"
        title="Spacing"
        collapsible
        expanded={expandedSections.spacing}
        onToggle={() => toggleSection('spacing')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('spacing')}
        isDragging={draggingId === 'spacing'}
        isDragOver={dragOverId === 'spacing'}
        dragOverPosition={dragOverId === 'spacing' ? dragOverPosition : null}
        dragOffset={draggingId === 'spacing' ? dragOffset : 0}
        action={
          <button
            type="button"
            onClick={() => setSpacingMode(prev => prev === 'simple' ? 'advanced' : 'simple')}
            className="panel-pill-button"
          >
            {spacingMode === 'simple' ? 'Advanced' : 'Simple'}
          </button>
        }
      >
        <Slider
          label="Avatar size"
          min="60"
          max="160"
          value={spacing.avatarSize || 100}
          onChange={(e) => onUpdate('spacing', { ...spacing, avatarSize: parseInt(e.target.value) })}
        />
        {spacingMode === 'advanced' && (
          <>
            <Slider
              label="Profile to social"
              min="0"
              max="64"
              value={spacing.profileToSocial || 14}
              onChange={(e) => onUpdate('spacing', { ...spacing, profileToSocial: parseInt(e.target.value) })}
            />
            <Slider
              label="Social to tabs"
              min="0"
              max="64"
              value={spacing.socialToTabs || 18}
              onChange={(e) => onUpdate('spacing', { ...spacing, socialToTabs: parseInt(e.target.value) })}
            />
            <Slider
              label="Tabs to links"
              min="0"
              max="64"
              value={spacing.tabsToLinks || 24}
              onChange={(e) => onUpdate('spacing', { ...spacing, tabsToLinks: parseInt(e.target.value) })}
            />
          </>
        )}
        <Slider
          label="Link gap"
          min="0"
          max="32"
          value={spacing.linkGap || 8}
          onChange={(e) => onUpdate('spacing', { ...spacing, linkGap: parseInt(e.target.value) })}
        />
        <Slider
          label="Card padding"
          min="0"
          max="64"
          value={spacing.cardPadding || 16}
          onChange={(e) => onUpdate('spacing', { ...spacing, cardPadding: parseInt(e.target.value) })}
        />
      </Section>
    ),

    socials: (
      <Section
        key="socials"
        id="socials"
        title="Social icons"
        collapsible
        expanded={expandedSections.socials}
        onToggle={() => toggleSection('socials')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('socials')}
        isDragging={draggingId === 'socials'}
        isDragOver={dragOverId === 'socials'}
        dragOverPosition={dragOverId === 'socials' ? dragOverPosition : null}
        dragOffset={draggingId === 'socials' ? dragOffset : 0}
      >
        <ToggleRow
          label="Hide social icons"
          checked={state.hideSocialIcons || false}
          onChange={(checked) => onUpdate('hideSocialIcons', checked)}
        />
        <div style={{ height: '10px' }} />
        <Slider
          label="Icon size"
          min="20"
          max="56"
          value={socialSettings.size || 28}
          onChange={(e) => onUpdate('socialSettings', { ...socialSettings, size: parseInt(e.target.value) })}
        />
        <Slider
          label="Icon gap"
          min="4"
          max="32"
          value={socialSettings.gap || 16}
          onChange={(e) => onUpdate('socialSettings', { ...socialSettings, gap: parseInt(e.target.value) })}
        />
      </Section>
    ),

    tabs: (
      <Section
        key="tabs"
        id="tabs"
        title="Tabs"
        collapsible
        expanded={expandedSections.tabs}
        onToggle={() => toggleSection('tabs')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('tabs')}
        isDragging={draggingId === 'tabs'}
        isDragOver={dragOverId === 'tabs'}
        dragOverPosition={dragOverId === 'tabs' ? dragOverPosition : null}
        dragOffset={draggingId === 'tabs' ? dragOffset : 0}
      >
        <ToggleRow
          label="Hide tabs"
          checked={state.hideTabs || false}
          onChange={(checked) => onUpdate('hideTabs', checked)}
        />
        <div style={{ height: '10px' }} />
        <Slider
          label="Tab size"
          min="0.75"
          max="1.35"
          step="0.05"
          suffix="x"
          value={tabSettings.scale || 1}
          onChange={(e) => onUpdate('tabSettings', { ...tabSettings, scale: parseFloat(e.target.value) })}
        />
        <Slider
          label="Tab font"
          min="10"
          max="20"
          value={tabSettings.fontSize || 13}
          onChange={(e) => onUpdate('tabSettings', { ...tabSettings, fontSize: parseInt(e.target.value) })}
        />
        <Slider
          label="Tab gap"
          min="0"
          max="16"
          value={tabSettings.tabGap || 0}
          onChange={(e) => onUpdate('tabSettings', { ...tabSettings, tabGap: parseInt(e.target.value) })}
        />
        <Slider
          label="Top bottom gap"
          min="6"
          max="24"
          value={tabSettings.paddingY || 13}
          onChange={(e) => onUpdate('tabSettings', { ...tabSettings, paddingY: parseInt(e.target.value) })}
        />
      </Section>
    ),

    subtitles: (
      <Section
        key="subtitles"
        id="subtitles"
        title="Sub titles"
        collapsible
        expanded={expandedSections.subtitles}
        onToggle={() => toggleSection('subtitles')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('subtitles')}
        isDragging={draggingId === 'subtitles'}
        isDragOver={dragOverId === 'subtitles'}
        dragOverPosition={dragOverId === 'subtitles' ? dragOverPosition : null}
        dragOffset={draggingId === 'subtitles' ? dragOffset : 0}
      >
        <ToggleRow
          label="Hide sub titles"
          checked={subtitleSettings.hidden || false}
          onChange={(checked) => onUpdate('subtitleSettings', { ...subtitleSettings, hidden: checked })}
        />
        <div style={{ height: '10px' }} />
        <Slider
          label="Sub title gap"
          min="0"
          max="36"
          value={subtitleSettings.gap ?? 8}
          onChange={(e) => onUpdate('subtitleSettings', { ...subtitleSettings, gap: parseInt(e.target.value) })}
        />
      </Section>
    ),

    buttons: (
      <Section
        key="buttons"
        id="buttons"
        title="Link buttons"
        collapsible
        expanded={expandedSections.buttons}
        onToggle={() => toggleSection('buttons')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('buttons')}
        isDragging={draggingId === 'buttons'}
        isDragOver={dragOverId === 'buttons'}
        dragOverPosition={dragOverId === 'buttons' ? dragOverPosition : null}
        dragOffset={draggingId === 'buttons' ? dragOffset : 0}
      >
        <Field label="Button type">
          <PanelSelect
            value={buttonSettings.style || 'solid'}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, style: e.target.value })}
          >
            <option value="solid">Solid</option>
            <option value="glass">Glass</option>
            <option value="blur">Background blur</option>
            <option value="outline">Outline</option>
          </PanelSelect>
        </Field>
        <Field label="Button color">
          <ColorInput
            value={buttonSettings.color || '#171717'}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, color: e.target.value })}
          />
        </Field>
        <Field label="Text color">
          <ColorInput
            value={buttonSettings.textColor || '#ffffff'}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, textColor: e.target.value })}
          />
        </Field>
        <Slider
          label="Button curve"
          min="0"
          max="36"
          value={buttonSettings.radius ?? state.globalRadius ?? 32}
          onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, radius: parseInt(e.target.value) })}
        />
        <Field label="Shadow">
          <PanelSelect
            value={buttonSettings.shadow || 'none'}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, shadow: e.target.value })}
          >
            <option value="none">None</option>
            <option value="soft">Soft</option>
            <option value="deep">Deep black</option>
            <option value="glow">Border glow</option>
          </PanelSelect>
        </Field>
        <Slider
          label="Border width"
          min="0"
          max="4"
          value={buttonSettings.borderWidth || 0}
          onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, borderWidth: parseInt(e.target.value) })}
        />
        <Field label="Border color">
          <ColorInput
            value={buttonSettings.borderColor?.startsWith('#') ? buttonSettings.borderColor : '#333333'}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, borderColor: e.target.value })}
          />
        </Field>
        {['glass', 'blur'].includes(buttonSettings.style) && (
          <Slider
            label="Background blur"
            min="0"
            max="30"
            value={buttonSettings.blur || 12}
            onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, blur: parseInt(e.target.value) })}
          />
        )}
        <div style={{ height: '4px' }} />
        <ToggleRow
          label="Show arrows"
          checked={buttonSettings.arrowEnabled !== false}
          onChange={(checked) => onUpdate('buttonSettings', { ...buttonSettings, arrowEnabled: checked })}
        />
        {buttonSettings.arrowEnabled !== false && (
          <>
            <div style={{ height: '10px' }} />
            <Field label="Arrow type">
              <PanelSelect
                value={buttonSettings.arrowType || 'chevron'}
                onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, arrowType: e.target.value })}
              >
                <option value="chevron">Chevron</option>
                <option value="arrow">Arrow</option>
                <option value="double">Double</option>
                <option value="triangle">Triangle</option>
              </PanelSelect>
            </Field>
            <Field label="Arrow animation">
              <PanelSelect
                value={buttonSettings.arrowEffect || 'slide'}
                onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, arrowEffect: e.target.value })}
              >
                <option value="slide">Slide</option>
                <option value="bounce">Bounce</option>
                <option value="fade">Fade</option>
                <option value="grow">Grow</option>
              </PanelSelect>
            </Field>
            <Slider
              label="Arrow opacity"
              min="0.1"
              max="1"
              step="0.05"
              suffix=""
              value={buttonSettings.arrowOpacity ?? 0.5}
              onChange={(e) => onUpdate('buttonSettings', { ...buttonSettings, arrowOpacity: parseFloat(e.target.value) })}
            />
          </>
        )}
      </Section>
    ),

    typography: (
      <Section
        key="typography"
        id="typography"
        title="Typography"
        collapsible
        expanded={expandedSections.typography}
        onToggle={() => toggleSection('typography')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('typography')}
        isDragging={draggingId === 'typography'}
        isDragOver={dragOverId === 'typography'}
        dragOverPosition={dragOverId === 'typography' ? dragOverPosition : null}
        dragOffset={draggingId === 'typography' ? dragOffset : 0}
      >
        <Field label="Font family">
          <FontFamilyPicker
            value={state.textSettings?.font || 'Inter'}
            onChange={(font) => onUpdate('textSettings', { ...state.textSettings, font })}
          />
        </Field>
        <Field label="Text color">
          <ColorInput
            value={state.textSettings?.color || '#ffffff'}
            onChange={(e) => onUpdate('textSettings', { ...state.textSettings, color: e.target.value })}
          />
        </Field>
        <Slider
          label="Title size"
          min="18"
          max="42"
          value={state.textSettings?.titleSizePx || (state.textSettings?.titleSize === 'large' ? 30 : 24)}
          onChange={(e) => onUpdate('textSettings', { ...state.textSettings, titleSizePx: parseInt(e.target.value) })}
        />
      </Section>
    ),

    cornerRadius: (
      <Section
        key="cornerRadius"
        id="cornerRadius"
        title="Corner radius"
        collapsible
        expanded={expandedSections.cornerRadius}
        onToggle={() => toggleSection('cornerRadius')}
        muted={panelSecondaryColor}
        dragHandleProps={dragHandleProps('cornerRadius')}
        isDragging={draggingId === 'cornerRadius'}
        isDragOver={dragOverId === 'cornerRadius'}
        dragOverPosition={dragOverId === 'cornerRadius' ? dragOverPosition : null}
        dragOffset={draggingId === 'cornerRadius' ? dragOffset : 0}
      >
        <Slider
          label="Curve"
          min="0"
          max="64"
          value={state.globalRadius ?? 32}
          onChange={(e) => onUpdate('globalRadius', parseInt(e.target.value))}
        />
      </Section>
    ),
  }

  return (
    <div
      className="left-settings-panel"
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: panelHeight,
        maxHeight: panelHeight,
        padding: '22px 20px 72px',
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        ...cardBgStyle,
        borderRadius: `${cardRadius} ${cardRadius} 0 0`,
        animation: 'slideInLeft 0.3s ease-out',
        '--panel-text': panelTextColor,
        '--panel-muted': panelSecondaryColor,
        '--panel-soft': panelTertiaryColor,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: '11px', color: panelTertiaryColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Page editor
          </p>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 750, color: panelTextColor, letterSpacing: '-0.35px' }}>
            Settings
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="panel-icon-button" onClick={onUndo} disabled={!canUndo} title="Undo">
            ↶
          </button>
          <button className="panel-icon-button" onClick={onRedo} disabled={!canRedo} title="Redo">
            ↷
          </button>
          <button className="panel-reset-button" onClick={onReset} title="Reset all">
            Reset
          </button>
        </div>
      </header>

      {/* Render sections in drag-sorted order */}
      {sectionOrder.map(id => SECTIONS[id])}

      <style>{`
        @media (max-width: 600px) {
          .left-settings-panel {
            display: none !important;
          }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .left-settings-panel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .left-settings-panel::-webkit-scrollbar {
          display: none;
        }

        .left-settings-panel input,
        .left-settings-panel select,
        .left-settings-panel button {
          font-family: Inter, sans-serif;
        }

        .left-settings-panel input[type="range"] {
          accent-color: #ffd24d;
        }

        .panel-color-control {
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          gap: 8px;
          align-items: center;
          min-width: 0;
        }

        .panel-color-control input[type="color"] {
          width: 46px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.055);
          cursor: pointer;
          padding: 3px;
        }

        .panel-color-control input[type="text"] {
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.055);
          color: var(--panel-text);
          padding: 0 12px;
          font-size: 13px;
          font-weight: 650;
          outline: none;
          text-transform: uppercase;
        }

        .panel-font-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
          gap: 8px;
          min-width: 0;
        }

        .panel-font-option {
          min-width: 0;
          min-height: 48px;
          display: block;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: var(--panel-text);
          padding: 9px 14px;
          cursor: pointer;
          text-align: left;
        }

        .panel-font-option.active {
          border-color: rgba(105, 244, 147, 0.65);
          background: rgba(105, 244, 147, 0.12);
          color: #69f493;
        }

        .panel-font-option span {
          display: block;
          min-width: 0;
          width: 100%;
          font-size: 14px;
          font-weight: 750;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .left-settings-panel input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0 0 0 0 rgba(255, 210, 77, 0.42);
          animation: sliderPulse 2.1s ease-in-out infinite;
        }

        .left-settings-panel input[type="range"]:hover::-webkit-slider-thumb,
        .left-settings-panel input[type="range"]:focus::-webkit-slider-thumb {
          animation: sliderPulseFast 1s ease-in-out infinite;
        }

        @keyframes sliderPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 210, 77, 0.3); }
          50% { box-shadow: 0 0 0 8px rgba(255, 210, 77, 0); }
        }

        @keyframes sliderPulseFast {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 210, 77, 0.45); }
          50% { box-shadow: 0 0 0 11px rgba(255, 210, 77, 0); }
        }

        .panel-icon-button {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          background: rgba(255,255,255,0.055);
          color: var(--panel-text);
          cursor: pointer;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .panel-icon-button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .panel-reset-button {
          height: 34px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 92, 82, 0.28);
          background: rgba(255, 92, 82, 0.1);
          color: #ff6b5f;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .panel-pill-button {
          height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1px solid rgba(105, 244, 147, 0.35);
          background: rgba(105, 244, 147, 0.09);
          color: #69f493;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          cursor: pointer;
        }

        .panel-checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 40px;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--panel-text);
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
        }

        .panel-checkbox-row input {
          width: 16px;
          height: 16px;
          accent-color: #69f493;
        }

        .panel-image-bg-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 4px 0 14px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
        }

        .panel-image-bg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: var(--panel-muted);
          font-size: 12px;
          font-weight: 750;
        }

        .panel-image-bg-header em {
          font-style: normal;
          color: #69f493;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .panel-image-bg-row {
          display: grid;
          grid-template-columns: 58px 1fr auto;
          gap: 10px;
          align-items: center;
        }

        .panel-image-preview {
          width: 58px;
          height: 58px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2);
        }

        .panel-upload-button,
        .panel-activate-button {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.055);
          color: var(--panel-text);
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .panel-upload-button input {
          display: none;
        }

        .panel-activate-button {
          padding: 0 14px;
          color: #69f493;
          border-color: rgba(105,244,147,0.35);
          background: rgba(105,244,147,0.1);
        }

        .panel-effect-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .panel-effect-option {
          min-height: 58px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.045);
          color: var(--panel-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          cursor: pointer;
        }

        .panel-effect-option.active {
          border: 2px solid var(--panel-text);
          color: var(--panel-text);
          background: rgba(255,255,255,0.08);
        }

        .panel-effect-option span {
          font-size: 18px;
          line-height: 1;
        }

        .panel-effect-option small {
          font-size: 10px;
          font-weight: 750;
        }

        .panel-position-control {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.035);
        }

        .panel-position-half {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 6px;
          align-items: center;
        }

        .panel-position-half:first-child {
          padding-right: 8px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .panel-position-half:last-child {
          padding-left: 8px;
        }

        .panel-position-half span {
          color: var(--panel-soft);
          font-size: 11px;
          font-weight: 850;
          text-align: center;
        }

        .panel-position-half input[type="range"] {
          min-width: 0;
        }

        section[draggable="true"] input,
        section[draggable="true"] select,
        section[draggable="true"] button {
          -webkit-user-drag: none;
          user-drag: none;
        }

        section[draggable="true"] {
          cursor: default;
        }

        section[draggable="true"]:hover > div > div:first-child {
          opacity: 0.7 !important;
        }
      `}</style>
    </div>
  )
}
