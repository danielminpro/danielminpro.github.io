import * as React from 'react'
import useMeasure from 'react-use-measure'
import { useTrail, animated } from '@react-spring/web'

// import styles from './styles.module.css'

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export function TrailCursor() {
  const [trail, api] = useTrail(2, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }))
  const [ref, { left, top }] = useMeasure()

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - left, e.clientY - top] })
  }

  return (
    <div className={'container'}>
      <div ref={ref} className={'hooksMain'} onMouseMove={handleMouseMove}>
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
        ))}
      </div>
    </div>
  )
}
