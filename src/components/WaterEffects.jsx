import React, { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import state from '../store/state'
import { MathUtils } from 'three'
import { WaterPass } from './shaders/WaterPass'

extend({ WaterPass })

export function WaterEffects() {
  const water = useRef()
  let last = state.top
  let index = 0
  let values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  useFrame(() => {
    const { top } = state
    values[index] = Math.abs(top - last)
    const normalize = values.reduce((a, b) => a + b) / values.length
    water.current.factor = MathUtils.lerp(water.current.factor, normalize / 20, 0.1)
    last = top
    index = (index + 1) % 10
  })

  return (
    <Effects>
      <waterPass attachArray="passes" ref={water} />
    </Effects>
  )
}
