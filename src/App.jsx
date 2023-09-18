import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls, Environment } from '@react-three/drei'
import state from './store/state'
import { WaterEffects } from './components/WaterEffects'
import { useTheme } from './hooks/useTheme'
import { Content } from './components/Content'
import { useThemeSetting } from './contexts/theme'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'

export default function App() {
  const theme = useTheme()
  const { applyTheme } = useThemeSetting()

  const scrollArea = useRef()
  const onScroll = (e) => (state.top = e.target ? e.target.scrollTop : 0)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [pages, setPages] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const systemModeHandler = (event) => {
      const colorScheme = event.matches ? 'dark' : 'light'
      console.log(colorScheme) // "dark" or "light"
      applyTheme(colorScheme)
    }

    if (mediaQuery.matches) {
      applyTheme('dark')
    } else {
      applyTheme('light')
    }
    mediaQuery.addEventListener('change', systemModeHandler)
    return () => {
      mediaQuery.removeEventListener('change', systemModeHandler)
    }
  }, [applyTheme])

  return (
    <>
      <CustomCursor />
      {/*<TrailCursor />*/}
      <Canvas
        shadows
        raycaster={{ enabled: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false, depth: false }}
        // onCreated={({ gl }) => gl.setClearColor(theme.palette.background.default)}
        linear={true}>
        <color attach="background" args={[theme.palette.background.default]} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
        <Suspense fallback={null}>
          <ScrollControls>
            <Scroll>
              <Content onReflow={setPages} />
            </Scroll>
            <Scroll html>
              <div
                className="scrollArea"
                ref={scrollArea}
                onScroll={onScroll}
                onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}>
                {/*<div style={{ height: `${pages * 100}vh` }} />*/}
                {state.navs.map(({ name, pageSize, id }) => (
                  <div key={id} id={name} style={{ height: `${((pageSize * pages) / state.sections) * 100}vh` }} />
                ))}
              </div>
            </Scroll>
          </ScrollControls>
          {/*<Environment preset="city" />*/}
          <Environment files="/hdri/venice_sunset_1k.hdr" blur={0.8} />
        </Suspense>
        <WaterEffects />
      </Canvas>
      <LoadingScreen />
    </>
  )
}
