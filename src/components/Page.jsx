import { useThree } from '@react-three/fiber'
import { Box } from '@react-three/flex'
import { HeightReporter } from './HeightReporter'
import Text from './Text'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { FadingImage } from './FadingImage'
// import { Shape } from './Shape'
// import { useControls } from 'leva'

export function Page({ text, tag, images, textScaleFactor, onReflow, left = false }) {
  const theme = useTheme()
  const { viewport } = useThree()
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 1,
    marginLeft: left * 1,
    marginRight: !left * 1,
    width: 'auto',
    height: 'auto',
    minWidth: 3,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 6,
  }

  return (
    <Box dir="column" align={left ? 'flex-start' : 'flex-end'} justify="flex-start" marginLeft={2} marginRight={2} height="auto" minHeight="100%">
      <HeightReporter onReflow={onReflow} />
      <Box marginLeft={1.5} marginRight={1.5} marginTop={2}>
        <Text position={[left ? 1 : -1, 0.5, 1]} fontSize={textScaleFactor} lineHeight={1} letterSpacing={-0.05} maxWidth={(viewport.width / 4) * 3}>
          {tag}
          <meshBasicMaterial color={theme.palette.text.neutral} toneMapped={false} />
        </Text>
      </Box>
      <Box marginLeft={left ? 1.5 : 1} marginRight={left ? 1 : 1.5}>
        <Text
          bold
          position-z={0.5}
          textAlign={left ? 'left' : 'right'}
          fontSize={1.5 * textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          color={theme.palette.text.primary}
          maxWidth={(viewport.width / 4) * 3}>
          {text}
        </Text>
      </Box>
      <Box dir="row" width="100%" height="auto" justify={left ? 'flex-end' : 'flex-start'} grow={1} wrap="wrap">
        {images.map((image, index) => (
          <Box key={index} {...boxProps}>
            {(width, height) => <FadingImage image={image} width={width} height={height} />}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
