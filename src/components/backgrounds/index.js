export { default as Aurora } from './Aurora'
export { default as Particles } from './Particles'
export { default as FlickeringGrid } from './FlickeringGrid'
export { default as Waves } from './Waves'
export { default as Silk } from './Silk'
export { default as RetroGrid } from './RetroGrid'
export { default as Lightning } from './Lightning'
export { default as Orb } from './Orb'
export { default as PixelSnow } from './PixelSnow'
export { default as Threads } from './Threads'
export { default as Radar } from './Radar'

export const BG_ANIMATIONS = [
  {
    id: 'none',
    name: 'None',
    description: 'No animation',
    params: [],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Soft glowing blobs',
    params: [
      { key: 'color1', label: 'Color 1', type: 'color', default: '#7b2ff7' },
      { key: 'color2', label: 'Color 2', type: 'color', default: '#00d4ff' },
      { key: 'color3', label: 'Color 3', type: 'color', default: '#ff6b6b' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.4 },
    ],
  },
  {
    id: 'particles',
    name: 'Particles',
    description: 'Floating dots',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#ffffff' },
      { key: 'count', label: 'Count', type: 'range', min: 10, max: 200, step: 10, default: 60 },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.05, max: 1, step: 0.05, default: 0.5 },
      { key: 'size', label: 'Size', type: 'range', min: 1, max: 8, step: 0.5, default: 2 },
    ],
  },
  {
    id: 'flickeringGrid',
    name: 'Flickering Grid',
    description: 'Grid cells that flicker',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#ffffff' },
      { key: 'cellSize', label: 'Cell Size', type: 'range', min: 8, max: 60, step: 4, default: 20 },
      { key: 'flickerSpeed', label: 'Flicker Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.05, max: 0.5, step: 0.05, default: 0.15 },
    ],
  },
  {
    id: 'waves',
    name: 'Waves',
    description: 'Flowing wave layers',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'amplitude', label: 'Amplitude', type: 'range', min: 10, max: 120, step: 5, default: 40 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.05, max: 0.8, step: 0.05, default: 0.3 },
      { key: 'waveCount', label: 'Wave Count', type: 'range', min: 1, max: 6, step: 1, default: 3 },
    ],
  },
  {
    id: 'silk',
    name: 'Silk',
    description: 'Flowing silk ribbons',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.4 },
    ],
  },
  {
    id: 'retroGrid',
    name: 'Retro Grid',
    description: '80s perspective grid',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.4 },
      { key: 'cellSize', label: 'Cell Size', type: 'range', min: 20, max: 80, step: 5, default: 40 },
    ],
  },
  {
    id: 'lightning',
    name: 'Lightning',
    description: 'Electric bolts',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.6 },
      { key: 'branches', label: 'Branches', type: 'range', min: 1, max: 8, step: 1, default: 5 },
    ],
  },
  {
    id: 'orb',
    name: 'Orb',
    description: 'Glowing floating orb',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.5 },
      { key: 'size', label: 'Size', type: 'range', min: 100, max: 600, step: 20, default: 300 },
    ],
  },
  {
    id: 'pixelSnow',
    name: 'Pixel Snow',
    description: 'Falling pixel particles',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#ffffff' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.05, max: 1, step: 0.05, default: 0.4 },
      { key: 'count', label: 'Count', type: 'range', min: 10, max: 200, step: 10, default: 80 },
      { key: 'pixelSize', label: 'Pixel Size', type: 'range', min: 1, max: 8, step: 1, default: 3 },
    ],
  },
  {
    id: 'threads',
    name: 'Threads',
    description: 'Flowing sine wave lines',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#7b2ff7' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.05, max: 0.8, step: 0.05, default: 0.3 },
      { key: 'count', label: 'Line Count', type: 'range', min: 3, max: 30, step: 1, default: 12 },
    ],
  },
  {
    id: 'radar',
    name: 'Radar',
    description: 'Rotating radar sweep',
    params: [
      { key: 'color', label: 'Color', type: 'color', default: '#00ff88' },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 5, step: 0.1, default: 1 },
      { key: 'opacity', label: 'Opacity', type: 'range', min: 0.1, max: 1, step: 0.05, default: 0.5 },
      { key: 'rings', label: 'Rings', type: 'range', min: 2, max: 8, step: 1, default: 4 },
    ],
  },
]
