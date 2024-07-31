import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import FakeGlowMaterial from '../../materials/FakeGlow/FakeGlowMaterial'
import useSoundEffects from '../hooks/useSoundEffects'
import { useHologramStore } from '../../store/useHologramStore'

function Base({ tieRef }) {
  const circleRef = useRef()
  const glowMaterialRef = useRef()
  const previousActive = useRef(0)

  const { isAudioPlaying } = useHologramStore()

  const playRandomSound = useSoundEffects([
    '/sounds/whoosh_electric_00.mp3',
    '/sounds/whoosh_electric_01.mp3',
    '/sounds/whoosh_electric_02.mp3',
    '/sounds/whoosh_electric_03.mp3'
  ])

  useFrame(() => {
    if (circleRef.current) {
      circleRef.current.rotation.y += 0.03
    }

    if (tieRef.current) {
      const newOpacity = 0.5 - tieRef.current.position.y * 0.1
      const newY = tieRef.current.position.y * 0.01

      const distance = tieRef.current.position.y
      const isAtOrigin = distance < 0.2
      const active = isAtOrigin ? 1.0 : 0.0

      if (glowMaterialRef.current) {
        glowMaterialRef.current.uniforms.glowSharpness.value = newY
        glowMaterialRef.current.uniforms.opacity.value = newOpacity
      }

      if (active !== previousActive.current && active === 1.0 && isAudioPlaying) {
        playRandomSound()
      }
      previousActive.current = active
    }
  })

  return (
    <>
      <group position={[0, -0.5, 0]} ref={circleRef}>
        <mesh position={[0, -4, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color='#380000'
            emissive='#380000'
            emissiveIntensity={80}
            toneMapped={false}
            transparent
            opacity={1}
            wireframe
          />
          <cylinderGeometry args={[6.5, 6.5, 0.1, 12]} />
        </mesh>
        <mesh position={[0, -4, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color='#380000'
            emissive='#380000'
            emissiveIntensity={80}
            toneMapped={false}
            transparent
            opacity={0.5}
          />
          <cylinderGeometry args={[6, 6, 0.5, 12]} />
        </mesh>
      </group>
      <mesh position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color='#753a3a' toneMapped={false} transparent opacity={1} />
        <circleGeometry args={[6, 32]} />
      </mesh>
      <mesh position={[0, 5.5, 0]}>
        <FakeGlowMaterial
          ref={glowMaterialRef}
          falloff={1}
          glowInternalRadius={1}
          glowColor='#ff0000'
          side='THREE.BackSide'
          depthTest={false}
        />
        <cylinderGeometry args={[5, 6, 20, 32]} />
      </mesh>
    </>
  )
}

export default Base
