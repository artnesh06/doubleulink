# Desktop Layout Sizes - /sample Page

## 📐 CURRENT SIZES:

### **Left Panel (Global Settings):**
- **Width**: `280px`
- **Height**: `85vh`
- **Position**: Fixed, left `32px`, vertically centered
- **Border Radius**: `20px`
- **Padding**: `24px`
- **Background**: `rgba(20, 20, 20, 0.95)` + blur

### **Center Panel (Main Content Card):**
- **Width**: `100%`
- **Max Width**: `650px`
- **Min Height**: `calc(100vh - 60px)`
- **Border Radius**: Top corners only (depends on cornerRadius setting)
- **Padding**: Controlled by `cardPadding` setting (default: `16px`)
- **Background**: Controlled by cardBg settings

### **Right Popup (Edit Popup):**
- **Width**: `280px`
- **Height**: `85vh`
- **Position**: Fixed, right `32px`, vertically centered
- **Border Radius**: `20px`
- **Padding**: `24px`
- **Background**: `rgba(20, 20, 20, 0.95)` + blur

---

## 📊 LAYOUT BREAKDOWN:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser Window                           │
│                                                                   │
│  ┌──────────┐         ┌──────────────┐         ┌──────────┐    │
│  │          │         │              │         │          │    │
│  │   LEFT   │   32px  │    CENTER    │   32px  │  RIGHT   │    │
│  │  PANEL   │  gap    │     CARD     │  gap    │  POPUP   │    │
│  │          │         │              │         │          │    │
│  │  280px   │         │  max 650px   │         │  280px   │    │
│  │  85vh    │         │  100vh-60px  │         │  85vh    │    │
│  │          │         │              │         │          │    │
│  └──────────┘         └──────────────┘         └──────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 SPACING DETAILS:

### **Horizontal Spacing:**
- Left Panel → Left Edge: `32px`
- Left Panel → Center Card: Dynamic (auto)
- Center Card → Right Popup: Dynamic (auto)
- Right Popup → Right Edge: `32px`

### **Vertical Spacing:**
- Top padding: `60px` (for body)
- Bottom padding: `0px` (card extends to bottom)
- Panel/Popup vertical position: Centered (`top: 50%, transform: translateY(-50%)`)

### **Card Internal Spacing:**
- Card Padding: `16px` (default, adjustable via slider)
- Link Gap: `10px` (default, adjustable via slider)
- Avatar Size: `100px` (default, adjustable via slider)
- Profile → Social: `16px` (default, adjustable)
- Social → Tabs: `21px` (default, adjustable)
- Tabs → Links: `30px` (default, adjustable)

---

## 💡 OPTIMAL SCREEN SIZES:

### **Minimum Recommended:**
- Width: `1200px` (untuk fit semua panels tanpa overlap)
- Height: `800px` (untuk comfortable viewing)

### **Ideal:**
- Width: `1440px` - `1920px`
- Height: `900px` - `1080px`

### **Calculation:**
```
Left Panel (280px) + Gap (32px) + Center Card (650px) + Gap (32px) + Right Popup (280px) = 1274px minimum
```

---

## 🔧 ADJUSTABLE SIZES:

### **Via Settings (LeftPanel):**
1. **Avatar Size**: 60px - 160px
2. **Link Gap**: 0px - 32px
3. **Card Padding**: 0px - 64px
4. **Profile → Social Gap**: 0px - 64px (Advanced mode)
5. **Social → Tabs Gap**: 0px - 64px (Advanced mode)
6. **Tabs → Links Gap**: 0px - 64px (Advanced mode)

### **Fixed (Not Adjustable):**
1. **Left Panel Width**: 280px
2. **Right Popup Width**: 280px
3. **Center Card Max Width**: 650px
4. **Panel/Popup Height**: 85vh
5. **Gaps (32px)**: Between panels and edges

---

## 📱 RESPONSIVE BREAKPOINT:

### **Desktop Mode:**
- Screen width: **> 600px**
- Left Panel: Visible
- Right Popup: Visible (when edit mode active)
- Center Card: Max 650px width

### **Mobile Mode:**
- Screen width: **≤ 600px**
- Left Panel: Hidden
- Right Popup: Becomes bottom sheet (full width, 70vh height)
- Center Card: Full width (100%)

---

## 🎨 VISUAL HIERARCHY:

### **Z-Index Layers:**
1. Background animations: `z-index: 0`
2. Main content card: `z-index: 1`
3. Edit icons: `z-index: auto` (relative to card)
4. Backdrop: `z-index: 9998`
5. Panels/Popups: `z-index: 9999`

---

## 📝 NOTES:

- **Left Panel** dan **Right Popup** memiliki size yang sama (280px × 85vh)
- **Center Card** max width 650px untuk optimal reading width
- **32px gaps** memberikan breathing room yang cukup
- **85vh height** untuk panels memastikan tidak terlalu tinggi di layar kecil
- **Border radius 20px** untuk modern, rounded look
- **Backdrop blur** untuk depth dan focus

---

## 🚀 POTENTIAL IMPROVEMENTS:

1. Make panel widths adjustable (280px - 400px)
2. Make center card max-width adjustable (500px - 800px)
3. Add preset layouts (compact, comfortable, spacious)
4. Add zoom level control (80% - 120%)
5. Save layout preferences to localStorage
