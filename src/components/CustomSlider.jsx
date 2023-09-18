import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useTexture, shaderMaterial } from '@react-three/drei'

export const ImageWipeMaterial = shaderMaterial(
  {
    progressFactor: 0,
    divisionsFactor: 15,
    offsetFactor: 0,
    alphaFactor: 1,
    zoomFactor: 0,
    directionFactor: 1,
    aspectFactor: new THREE.Vector2(1, 4 / 9),
    tex: undefined,
    tex2: undefined,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform float progressFactor;
    uniform float divisionsFactor;
    uniform float offsetFactor;
    uniform float alphaFactor;
    uniform float zoomFactor;
    uniform float directionFactor;
    uniform vec2 aspectFactor;
    
    #define M_PI 3.1415
    
    mat2 rotate(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }
    
    vec2 getScaledUv(vec2 uv, float zoom) {
      vec2 tempUv = (uv - vec2(.5));
      tempUv = tempUv / zoom + vec2(.5);
      return tempUv;
    }
    
    float srgbToLinear(float c) {
        if (c <= 0.04045)
            return c / 12.92;
        else
            return pow((c + 0.055) / 1.055, 2.4);
    }

    void main() {
      vec2 uv = vUv;
      // vec2 uv = vec2(0.5) + vUv * aspectFactor - aspectFactor * 0.5;
      vec2 uvGrid = fract(uv * vec2(1. , divisionsFactor));
      vec2 scaledUv = getScaledUv(uv, 1. + zoomFactor);
      
      // float currentProgress = fract(progressFactor);
      float currentProgress = progressFactor;
      
      vec2 uvDisplaced1 = scaledUv + uvGrid * vec2(0., scaledUv.y + directionFactor * offsetFactor) * currentProgress;
      vec2 uvDisplaced2 = scaledUv + uvGrid * vec2(0., scaledUv.y - directionFactor * offsetFactor) * (1. - currentProgress);
      
      vec3 texStart = texture2D(tex, uvDisplaced1).rgb;
      vec3 texEnd = texture2D(tex2, uvDisplaced2).rgb;
      vec3 color = mix(texStart, texEnd, currentProgress).rgb;
      
      gl_FragColor = vec4(srgbToLinear(color.r), srgbToLinear(color.g), srgbToLinear(color.b), alphaFactor);
      
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
)

extend({ ImageWipeMaterial })

export function CustomSlider({ items, prevIndex, activeIndex, width, height, isClicked }) {
  const ref = useRef()
  const images = items.map((v) => v.image)
  const textures = useTexture(images)
  // const [hovered, setHover] = useState(false)

  useEffect(() => {
    ref.current.progressFactor = 0
  }, [activeIndex])

  useFrame((state, delta) => {
    // ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.075)
    // console.log('delta:', delta)
    // if (ref.current.progressFactor + 0.001 > 1) ref.current.progressFactor = 0
    // ref.current.progressFactor = THREE.MathUtils.lerp(ref.current.progressFactor, 1, 0.025)
    // ref.current.progressFactor += (1 - ref.current.progressFactor) * 0.025
    ref.current.progressFactor = THREE.MathUtils.lerp(ref.current.progressFactor, isClicked ? 1 : 0, 0.05)
  }, -1)

  return (
    // <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
    <mesh>
      <planeGeometry args={[width, height]} />
      {/*<imageWipeMaterial ref={ref} tex={texture1} tex2={texture2} divisionsFactor={35} zoomFactor={0} toneMapped={false} />*/}
      <imageWipeMaterial ref={ref} tex={textures[prevIndex]} tex2={textures[activeIndex]} divisionsFactor={35} zoomFactor={0} toneMapped={false} />
    </mesh>
  )
}
