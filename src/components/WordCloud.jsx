import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import randomWord from 'random-words'
import { useTheme } from '../hooks/useTheme'

function Word({ children, fontSize, ...props }) {
  const theme = useTheme()
  const color = new THREE.Color()
  const fontProps = { font: 'fonts/Roboto-Bold.ttf', fontSize: fontSize, letterSpacing: -0.05, lineHeight: 2, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => {
    e.stopPropagation()
    setHovered(true)
  }
  const out = () => setHovered(false)
  // const { mouse } = useThree()

  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])

  // Tie component to the render-loop
  // console.log('position:', position.z)
  useFrame(({ camera, pointer }) => {
    // Make text face the camera
    // ref.current.quaternion.copy(camera.quaternion)
    ref.current.lookAt(new THREE.Vector3().copy(camera.position))
    // Animate font color
    ref.current.material.color.lerp(color.set(hovered ? theme.palette.text.hover : theme.palette.text.primary), 0.1)
    // ref.current.material.opacity = 0.12 * Math.pow(props.position.z, 3)

    const maxOpacity = 1 // Maximum opacity
    const minOpacity = 0.2 // Minimum opacity
    const opacityRange = maxOpacity - minOpacity // Range of opacity values

    // Calculate the minimum and maximum z positions of all objects in the scene
    const boundingBox = new THREE.Box3().setFromObject(ref.current.parent)
    const minZ = boundingBox.min.z
    const maxZ = boundingBox.max.z

    // Calculate the new opacity based on the object's z position
    const newOpacity = maxOpacity - ((ref.current.position.z - minZ) / (maxZ - minZ)) * opacityRange

    // Set the new opacity value
    ref.current.material.opacity = 1 - newOpacity
  })
  return (
    <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...props} {...fontProps} children={children} />
  )
}

export function Cloud({ count = 4, radius = 20, fontSize = 0.5 }) {
  // Create a count x count random words with spherical distribution
  // const definedWords = ['react', 'javascript', 'typescript', 'css', 'html', 'nextjs', 'vue', 'nuxtjs', 'github', 'amazon', 'azure']
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), randomWord()])
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} fontSize={fontSize} />)
}
