import * as THREE from 'three'

export function RoundedRect(width, height, radius) {
  const roundedRectShape = new THREE.Shape()

  roundedRectShape.moveTo(-(width / 2), -(height / 2) + radius)
  roundedRectShape.lineTo(-(width / 2), height / 2 - radius)
  roundedRectShape.quadraticCurveTo(-(width / 2), height / 2, -(width / 2) + radius, height / 2)
  roundedRectShape.lineTo(width / 2 - radius, height / 2)
  roundedRectShape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius)
  roundedRectShape.lineTo(width / 2, -(height / 2) + radius)
  roundedRectShape.quadraticCurveTo(width / 2, -(height / 2), width / 2 - radius, -(height / 2))
  roundedRectShape.lineTo(-(width / 2) + radius, -(height / 2))
  roundedRectShape.quadraticCurveTo(-(width / 2), -(height / 2), -(width / 2), -(height / 2) + radius)

  return roundedRectShape
}
