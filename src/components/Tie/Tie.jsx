import React, { useRef, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Uniform, DoubleSide, AdditiveBlending, Color, Vector3, MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import holographicVertexShader from '../../shaders/holographic/vertex.glsl'
import holographicFragmentShader from '../../shaders/holographic/fragment.glsl'

const TieComponent = forwardRef(function TieComponent({ ...props }, ref) {
  const { nodes: rawNodes } = useGLTF('/models/tie_v1.glb')

  const nodes = useMemo(() => rawNodes, [rawNodes])

  const targetRotationY = useRef(0)
  const currentRotationY = useRef(0)
  const rotationSpeed = useRef(0)
  const isReturning = useRef(false)
  const timeToNextRotation = useRef(Math.random() * 3 + 2)
  const timeAtOrigin = useRef(5)
  const materialRef = useRef()
  const meshRef = useRef()
  const groupRef = useRef()
  const progressRef = useRef(0)
  const worldPosition = new Vector3()

  useFrame((state, delta) => {
    if (materialRef.current && meshRef.current) {
      meshRef.current.getWorldPosition(worldPosition)
      const distance = worldPosition.length()
      const isAtOrigin = distance < 0.2
      const active = isAtOrigin ? 1.0 : 0.0

      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

      materialRef.current.uniforms.uActive.value = active

      if (isAtOrigin) {
        progressRef.current += delta
        materialRef.current.uniforms.uProgress.value = progressRef.current * 20
      } else {
        progressRef.current = 0
        materialRef.current.uniforms.uProgress.value = 0
      }

      if (isReturning.current) {
        timeAtOrigin.current -= delta
        if (timeAtOrigin.current <= 0) {
          targetRotationY.current = Math.random() * Math.PI * 2
          rotationSpeed.current = Math.random() * 0.9 + 1.2
          isReturning.current = false
          timeToNextRotation.current = Math.random() * 3 + 2
        }
      } else {
        timeToNextRotation.current -= delta
        if (timeToNextRotation.current <= 0) {
          targetRotationY.current = 0
          rotationSpeed.current = Math.random() * 1 + 3
          isReturning.current = true
          timeAtOrigin.current = 5
        }
      }

      currentRotationY.current = MathUtils.damp(currentRotationY.current, targetRotationY.current, rotationSpeed.current, delta)
      meshRef.current.rotation.y = currentRotationY.current
    }
  })

  useImperativeHandle(ref, () => ({
    get position() {
      if (meshRef.current) {
        meshRef.current.getWorldPosition(worldPosition)
      }
      return worldPosition
    }
  }))

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh ref={meshRef} geometry={nodes.Sphere.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={{
            uTime: new Uniform(0),
            uColor: new Uniform(new Color('#820000')),
            uActive: new Uniform(0),
            uProgress: new Uniform(0)
          }}
          side={DoubleSide}
          depthWrite={false}
          blending={AdditiveBlending}
          transparent
        />
      </mesh>
    </group>
  )
})

useGLTF.preload('/models/tie_v1.glb')

const Tie = React.memo(TieComponent)

export default Tie
