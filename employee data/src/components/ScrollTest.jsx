import React from 'react';
import ScrollAnimations from './ScrollAnimations';

const ScrollTest = () => {
    return (
        <div style={{ padding: '2rem', minHeight: '200vh' }}>
            <h1>Scroll Animation Test</h1>

            <div style={{ marginBottom: '50vh' }}>
                <ScrollAnimations effect="fadeIn" delay={0.2}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        <h2>Fade In Animation</h2>
                        <p>This should fade in when you scroll down.</p>
                    </div>
                </ScrollAnimations>
            </div>

            <div style={{ marginBottom: '50vh' }}>
                <ScrollAnimations effect="slideUp" delay={0.3}>
                    <div style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        <h2>Slide Up Animation</h2>
                        <p>This should slide up from below when you scroll down.</p>
                    </div>
                </ScrollAnimations>
            </div>

            <div style={{ marginBottom: '50vh' }}>
                <ScrollAnimations effect="scale" delay={0.4}>
                    <div style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        <h2>Scale Animation</h2>
                        <p>This should scale up when you scroll down.</p>
                    </div>
                </ScrollAnimations>
            </div>

            <div style={{ marginBottom: '50vh' }}>
                <ScrollAnimations effect="card" delay={0.5}>
                    <div style={{
                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        color: '#333',
                        padding: '2rem',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2>Card Animation</h2>
                        <p>This should have a card-like animation with shadow effects.</p>
                    </div>
                </ScrollAnimations>
            </div>
        </div>
    );
};

export default ScrollTest; 