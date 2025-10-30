# 🎨 THEME SYSTEM GUIDE

## Overview

MAMCG Admin Interface sử dụng hệ thống theme tối (dark theme) với màu accent cyan, được thiết kế dựa trên MAMCG branding và Quantum CatDV layout inspiration.

---

## 🎨 Color Palette

### **Primary Colors**

```css
/* Dark Theme Base */
--admin-bg: #0A0A0B;              /* Main background */
--admin-secondary: #1A1A1C;       /* Card/panel background */
--admin-tertiary: #2A2A2C;        /* Elevated elements */
--admin-input: #1E1E20;           /* Input fields */

/* Accent Colors */
--admin-accent: #00D4FF;          /* Cyan - Primary accent */
--admin-accent-hover: #00B8E6;    /* Cyan hover state */

/* Text Colors */
--admin-primary: #E5E5E5;         /* Primary text */
--admin-secondary: #A0A0A0;       /* Secondary text */
--admin-muted: #6B7280;           /* Muted text */

/* Border Colors */
--admin: #2D2D30;                 /* Default border */
--admin-hover: #3D3D40;           /* Hover border */

/* Status Colors */
--admin-success: #10B981;         /* Green */
--admin-warning: #F59E0B;         /* Orange */
--admin-error: #EF4444;           /* Red */
--admin-info: #3B82F6;            /* Blue */
```

---

## 📁 Theme Implementation

### **1. Global Styles** (`/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Theme colors defined here */
  }
  
  body {
    @apply bg-admin-bg text-admin-primary;
  }
}
```

### **2. Tailwind Classes**

Use custom classes prefixed with `admin-`:

```tsx
// Background colors
className="bg-admin-bg"           // Main background
className="bg-admin-secondary"    // Cards/panels
className="bg-admin-input"        // Input fields

// Text colors
className="text-admin-primary"    // Main text
className="text-admin-secondary"  // Secondary text
className="text-admin-accent"     // Accent text (cyan)

// Borders
className="border-admin"          // Default border
className="border-admin-accent"   // Accent border

// Hover states
className="hover:bg-admin-hover"
className="hover:text-admin-accent"
```

---

## 🧩 Component Theming

### **Card Component**

```tsx
<Card className="bg-admin-secondary border-admin p-6">
  <h3 className="text-admin-accent mb-4">Title</h3>
  <p className="text-admin-primary">Content</p>
</Card>
```

### **Button Component**

```tsx
// Primary Button (Cyan)
<Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
  Primary Action
</Button>

// Secondary Button
<Button 
  variant="outline" 
  className="border-admin text-admin-primary hover:bg-admin-hover"
>
  Secondary Action
</Button>

// Danger Button
<Button className="bg-red-600 hover:bg-red-700 text-white">
  Delete
</Button>
```

### **Input Component**

```tsx
<Input 
  placeholder="Enter text..."
  className="bg-admin-input border-admin text-admin-primary"
/>
```

### **Table Component**

```tsx
<Table>
  <TableHeader className="bg-admin-secondary">
    <TableRow className="border-admin hover:bg-admin-secondary">
      <TableHead className="text-admin-secondary">Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="border-admin hover:bg-admin-hover">
      <TableCell className="text-admin-primary">Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 🎭 Theme Context

### **ThemeContext** (`/components/admin/ThemeContext.tsx`)

Provides theme switching functionality:

```tsx
import { ThemeProvider, useTheme } from './components/admin/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function Component() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}
```

---

## 🎯 Best Practices

### **1. Consistency**

Always use theme tokens instead of hardcoded colors:

```tsx
// ✅ Good
className="bg-admin-secondary text-admin-primary"

// ❌ Bad
className="bg-gray-900 text-gray-100"
```

### **2. Contrast**

Ensure sufficient contrast for accessibility:

```tsx
// Primary text on dark background
className="bg-admin-bg text-admin-primary"

// Accent color for important elements
className="text-admin-accent"
```

### **3. Hover States**

Always provide hover states for interactive elements:

```tsx
className="hover:bg-admin-hover hover:text-admin-accent transition-colors"
```

### **4. Status Colors**

Use semantic colors for status indicators:

```tsx
// Success
className="text-admin-success"

// Warning
className="text-admin-warning"

// Error
className="text-admin-error"
```

---

## 📊 Status Badge Colors

```tsx
// Success - Green
<Badge className="bg-green-900/20 text-green-400 border-green-500">
  Active
</Badge>

// Warning - Orange
<Badge className="bg-orange-900/20 text-orange-400 border-orange-500">
  Warning
</Badge>

// Error - Red
<Badge className="bg-red-900/20 text-red-400 border-red-500">
  Error
</Badge>

// Info - Blue
<Badge className="bg-blue-900/20 text-blue-400 border-blue-500">
  Info
</Badge>

// Default - Cyan
<Badge className="bg-cyan-900/20 text-cyan-400 border-cyan-500">
  Default
</Badge>
```

---

## 🔧 Customization

### **Modify Theme Colors**

Edit `/styles/globals.css`:

```css
:root {
  /* Change accent color */
  --admin-accent: #00D4FF;  /* Your custom color */
  
  /* Change background */
  --admin-bg: #0A0A0B;      /* Your custom background */
}
```

### **Add New Theme Tokens**

```css
:root {
  --admin-custom: #YOUR_COLOR;
}
```

Then use in components:

```tsx
className="text-admin-custom"
```

---

## 📱 Responsive Design

Theme works seamlessly with responsive utilities:

```tsx
className="bg-admin-secondary md:bg-admin-tertiary"
className="text-admin-primary lg:text-admin-accent"
```

---

## 🎨 Special Effects

### **Glass Morphism**

```tsx
className="bg-admin-secondary/50 backdrop-blur-sm"
```

### **Glow Effect**

```tsx
className="shadow-lg shadow-cyan-500/50"
```

### **Gradient Backgrounds**

```tsx
className="bg-gradient-to-r from-cyan-600 to-blue-600"
```

---

## 📚 Resources

- **Tailwind CSS:** https://tailwindcss.com
- **Shadcn/ui:** https://ui.shadcn.com
- **Color Palette:** MAMCG Brand Guidelines

---

**Last Updated:** October 30, 2025  
**Version:** 1.0.0
