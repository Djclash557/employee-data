import React, { useEffect, useRef, useState } from 'react';
import './ScrollAnimations.css';

const ScrollAnimations = ({
    children,
    effect = 'fadeIn', // 'fadeIn', 'slideUp', 'slideLeft', 'slideRight', 'scale', 'rotate', 'parallax', 'stagger'
    threshold = 0.1,
    duration = 0.6,
    delay = 0,
    distance = 50,
    direction = 'up', // 'up', 'down', 'left', 'right'
    staggerDelay = 0.1,
    className = '',
    ...props
}) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, hasAnimated]);

    const getAnimationStyle = () => {
        return {
            transitionDelay: `${delay}s`,
            transitionDuration: `${duration}s`,
        };
    };

    return (
        <div
            ref={elementRef}
            className={`scroll-animation scroll-animation--${effect} ${isVisible ? 'animate' : ''} ${className}`}
            style={getAnimationStyle()}
            {...props}
        >
            {children}
        </div>
    );
};

// Staggered animation wrapper for multiple children
export const StaggeredAnimation = ({
    children,
    effect = 'fadeIn',
    staggerDelay = 0.1,
    ...props
}) => {
    return (
        <div className="staggered-animation">
            {React.Children.map(children, (child, index) => (
                <ScrollAnimations
                    key={index}
                    effect={effect}
                    delay={index * staggerDelay}
                    {...props}
                >
                    {child}
                </ScrollAnimations>
            ))}
        </div>
    );
};

// Parallax background component
export const ParallaxBackground = ({
    children,
    speed = 0.5,
    className = '',
    ...props
}) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div
            className={`parallax-background ${className}`}
            style={{ transform: `translateY(${offset}px)` }}
            {...props}
        >
            {children}
        </div>
    );
};

// Scroll progress indicator
export const ScrollProgress = ({
    color = '#3b82f6',
    height = '4px',
    className = '',
    ...props
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`scroll-progress ${className}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${progress}%`,
                height,
                backgroundColor: color,
                zIndex: 9999,
                transition: 'width 0.1s ease-out'
            }}
            {...props}
        />
    );
};

// Scroll-triggered counter
export const ScrollCounter = ({
    end,
    duration = 2000,
    start = 0,
    suffix = '',
    prefix = '',
    className = '',
    ...props
}) => {
    const [count, setCount] = useState(start);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime = null;

                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const currentCount = Math.floor(progress * (end - start) + start);

                        setCount(currentCount);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [end, duration, start, hasAnimated]);

    return (
        <span
            ref={elementRef}
            className={`scroll-counter ${className}`}
            {...props}
        >
            {prefix}{count}{suffix}
        </span>
    );
};

export default ScrollAnimations; 