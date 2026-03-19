'use client'

export default function PlaneGlobeAnimation({ size = 320, className = '' }) {
    const half = size / 2
    const r = size * 0.36 // globe radius
    const orbitRx = size * 0.46
    const orbitRy = size * 0.18

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            {/* Glow behind globe */}
            <div
                className="absolute rounded-full animate-pulse-slow"
                style={{
                    width: r * 2.4,
                    height: r * 2.4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)',
                }}
            />

            {/* Globe SVG */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute inset-0"
                style={{ filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.1))' }}
            >
                {/* Outer circle */}
                <circle
                    cx={half}
                    cy={half}
                    r={r}
                    fill="none"
                    stroke="url(#globeGrad)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />

                {/* Latitude lines */}
                {[-0.55, -0.2, 0.2, 0.55].map((ratio, i) => (
                    <ellipse
                        key={`lat-${i}`}
                        cx={half}
                        cy={half + r * ratio}
                        rx={r * Math.sqrt(1 - ratio * ratio)}
                        ry={r * 0.08}
                        fill="none"
                        stroke="rgba(148,163,184,0.15)"
                        strokeWidth="0.8"
                    />
                ))}

                {/* Longitude lines (rotating) */}
                <g style={{ transformOrigin: `${half}px ${half}px`, animation: 'globe-spin 40s linear infinite' }}>
                    {[0, 45, 90, 135].map((angle, i) => (
                        <ellipse
                            key={`lng-${i}`}
                            cx={half}
                            cy={half}
                            rx={r * 0.3}
                            ry={r}
                            fill="none"
                            stroke="rgba(148,163,184,0.12)"
                            strokeWidth="0.8"
                            transform={`rotate(${angle} ${half} ${half})`}
                        />
                    ))}
                </g>

                {/* Equator */}
                <ellipse
                    cx={half}
                    cy={half}
                    rx={r}
                    ry={r * 0.08}
                    fill="none"
                    stroke="rgba(245,158,11,0.2)"
                    strokeWidth="1"
                />

                {/* Continents - abstract dots */}
                {[
                    { x: -0.25, y: -0.2 },
                    { x: -0.15, y: -0.15 },
                    { x: -0.05, y: -0.25 },
                    { x: 0.15, y: 0.1 },
                    { x: 0.25, y: 0.15 },
                    { x: -0.3, y: 0.2 },
                    { x: 0.1, y: -0.1 },
                    { x: -0.1, y: 0.3 },
                    { x: 0.3, y: -0.15 },
                    { x: -0.2, y: 0.05 },
                    { x: 0.05, y: 0.25 },
                    { x: 0.2, y: -0.05 },
                ].map((pt, i) => (
                    <circle
                        key={`dot-${i}`}
                        cx={half + r * pt.x}
                        cy={half + r * pt.y}
                        r={2 + Math.random()}
                        fill="rgba(245,158,11,0.25)"
                    />
                ))}

                {/* Gradient defs */}
                <defs>
                    <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Orbit path (visible ring) */}
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: orbitRx * 2,
                    height: orbitRy * 2,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <svg width={orbitRx * 2} height={orbitRy * 2} viewBox={`0 0 ${orbitRx * 2} ${orbitRy * 2}`}>
                    <ellipse
                        cx={orbitRx}
                        cy={orbitRy}
                        rx={orbitRx - 2}
                        ry={orbitRy - 2}
                        fill="none"
                        stroke="rgba(245,158,11,0.12)"
                        strokeWidth="1"
                        strokeDasharray="6 4"
                    />
                </svg>
            </div>

            {/* Orbiting plane */}
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                    animation: 'orbit-plane 6s linear infinite',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        width: 20,
                        height: 20,
                    }}
                >
                    {/* Contrail */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 40,
                            height: 2,
                            background: 'linear-gradient(to left, rgba(245,158,11,0.4), transparent)',
                            borderRadius: 2,
                        }}
                    />
                    {/* Plane icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' }}>
                        <path
                            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                            stroke="#FBBF24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {/* Inner glow ring */}
            <div
                className="absolute rounded-full"
                style={{
                    width: r * 1.2,
                    height: r * 1.2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '1px solid rgba(245,158,11,0.08)',
                    animation: 'pulse-ring 3s ease-out infinite',
                }}
            />
        </div>
    )
}
