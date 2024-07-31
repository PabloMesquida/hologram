import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes } = useGLTF('/tie.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/tie.glb')
