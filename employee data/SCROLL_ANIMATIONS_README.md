# Scroll-Triggered Animations

A comprehensive scroll animation system that enhances interactivity and engagement through smooth, performant animations triggered by scroll events.

## 🎯 Features

### **Core Animation Types**
- **Fade In**: Simple opacity transition
- **Slide Up**: Content slides up from below
- **Slide Down**: Content slides down from above
- **Slide Left**: Content slides in from the right
- **Slide Right**: Content slides in from the left
- **Scale**: Content scales up from smaller size
- **Rotate**: Content rotates into view
- **Bounce**: Bouncy entrance animation
- **Flip**: 3D flip animation
- **Zoom**: Dramatic zoom effect

### **Specialized Components**
- **StaggeredAnimation**: Sequential animations for multiple children
- **ParallaxBackground**: Background parallax effects
- **ScrollProgress**: Progress bar showing scroll position
- **ScrollCounter**: Animated counters triggered by scroll

### **Element-Specific Animations**
- **Card**: Enhanced with shadow and scale effects
- **Text**: Smooth text entrance with subtle movement
- **Button**: Interactive button animations
- **Image**: Image-specific entrance effects

## 🚀 Performance Features

### **Optimizations**
- Hardware-accelerated animations using CSS transforms
- `will-change` property for performance hints
- `contain: layout style paint` for containment
- Backface visibility and transform style optimizations

### **Accessibility**
- Respects `prefers-reduced-motion` media query
- Reduced motion support with simplified animations
- Screen reader friendly

### **Responsive Design**
- Adapts to different screen sizes
- Mobile-optimized animation distances
- Touch-friendly interactions

## 📱 Usage Examples

### **Basic Animation**
```jsx
import ScrollAnimations from './components/ScrollAnimations';

<ScrollAnimations effect="fadeIn" delay={0.2}>
  <YourContent />
</ScrollAnimations>
```

### **Staggered Animation**
```jsx
import { StaggeredAnimation } from './components/ScrollAnimations';

<StaggeredAnimation effect="slideUp" staggerDelay={0.1}>
  <Item1 />
  <Item2 />
  <Item3 />
</StaggeredAnimation>
```

### **Scroll Counter**
```jsx
import { ScrollCounter } from './components/ScrollAnimations';

<ScrollCounter 
  end={100} 
  duration={2000} 
  suffix="%" 
  prefix="$"
/>
```

### **Progress Bar**
```jsx
import { ScrollProgress } from './components/ScrollAnimations';

<ScrollProgress 
  color="#3b82f6" 
  height="4px" 
/>
```

### **Parallax Background**
```jsx
import { ParallaxBackground } from './components/ScrollAnimations';

<ParallaxBackground speed={0.3}>
  <YourContent />
</ParallaxBackground>
```

## ⚙️ Configuration Options

### **ScrollAnimations Props**
```jsx
<ScrollAnimations
  effect="fadeIn"           // Animation type
  threshold={0.1}           // Intersection threshold (0-1)
  duration={0.6}            // Animation duration in seconds
  delay={0}                 // Initial delay in seconds
  distance={50}             // Movement distance in pixels
  direction="up"            // Movement direction
  className=""              // Additional CSS classes
/>
```

### **StaggeredAnimation Props**
```jsx
<StaggeredAnimation
  effect="slideUp"          // Animation type for all children
  staggerDelay={0.1}        // Delay between each child
  // ... other ScrollAnimations props
/>
```

### **ScrollCounter Props**
```jsx
<ScrollCounter
  end={100}                 // Final count value
  duration={2000}           // Animation duration in ms
  start={0}                 // Starting count value
  suffix=""                 // Text after the number
  prefix=""                 // Text before the number
  className=""              // Additional CSS classes
/>
```

### **ScrollProgress Props**
```jsx
<ScrollProgress
  color="#3b82f6"          // Progress bar color
  height="4px"             // Progress bar height
  className=""              // Additional CSS classes
/>
```

### **ParallaxBackground Props**
```jsx
<ParallaxBackground
  speed={0.5}              // Parallax speed multiplier
  className=""              // Additional CSS classes
/>
```

## 🎨 Animation Effects

### **Basic Effects**
- `fadeIn`: Simple opacity transition
- `slideUp`: Slides up from below
- `slideDown`: Slides down from above
- `slideLeft`: Slides in from right
- `slideRight`: Slides in from left
- `scale`: Scales up from smaller size
- `rotate`: Rotates into view

### **Advanced Effects**
- `bounce`: Bouncy entrance with elastic easing
- `flip`: 3D flip animation with perspective
- `zoom`: Dramatic zoom effect
- `parallax`: Parallax movement effect

### **Element-Specific Effects**
- `card`: Enhanced card animation with shadows
- `text`: Subtle text movement
- `button`: Interactive button effects
- `image`: Image-specific entrance

## 🔧 Customization

### **CSS Customization**
```css
/* Custom animation timing */
.scroll-animation--custom {
  transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom animation states */
.scroll-animation--custom {
  opacity: 0;
  transform: translateY(100px) rotate(45deg);
}

.scroll-animation--custom.animate {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}
```

### **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-animation {
    transition: opacity 0.3s ease;
    transform: none !important;
  }
}
```

## 🌙 Dark Mode Support

The animations automatically adapt to dark mode preferences:

```css
@media (prefers-color-scheme: dark) {
  .scroll-progress {
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
  }
  
  .scroll-counter {
    color: #60a5fa;
  }
}
```

## 📊 Performance Monitoring

### **Intersection Observer**
- Efficient scroll detection
- Configurable thresholds
- Automatic cleanup on unmount

### **Animation Frame Optimization**
- Uses `requestAnimationFrame` for smooth counters
- Hardware acceleration with CSS transforms
- Minimal reflow and repaint

## 🎯 Best Practices

### **Performance**
1. Use `will-change` sparingly
2. Prefer transform over position changes
3. Use `contain` property for containment
4. Avoid animating layout-triggering properties

### **Accessibility**
1. Respect reduced motion preferences
2. Provide alternative content for screen readers
3. Ensure sufficient color contrast
4. Test with keyboard navigation

### **User Experience**
1. Keep animations subtle and purposeful
2. Use appropriate timing and easing
3. Consider mobile performance
4. Test across different devices

## 🔄 Integration Examples

### **Dashboard Integration**
```jsx
// EmployeeDashboard.jsx
<ScrollAnimations effect="slideUp" delay={0.2}>
  <div className="dashboard-welcome">
    Welcome, {user.name}!
  </div>
</ScrollAnimations>

<ScrollAnimations effect="card" delay={0.3}>
  <div className="dashboard-summary-card">
    Total Employees: {employeeCount}
  </div>
</ScrollAnimations>
```

### **Task Management**
```jsx
// Tasks.jsx
<ScrollAnimations effect="slideUp" delay={0.2}>
  <div className="tasks-header">
    <h2>My Tasks</h2>
  </div>
</ScrollAnimations>

<StaggeredAnimation effect="slideUp" staggerDelay={0.1}>
  {tasks.map(task => (
    <TaskItem key={task.id} task={task} />
  ))}
</StaggeredAnimation>
```

## 🚀 Demo Page

Visit `/scroll-demo` to see all animations in action with interactive examples and code snippets.

## 📝 Notes

- Animations are triggered when elements enter the viewport
- Each animation only plays once per element
- Supports nested animations and complex layouts
- Compatible with React Router and other navigation systems
- Works with both functional and class components 