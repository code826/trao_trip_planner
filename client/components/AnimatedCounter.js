'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '', className = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    const startTime = performance.now()
                    const animate = (now) => {
                        const elapsed = now - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setCount(Math.floor(eased * target))
                        if (progress < 1) {
                            requestAnimationFrame(animate)
                        } else {
                            setCount(target)
                        }
                    }
                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [target, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    )
}
