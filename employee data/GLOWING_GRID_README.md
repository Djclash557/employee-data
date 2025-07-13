# Glowing Grid Effects

A futuristic animated grid and lines system for data-driven platforms, providing a modern, tech-forward aesthetic.

## Features

### 🎨 Multiple Variants
- **Grid**: Classic digital grid pattern with pulsing animation
- **Lines**: Flowing animated lines moving across the screen
- **Dots**: Pulsing dot matrix with scaling effects
- **Hexagon**: Geometric hexagon pattern with rotation

### 🌈 Color Schemes
- **Blue**: Professional & tech-focused
- **Green**: Growth & success themes
- **Purple**: Creative & innovative
- **Cyan**: Modern & clean
- **Orange**: Energetic & dynamic

### ⚡ Intensity Levels
- **Low**: Subtle background effect
- **Medium**: Balanced visibility
- **High**: Prominent foreground effect

### 🚀 Speed Options
- **Slow**: Relaxed, calming pace
- **Normal**: Standard animation speed
- **Fast**: High-energy, dynamic movement

## Usage

### Basic Implementation

```jsx
import GlowingGrid from './components/GlowingGrid';

// Wrap your content with the GlowingGrid component
<GlowingGrid variant="grid" color="blue" intensity="medium" speed="normal" opacity={0.3}>
  <YourContent />
</GlowingGrid>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'grid'` | Pattern type: `'grid'`, `'lines'`, `'dots'`, `'hexagon'` |
| `intensity` | string | `'medium'` | Effect intensity: `'low'`, `'medium'`, `'high'` |
| `color` | string | `'blue'` | Color scheme: `'blue'`, `'green'`, `'purple'`, `'cyan'`, `'orange'` |
| `speed` | string | `'normal'` | Animation speed: `'slow'`, `'normal'`, `'fast'` |
| `opacity` | number | `0.3` | Overall opacity (0.1 to 0.8) |
| `children` | ReactNode | - | Content to wrap with the effect |

## Examples

### Dashboard Background
```jsx
<GlowingGrid variant="grid" color="blue" intensity="low" speed="slow">
  <DashboardContent />
</GlowingGrid>
```

### Data Visualization
```jsx
<GlowingGrid variant="dots" color="green" speed="fast" intensity="medium">
  <ChartComponent />
</GlowingGrid>
```

### Loading States
```jsx
<GlowingGrid variant="lines" color="cyan" intensity="high" speed="normal">
  <LoadingSpinner />
</GlowingGrid>
```

### Creative Projects
```jsx
<GlowingGrid variant="hexagon" color="purple" intensity="high" speed="fast">
  <CreativeContent />
</GlowingGrid>
```

## Implementation Details

### CSS Animations
- **gridPulse**: Scales and fades the grid pattern
- **linesMove**: Translates lines across the screen
- **dotsPulse**: Scales and fades dot patterns
- **hexagonPulse**: Rotates and fades hexagon patterns

### Responsive Design
- Automatically adjusts grid sizes for mobile devices
- Maintains performance across different screen sizes
- Optimized for both desktop and mobile experiences

### Dark Mode Support
- Automatically adapts colors for dark mode preferences
- Enhanced contrast in dark environments
- Maintains readability and visual appeal

### Performance Optimizations
- Uses CSS transforms for smooth animations
- Minimal DOM impact with pseudo-elements
- Hardware-accelerated animations
- Reduced motion support for accessibility

## Demo Page

Visit `/grid-demo` to see all variants in action with interactive controls.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Accessibility

- Respects `prefers-reduced-motion` media query
- Maintains proper contrast ratios
- Screen reader friendly
- Keyboard navigation compatible

## Customization

### Adding New Colors
```css
.glowing-grid--custom {
  --grid-color: rgba(255, 0, 0, 0.3);
  --grid-color-light: rgba(255, 0, 0, 0.1);
  --grid-color-dark: rgba(255, 0, 0, 0.5);
}
```

### Adding New Variants
```css
.glowing-grid--custom-pattern {
  background-image: your-custom-pattern;
  animation: customAnimation 3s ease-in-out infinite;
}
```

## Integration with Existing Components

The glowing grid effects have been integrated into:

1. **Main Layout**: Applied globally to all authenticated pages
2. **Dashboard**: Subtle dots pattern for data visualization
3. **Tasks Page**: Flowing lines for task management
4. **Demo Page**: Interactive showcase of all variants

## Future Enhancements

- [ ] Interactive grid patterns
- [ ] Sound effects (optional)
- [ ] Particle system integration
- [ ] 3D grid effects
- [ ] Custom pattern upload
- [ ] Real-time data visualization integration

## Contributing

When adding new variants or effects:

1. Follow the existing naming conventions
2. Include responsive design considerations
3. Add dark mode support
4. Test performance impact
5. Update documentation

## License

This component is part of the employee management system and follows the same licensing terms. 