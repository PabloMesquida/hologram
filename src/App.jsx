import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'
import Sound from './components/Sound/Sound'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Leva />
      <Canvas
        style={{ width: '100vw', height: '100vh', touchAction: 'none', backgroundColor: '#0e0f12' }}
        camera={{ position: [16, 2, -16], fov: 50 }}
      >
        <Experience />
        <directionalLight position={[0, 10, 0]} intensity={0.5} />
      </Canvas>
      <Sound />
      <Footer />
    </>
  )
}

export default App
