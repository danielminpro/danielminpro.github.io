import { useLoader, useThree } from '@react-three/fiber'
import { Box } from '@react-three/flex'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Layercard } from '../components/Layercard'
// import Geo from '../components/Geo'
import { useAspect } from '@react-three/drei'
import * as THREE from 'three'

const homeData = {
  text: 'Explore limitless possibilities for digital transformation in IT with ignited innovative vision. Unleash the power of the future today.',
  depth: 0,
  image: '/images/home/1.jpg',
}

export function Home() {
  const theme = useTheme()
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / 16)
  const texture = useLoader(THREE.TextureLoader, homeData.image)
  const [bW, bH] = useAspect(1920, 1920, 0.5)
  return (
    <Box dir="row" width="100%" height="100%" align="center" justify="center">
      <Box>
        <Layercard
          {...homeData}
          color={theme.palette.background.neutral}
          textColor={theme.palette.text.primary}
          boxWidth={bW}
          boxHeight={bH}
          map={texture}
          textScaleFactor={scale}
        />
        {/*<Geo position={[bW / 2, -bH / 2, 2]} />*/}
      </Box>
    </Box>
  )
}
