import { useThree } from '@react-three/fiber'
import { Box } from '@react-three/flex'
import Text from '../components/Text'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { Line } from '@react-three/drei'

const contactData = {
  depth: 0,
  color: '#cccccc',
  textColor: '#ffffff',
  text: 'In the vast expanse\nof possibilities,\ninnovation knows\nno bounds.\nThe journey of\ndigital transformation\nnever stops...',
  image: '/images/1.jpg',
  lines: [
    {
      points: [
        [-20, 0, 0],
        [-9, 0, 0],
      ],
      lineWidth: 0.5,
    },
    {
      points: [
        [20, 0, 0],
        [9, 0, 0],
      ],
      lineWidth: 0.5,
    },
  ],
}

export function Breakdown({ text, tag, images, textScaleFactor, onReflow, left = false }) {
  const theme = useTheme()
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / 16)

  return (
    <Box dir="row" width="100%" height="100%" align="center" justify="center">
      <Box centerAnchor>
        {contactData.lines.map((props, index) => (
          <Line key={index} color={theme.palette.text.secondary} {...props} />
        ))}
        <Text
          bold
          position-z={0.5}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5 * scale}
          lineHeight={1}
          letterSpacing={-0.05}
          color={theme.palette.text.primary}
          maxWidth={(viewport.width / 4) * 3}>
          {contactData.text}
        </Text>
      </Box>
    </Box>
  )
}
