import React from 'react';
import './GlowingGrid.css';

const GlowingGrid = ({
    variant = 'grid', // 'grid', 'lines', 'dots', 'hexagon'
    intensity = 'medium', // 'low', 'medium', 'high'
    color = 'blue', // 'blue', 'green', 'purple', 'cyan', 'orange'
    speed = 'normal', // 'slow', 'normal', 'fast'
    opacity = 0.3,
    children
}) => {
    const gridClass = `glowing-grid glowing-grid--${variant} glowing-grid--${intensity} glowing-grid--${color} glowing-grid--${speed}`;

    return (
        <div className="glowing-grid-container">
            <div className={gridClass} style={{ opacity }}></div>
            {children}
        </div>
    );
};

export default GlowingGrid; 