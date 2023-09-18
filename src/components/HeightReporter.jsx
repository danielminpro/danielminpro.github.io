import { useFlexSize } from '@react-three/flex'
import { useLayoutEffect } from 'react'

export function HeightReporter({ onReflow }) {
  const size = useFlexSize()
  useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size])
  return null
}
