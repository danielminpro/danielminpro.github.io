import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Box } from '@react-three/flex'
import { HeightReporter } from '../components/HeightReporter'
import Text from '../components/Text'
import React, { useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Cloud } from '../components/WordCloud'
import { Html } from '@react-three/drei'
import styled from 'styled-components'
import { IconGithub } from '../components/icons/Github'
import { IconReact } from '../components/icons/React'
import { IconHtml5 } from '../components/icons/Html5'
import { IconCss3 } from '../components/icons/Css3'
import { IconJavascript } from '../components/icons/Javascript'
import { IconVue } from '../components/icons/Vue'
import { IconSass } from '../components/icons/Sass'
import { IconNodejs } from '../components/icons/Nodejs'
import { IconAngular } from '../components/icons/Angular'
import { IconPython } from '../components/icons/Python'
import { IconLaravel } from '../components/icons/Laravel'
import { IconAmazon } from '../components/icons/Amazon'
import { IconWordpress } from '../components/icons/Wordpress'
import { IconGoogle } from '../components/icons/Google'
import { IconVercel } from '../components/icons/Vercel'
// import { IconBitbucket } from '../components/icons/Bitbucket'
import { IconDocker } from '../components/icons/Docker'
import { IconFigma } from '../components/icons/Figma'
import { IconBitcoin } from '../components/icons/Bitcoin'
import { IconShopify } from '../components/icons/Shopify'
import { IconThreejs } from '../components/icons/Threejs'
// import { IconTypescript } from '../components/icons/Typescript'
import { IconSlack } from '../components/icons/Slack'

const skillsData = {
  tag: '02',
  text: `Expertise`,
  description: 'A Comprehensive Overview of My Expertise and Core Competencies',
  images: [
    {
      front: '/images/c4cA8UN.jpg',
      back: '/images/c4cA8UN.jpg',
    },
    {
      front: '/images/ajQ73ol.jpg',
      back: '/images/ajQ73ol.jpg',
    },
    {
      front: '/images/5.jpg',
      back: '/images/5.jpg',
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

const SkillList = styled.ul`
  font-size: 0.9em;
  font-weight: 200;
  padding: 0;
  margin: 0 0 1rem 0;
  width: 12rem;
  line-height: 1.5rem;
  user-select: none;
  list-style: none;
  color: ${(props) => props.color};
`

const SkillListItem = styled.li`
  margin-bottom: 1.5rem;
`

const SkillItem = styled.div`
  margin-bottom: 1rem;
`

const SkillItemTitle = styled.div`
  font-weight: 200;
  margin-bottom: 0.3rem;
`

const SkillItemIcons = styled.div`
  display: flex;
  gap: 5px;
`

function Rig({ children }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.25)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.25)
  })
  return (
    <group ref={ref} position={[-0.2, 0.2, 0.5]}>
      {children}
    </group>
  )
}

export function Keywords({ width, height }) {
  const theme = useTheme()
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / 16)
  const fontSize = scale < 0.5 ? 0.4 : scale * 0.5
  const cloudRadius = scale < 0.5 ? 2 : scale * 3

  return (
    <group>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={1} color={theme.palette.background.card.primary} linear={true} toneMapped={false} />
      </mesh>
      <Rig>
        <Cloud count={7} radius={cloudRadius} fontSize={fontSize} />
      </Rig>
    </group>
  )
}

export function Skills({ width, height }) {
  const theme = useTheme()
  const { gl } = useThree()
  // const scale = Math.min(1, viewport.width / 16)

  return (
    <group>
      <mesh>
        {/*<shapeGeometry args={[RoundedRect(width, height, 0.15)]} />*/}
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={1} color={theme.palette.background.card.secondary} linear={true} toneMapped={false} />
        <Html transform portal={{ current: gl.domElement.parentNode }} pointerEvents={'none'} zIndexRange={[1000, 9000]}>
          <FormWrapper className={'form-wrapper'}>
            <SkillList color={theme.palette.text.primary}>
              <SkillListItem>
                <SkillItem>
                  <SkillItemTitle>Primary Skills</SkillItemTitle>
                  <SkillItemIcons>
                    <IconReact width={17} height={17} color={theme.palette.text.secondary} />
                    <IconJavascript width={17} height={17} color={theme.palette.text.secondary} />
                    {/*<IconTypescript width={15} height={17} color={theme.palette.text.secondary} />*/}
                    <IconHtml5 width={17} height={17} color={theme.palette.text.secondary} />
                    <IconCss3 width={17} height={17} color={theme.palette.text.secondary} />
                    <IconSass width={17} height={17} color={theme.palette.text.secondary} />
                    <IconNodejs width={17} height={17} color={theme.palette.text.secondary} />
                    <IconShopify width={17} height={17} color={theme.palette.text.secondary} />
                    <IconThreejs width={17} height={17} color={theme.palette.text.secondary} />
                  </SkillItemIcons>
                </SkillItem>
                <SkillItem>
                  <SkillItemTitle>Secondary Skills</SkillItemTitle>
                  <SkillItemIcons>
                    <IconVue width={17} height={17} color={theme.palette.text.secondary} />
                    <IconAngular width={17} height={17} color={theme.palette.text.secondary} />
                    <IconPython width={17} height={17} color={theme.palette.text.secondary} />
                    <IconLaravel width={17} height={17} color={theme.palette.text.secondary} />
                    <IconWordpress width={17} height={17} color={theme.palette.text.secondary} />
                    <IconBitcoin width={17} height={17} color={theme.palette.text.secondary} />
                  </SkillItemIcons>
                </SkillItem>
                <SkillItem>
                  <SkillItemTitle>Cloud Services</SkillItemTitle>
                  <SkillItemIcons>
                    <IconAmazon width={17} height={17} color={theme.palette.text.secondary} />
                    <IconGoogle width={17} height={17} color={theme.palette.text.secondary} />
                  </SkillItemIcons>
                </SkillItem>
                <SkillItem>
                  <SkillItemTitle>Development Tools</SkillItemTitle>
                  <SkillItemIcons>
                    <IconDocker width={17} height={17} color={theme.palette.text.secondary} />
                    <IconVercel width={17} height={17} color={theme.palette.text.secondary} />
                    <IconGithub width={17} height={17} color={theme.palette.text.secondary} />
                    <IconSlack width={17} height={17} color={theme.palette.text.secondary} />
                    <IconFigma width={17} height={17} color={theme.palette.text.secondary} />
                  </SkillItemIcons>
                </SkillItem>
              </SkillListItem>
            </SkillList>
          </FormWrapper>
        </Html>
      </mesh>
    </group>
  )
}

export function Expertise({ onReflow }) {
  const theme = useTheme()
  const { viewport } = useThree()
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 0, // 0.75,
    marginLeft: 0, // 0.25,
    marginRight: 0, // 0.25,
    width: 'auto',
    height: 'auto',
    minWidth: 6,
    minHeight: 9.25,
    maxWidth: 6,
    maxHeight: 11.43,
  }
  const scale = Math.min(1, viewport.width / 16)

  return (
    <Box dir="column" align={'center'} justify="flex-start" marginTop={2 * scale} height="auto">
      <HeightReporter onReflow={onReflow} />
      <Box marginLeft={1.5} marginRight={1.5}>
        <Text
          bold
          position-z={0.5}
          textAlign={'right'}
          fontSize={1.5 * scale}
          lineHeight={1}
          letterSpacing={-0.05}
          color={theme.palette.text.primary}
          maxWidth={(viewport.width / 4) * 3}>
          {skillsData.text}
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
          {skillsData.description.toUpperCase()}
        </Text>
      </Box>
      <Box dir="row" width="100%" height="auto" justify={'center'} grow={1} wrap="wrap" marginTop={0.4 * scale}>
        <Box {...{ ...boxProps, maxWidth: 7.07 }}>{(width, height) => <Skills width={width} height={height} />}</Box>
        <Box {...{ ...boxProps, maxWidth: 11.43 }}>{(width, height) => <Keywords width={width} height={height} />}</Box>
      </Box>
    </Box>
  )
}
