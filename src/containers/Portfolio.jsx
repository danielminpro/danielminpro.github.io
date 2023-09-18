import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Box } from '@react-three/flex'
import { HeightReporter } from '../components/HeightReporter'
import Text from '../components/Text'
import React, { useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { CustomSlider } from '../components/CustomSlider'
import { Html, useGLTF } from '@react-three/drei'
import styled from 'styled-components'

const portfolioData = {
  tag: '01',
  text: `Portfolio`,
  description: 'A Collection of Stunning Projects in Diverse Industry',
  items: [
    {
      image: '/images/portfolio/1.png',
      title: 'Personal Portfolio Website',
      description:
        'A personal website showcasing past work examples with a responsive 3D layout. Built using React, React Fiber, React Drei, React Spring, Three.js, WebGL, HTML, and CSS.',
    },
    {
      image: '/images/portfolio/2.png',
      title: 'Ingenious Vision',
      description:
        'A personal website displaying past work examples with a captivating WebGL audio analyzer and floating particles. Built using Three.js, WebGL, HTML, and CSS/SCSS.',
    },
    {
      image: '/images/portfolio/3.png',
      title: 'WebGL Audio Analyzer',
      description:
        'A personal work example visualizing an audio analyzer with a mesmerizing blob and noise effect. Built using WebGL and Web Audio API with Three.js.',
    },
    {
      image: '/images/portfolio/4.png',
      title: 'Lottery Wheel Game',
      description:
        'Built an engaging lottery wheel game with a spinning wheel using Vue.js, Vuex store, Canvas API, and Audio API. Developed with HTML, CSS, and JavaScript.',
    },
    {
      image: '/images/portfolio/5.png',
      title: '3D Building Presentation',
      description:
        'An interactive 3D presentation displaying a building with spot points and animated interactions. Built using JavaScript and Three.js.',
    },
    {
      image: '/images/portfolio/6.png',
      title: '3D Shirt Configurator',
      description:
        'Implemented a realistic 3D shirt configurator with customizable options using Three.js and PBR (Physically Based Rendering). Developed with JavaScript, Three.js, HTML, CSS, and Webpack.',
    },
    {
      image: '/images/portfolio/7.png',
      title: '3D Horse Nose-band Configurator',
      description:
        'Implemented a horse nose-band configurator with measurement visualization for a lifelike representation. Built using JavaScript, Three.js, HTML, CSS, and Webpack.',
    },
    {
      image: '/images/portfolio/8.png',
      title: 'Empyrean WebRTC',
      description:
        'Implemented a feature-rich screen sharing and live chat system based on WebRTC. Developed with NodeJS/ExpressJS and Socket.io for signaling server and data stream.',
    },
    {
      image: '/images/portfolio/9.png',
      title: 'Designhubz XR Widget',
      description:
        'Implemented an immersive XR try-on experience for eyewear and makeup using TypeScript, Three.js, and AI integration. Developed with TypeScript, Three.js, Webpack, and WebComponent.',
    },
    {
      image: '/images/portfolio/10.png',
      title: 'Designhubz B2B Platform',
      description:
        'Enhanced the Designhubz B2B platform with product management and Square online store integration capabilities. Developed with React, TypeScript, Styled Components, Storybook, and AWS services.',
    },
    {
      image: '/images/portfolio/11.png',
      title: 'Bionic Trader',
      description:
        'Built a cutting-edge bionic trading platform with a visually stunning order book and depth finder using BabylonJS and TypeScript. Developed with NodeJS/ExpressJS, BabylonJS, TypeScript, and various technologies.',
    },
    {
      image: '/images/portfolio/12.png',
      title: 'Lightning Bridge',
      description:
        'Developed a high-speed altcoin exchange platform running on Lightning Network and Azure infrastructure. Built with React, NextJS, TypeScript, BabylonJS, and PostgreSQL.',
    },
    {
      image: '/images/portfolio/13.png',
      title: 'Trade Mango',
      description:
        "Integrated the bionic trader's 3D depth finder into the Mango market platform for enhanced trading experience. Developed with React, NextJS, TypeScript, BabylonJS, and Tailwind CSS.",
    },
    {
      image: '/images/portfolio/14.png',
      title: 'SmartCountr Dashboard',
      description:
        'Implemented a feature-rich dashboard for SmartCountr, enabling room design and device connectivity visualization. Developed with Vue.js, PIXI.js, Tailwind CSS, and Webpack.',
    },
    {
      image: '/images/portfolio/15.png',
      title: 'Sympli Shopify Clothing Store',
      description:
        'Integrated a comprehensive size guide, improved collection pages, and optimized site performance for a clothing store on Shopify. Utilized Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/16.png',
      title: 'Lunya Clothing Store',
      description:
        'Implemented a product kit page, enhanced collection pages, and integrated Klarna payment for a clothing store on Shopify. Developed with Shopify, Shopify Plus, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/17.png',
      title: 'Mansur-Gavriel Bag Store',
      description:
        'Customized an existing Shopify theme based on a ready-made Figma design, adding color swatches to product and collection pages. Utilized Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/18.png',
      title: 'Samuel Hubbard Shoes Store',
      description:
        'Resolved mobile compatibility issues and optimized site performance. Implemented color swatches on product and collection pages. Developed with Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/19.png',
      title: 'Piglet Bedding Store',
      description:
        'Optimized site performance and addressed UI/UX bugs for a bedding, sleepwear, and homeware store. Developed with Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/20.png',
      title: 'Bakel Makeup Store',
      description:
        'Integrated Recharge and Klarna payment solutions. Fixed UI/UX bugs to enhance the user experience. Developed with Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/21.png',
      title: 'Crush Collection Knitwear Store',
      description:
        'Built a knitwear store from scratch based on a Figma design. Optimized performance using lazy loading mechanisms. Developed with Shopify, Liquid, HTML, CSS, and JS.',
    },
    {
      image: '/images/portfolio/22.png',
      title: 'World Flight Routes Visualization',
      description:
        'Visualized global flight routes on a WebGL-powered map using captivating particle animations. Developed with JavaScript, WebGL, and Three.js.',
    },
    {
      image: '/images/portfolio/23.png',
      title: 'Dextr Contact Center',
      description:
        'A VOIP application for contact management. Updated the dashboard UI with graph libraries, fixed browser compatibility issues, and resolved bugs. Developed with Vue.js and Amazon Connect.',
    },
    {
      image: '/images/portfolio/24.png',
      title: 'GUESTMAPP Interior Design Service',
      description:
        'Revamped page layout using JupiterX Site Builder. Integrated Limmu whiteboard API into the existing app. Developed with Android SDK, Objective C, and Limmu API.',
    },
    {
      image: '/images/portfolio/25.png',
      title: 'Refresh Studio',
      description:
        'Implemented a WebGL-based website with dynamic effects such as explode particle animations, a moving universe, and drop light effects. Developed with JavaScript, Three.js, and WebGL.',
    },
    {
      image: '/images/portfolio/26.png',
      title: 'Shoes Configurator',
      description:
        'Created a 3D shoes configurator allowing customization of styles, heels, materials, and colors. Developed with JavaScript, Three.js, HTML, and CSS.',
    },
    {
      image: '/images/portfolio/27.png',
      title: 'Python Video Creator',
      description: 'Generated hotel promotion videos from a set of images, texts, and brand logos using Python and OpenCV.',
    },
    {
      image: '/images/portfolio/28.png',
      title: '3D Plans',
      description:
        'Developed an interactive 3D working tour for houses using Three.js. Configured the 3D models with planes and wall pictures for an immersive experience. Optimized performance for smooth navigation. Developed with JavaScript, HTML, CSS, and Three.js.',
    },
  ],
}

const FormWrapper = styled.div`
  padding: 5px;
  display: none;
  &.show {
    display: block;
  }
`

const Title = styled.div`
  font-size: 0.95em;
  font-weight: 350;
  //margin-bottom: 1rem;
  max-width: 15rem;
  line-height: 1.5rem;
  user-select: none;
  color: ${(props) => props.color};
`

const Description = styled.div`
  font-size: 0.9em;
  font-weight: 200;
  //margin-bottom: 1rem;
  max-width: 15rem;
  line-height: 1.5rem;
  user-select: none;
  color: ${(props) => props.color};

  @media (max-width: 1024px) {
    max-width: 13rem;
  }
`

const color = new THREE.Color()
const scale = new THREE.Vector3()

const ArrowButton = (props) => {
  const { nodes } = useGLTF('/models/cursor.glb')
  const theme = useTheme()
  const ref = useRef(null)

  let hovered = false
  let down = false

  useFrame((state, delta) => {
    ref.current.material.color.lerp(color.set(hovered || down ? theme.palette.text.hover : theme.palette.text.primary), hovered || down ? 0.1 : 0.05)

    if (down) {
      ref.current.scale.lerp(scale.set(0.0375, 0.6, 0.375), 0.1)
    } else {
      ref.current.scale.lerp(scale.set(0.025, 0.4, 0.25), 0.05)
    }
  })

  const handleOnPointerOver = (e) => {
    hovered = true
  }

  const handleOnPointerOut = (e) => {
    hovered = false
  }

  const handlePointerDown = (e) => {
    down = true
  }

  const handlePointerUp = (e) => {
    down = false
  }

  return (
    <mesh
      {...props}
      ref={ref}
      geometry={nodes.Cube.geometry}
      // scale={[0.05, 0.7, 0.35]}
      onPointerOver={handleOnPointerOver}
      onPointerOut={handleOnPointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}>
      <meshStandardMaterial color={theme.palette.text.primary} roughness={0} envMapIntensity={1} toneMapped={false} />
    </mesh>
  )
}

export function SlideControl({ width, height, items, activeIndex, isFirstClick, onNext, onPrev }) {
  const theme = useTheme()
  const { gl, viewport } = useThree()
  const scale = Math.min(1, viewport.width / 16)
  const slideIndex = isFirstClick && isFirstClick.current ? activeIndex : activeIndex + 1
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const fontSize = scale < 1 ? 0.418 : scale * 0.418

  return (
    <group>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={1} color={theme.palette.background.card.primary} linear={true} toneMapped={false} />
        <ArrowButton rotation={[Math.PI / 2, 0, Math.PI / 2]} onClick={onPrev} position={[-width / 2 + 1.45, height / 2 - 1.5, 0]} />
        <Text
          italic
          fontSize={fontSize}
          position={[-width / 2 + 2.25, height / 2 - 1.35, 0.1]}
          lineHeight={1}
          letterSpacing={0}
          color={theme.palette.text.primary}
          maxWidth={(viewport.width / 4) * 3}>
          {`${zeroPad(slideIndex, 2)}/${items.length}`}
        </Text>
        <ArrowButton rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} position={[-width / 2 + 4.25, height / 2 - 1.5, 0]} onClick={onNext} />
      </mesh>
      <Html transform portal={{ current: gl.domElement.parentNode }} pointerEvents={'none'} zIndexRange={[1000, 9000]}>
        <FormWrapper className={'form-wrapper'}>
          <Title color={theme.palette.text.primary}>{items[slideIndex - 1].title}:</Title>
          <Description color={theme.palette.text.primary}>{items[slideIndex - 1].description}</Description>
        </FormWrapper>
      </Html>
    </group>
  )
}

export function Portfolio({ onReflow }) {
  const theme = useTheme()
  const { viewport } = useThree()
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 0, // 0.75,
    marginLeft: 0, // 0.25
    marginRight: 0, // 0.25
    width: 'auto',
    height: 'auto',
    minWidth: 6,
    minHeight: 9.25, // 3
    maxWidth: 11.43,
    maxHeight: 11.43, // 6
  }
  const scale = Math.min(1, viewport.width / 16)
  const [isClicked, setIsClicked] = useState(false)

  const itemCount = portfolioData.items.length

  const [currentIndex, setCurrentIndex] = useState(1)
  const [prevIndex, setPrevIndex] = useState(0)
  const isFirstClick = useRef(true)

  const onNext = () => {
    setIsClicked(true)
    if (!isFirstClick.current) {
      setPrevIndex(currentIndex)
      setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1))
    }
    isFirstClick.current = false
  }

  const onPrev = () => {
    setIsClicked(true)
    if (!isFirstClick.current) {
      setPrevIndex(currentIndex)
      setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1))
    }
    isFirstClick.current = false
  }

  return (
    <Box dir="column" align={'center'} justify="flex-start" marginTop={2 * scale} height="auto">
      <HeightReporter onReflow={onReflow} />
      <Box marginLeft={1.5} marginRight={1.5}>
        <Text
          bold
          position-z={0.5}
          textAlign={'center'}
          fontSize={1.5 * scale}
          lineHeight={1}
          letterSpacing={-0.05}
          color={theme.palette.text.primary}
          maxWidth={(viewport.width / 4) * 3}>
          {portfolioData.text}
        </Text>
      </Box>
      <Box marginLeft={1.5} marginRight={1.5} marginTop={0.25}>
        <Text
          italic
          position-z={0.5}
          fontSize={scale < 0.5 ? 0.25 : scale * 0.418}
          lineHeight={1}
          letterSpacing={0}
          color={theme.palette.text.neutral}
          maxWidth={(viewport.width / 4) * 3}>
          {portfolioData.description.toUpperCase()}
        </Text>
      </Box>
      <Box dir="row" width="100%" height="auto" justify={'center'} grow={1} wrap="wrap" marginTop={0.4 * scale}>
        <Box {...{ ...boxProps, maxWidth: 13.5 }}>
          {(width, height) => (
            <CustomSlider
              items={portfolioData.items}
              prevIndex={prevIndex}
              activeIndex={currentIndex}
              width={width}
              height={height}
              isClicked={isClicked}
            />
          )}
        </Box>
        <Box {...{ ...boxProps, maxWidth: 8.2 }}>
          {(width, height) => (
            <SlideControl
              width={width}
              height={height}
              items={portfolioData.items}
              activeIndex={currentIndex}
              isFirstClick={isFirstClick}
              onNext={onNext}
              onPrev={onPrev}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
