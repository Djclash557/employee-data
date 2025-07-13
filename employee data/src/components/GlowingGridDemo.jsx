import React, { useState } from 'react';
import GlowingGrid from './GlowingGrid';
import './GlowingGridDemo.css';

const GlowingGridDemo = () => {
    const [selectedVariant, setSelectedVariant] = useState('grid');
    const [selectedIntensity, setSelectedIntensity] = useState('medium');
    const [selectedColor, setSelectedColor] = useState('blue');
    const [selectedSpeed, setSelectedSpeed] = useState('normal');
    const [selectedOpacity, setSelectedOpacity] = useState(0.3);

    const variants = [
        { value: 'grid', label: 'Grid', description: 'Classic digital grid pattern' },
        { value: 'lines', label: 'Lines', description: 'Flowing animated lines' },
        { value: 'dots', label: 'Dots', description: 'Pulsing dot matrix' },
        { value: 'hexagon', label: 'Hexagon', description: 'Geometric hexagon pattern' }
    ];

    const intensities = [
        { value: 'low', label: 'Low', description: 'Subtle effect' },
        { value: 'medium', label: 'Medium', description: 'Balanced visibility' },
        { value: 'high', label: 'High', description: 'Prominent effect' }
    ];

    const colors = [
        { value: 'blue', label: 'Blue', description: 'Professional & tech' },
        { value: 'green', label: 'Green', description: 'Growth & success' },
        { value: 'purple', label: 'Purple', description: 'Creative & innovative' },
        { value: 'cyan', label: 'Cyan', description: 'Modern & clean' },
        { value: 'orange', label: 'Orange', description: 'Energetic & dynamic' }
    ];

    const speeds = [
        { value: 'slow', label: 'Slow', description: 'Relaxed pace' },
        { value: 'normal', label: 'Normal', description: 'Standard speed' },
        { value: 'fast', label: 'Fast', description: 'High energy' }
    ];

    return (
        <div className="glowing-grid-demo">
            <div className="demo-header">
                <h1>Glowing Grid Effects</h1>
                <p>Futuristic animated grids and lines for data-driven platforms</p>
            </div>

            <div className="demo-controls">
                <div className="control-group">
                    <label>Variant:</label>
                    <select
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                    >
                        {variants.map(variant => (
                            <option key={variant.value} value={variant.value}>
                                {variant.label} - {variant.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>Intensity:</label>
                    <select
                        value={selectedIntensity}
                        onChange={(e) => setSelectedIntensity(e.target.value)}
                    >
                        {intensities.map(intensity => (
                            <option key={intensity.value} value={intensity.value}>
                                {intensity.label} - {intensity.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>Color:</label>
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        {colors.map(color => (
                            <option key={color.value} value={color.value}>
                                {color.label} - {color.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>Speed:</label>
                    <select
                        value={selectedSpeed}
                        onChange={(e) => setSelectedSpeed(e.target.value)}
                    >
                        {speeds.map(speed => (
                            <option key={speed.value} value={speed.value}>
                                {speed.label} - {speed.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>Opacity: {selectedOpacity}</label>
                    <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.1"
                        value={selectedOpacity}
                        onChange={(e) => setSelectedOpacity(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="demo-preview">
                <GlowingGrid
                    variant={selectedVariant}
                    intensity={selectedIntensity}
                    color={selectedColor}
                    speed={selectedSpeed}
                    opacity={selectedOpacity}
                >
                    <div className="preview-content">
                        <h2>Preview Area</h2>
                        <p>This is how the glowing grid effect looks with your current settings.</p>
                        <div className="preview-cards">
                            <div className="preview-card">
                                <h3>Data Point 1</h3>
                                <p>Value: 42</p>
                            </div>
                            <div className="preview-card">
                                <h3>Data Point 2</h3>
                                <p>Value: 78</p>
                            </div>
                            <div className="preview-card">
                                <h3>Data Point 3</h3>
                                <p>Value: 156</p>
                            </div>
                        </div>
                    </div>
                </GlowingGrid>
            </div>

            <div className="demo-info">
                <h3>Usage Examples</h3>
                <div className="usage-examples">
                    <div className="example">
                        <h4>Dashboard Background</h4>
                        <code>
                            {`<GlowingGrid variant="grid" color="blue" intensity="low">
  <DashboardContent />
</GlowingGrid>`}
                        </code>
                    </div>

                    <div className="example">
                        <h4>Data Visualization</h4>
                        <code>
                            {`<GlowingGrid variant="dots" color="green" speed="fast">
  <ChartComponent />
</GlowingGrid>`}
                        </code>
                    </div>

                    <div className="example">
                        <h4>Loading States</h4>
                        <code>
                            {`<GlowingGrid variant="lines" color="cyan" intensity="high">
  <LoadingSpinner />
</GlowingGrid>`}
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlowingGridDemo; 