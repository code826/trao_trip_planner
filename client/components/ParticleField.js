'use client'

import { useMemo } from 'react'

export default function ParticleField({ count = 30, className = '' }) {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 1 + Math.random() * 2.5,
            duration: 15 + Math.random() * 25,
            delay: Math.random() * 20,
            opacity: 0.15 + Math.random() * 0.35,
        }))
    }, [count])

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        bottom: '-5%',
                        width: p.size,
                        height: p.size,
                        background: p.id % 3 === 0
                            ? 'rgba(245, 158, 11, 0.5)'
                            : p.id % 3 === 1
                                ? 'rgba(6, 182, 212, 0.4)'
                                : 'rgba(148, 163, 184, 0.3)',
                        animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    )
}
