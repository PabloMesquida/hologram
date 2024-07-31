import { useRef } from 'react'
import { Float } from '@react-three/drei'
import Tie from './components/Tie/Tie'
import Base from './components/Base/Base'

function Experience() {
  const tieRef = useRef()

  return (
    <>
      <Float
        speed={20}
        rotationIntensity={0.5}
        floatIntensity={1.5}
        floatingRange={[0, 2.5]}
      >
        <Tie ref={tieRef} />
      </Float>
      <Base tieRef={tieRef} />
    </>
  )
}

export default Experience
