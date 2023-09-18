import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import state from '../store/state'
import * as THREE from 'three'
import Text from './Text'

export function Layercard({ depth, boxWidth, boxHeight, text, textColor, color, map, textScaleFactor }) {
  const ref = useRef()
  const { viewport, size } = useThree()
  const pageLerp = useRef(state.top / size.height)
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15))
    if (depth >= 0) ref.current.opacity = page < state.threshold ? page / state.threshold : 1 // page < state.threshold * 1.7 ? 1 : 1 - (page - state.threshold * 1.7)
  })
  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial ref={ref} color={color} map={map} toneMapped={false} transparent opacity={1} />
      </mesh>
      <Text
        bold
        position={[boxWidth / 2, -boxHeight / 2, depth + 1.2]}
        maxWidth={(viewport.width / 4) * 1}
        anchorX="center"
        anchorY="middle"
        fontSize={0.6 * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}>
        {text}
      </Text>
    </>
  )
}
