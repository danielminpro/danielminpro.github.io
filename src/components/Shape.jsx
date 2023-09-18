import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'

export function Shape({ name, float = 300, color, config, ...props }) {
  const { nodes } = useSpline('/shapes.splinecode')
  return (
    <Float floatIntensity={float} rotationIntensity={0} speed={2}>
      <mesh renderOrder={1} geometry={nodes[name].geometry} {...props} width={1} height={0.5}>
        <MeshTransmissionMaterial {...config} color={color} toneMapped={false} />
      </mesh>
    </Float>
  )
}
