import React, { useCallback, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import state from '../store/state'
import { Flex } from '@react-three/flex'
import { Home } from '../containers/Home'
import { Portfolio } from '../containers/Portfolio'
import { About } from '../containers/About'
import { Contact } from '../containers/Contact'
import { Breakdown } from '../containers/Breakdown'
import { Expertise } from '../containers/Expertise'

export function Content({ onReflow }) {
  const group = useRef()
  const { viewport, size } = useThree()
  const vec = new THREE.Vector3()

  const pageLerp = useRef(state.top / size.height)

  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15))
    const y = (page - state.threshold) * viewport.height
    const sticky = 0 //state.threshold * viewport.height
    group.current.position.lerp(vec.set(0, page < state.threshold ? sticky : y, page < state.threshold ? 5.5 - page * 1.25 : 0), 0.15)
  })

  const handleReflow = useCallback((w, h) => onReflow((state.pages = h / viewport.height + 4)), [onReflow, viewport.height])
  const sizesRef = useRef([])

  return (
    <group ref={group}>
      <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]} onReflow={handleReflow}>
        <Home />
        <Portfolio
          onReflow={(w, h) => {
            sizesRef.current[0] = h
            state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
          }}
        />
        <About
          onReflow={(w, h) => {
            sizesRef.current[1] = h
            state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
          }}
        />
        <Expertise
          onReflow={(w, h) => {
            sizesRef.current[1] = h
            state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
          }}
        />
        <Breakdown />
        <Contact
          onReflow={(w, h) => {
            sizesRef.current[1] = h
            state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
          }}
        />
      </Flex>
    </group>
  )
}
