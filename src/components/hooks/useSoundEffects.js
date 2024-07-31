import { useMemo } from 'react'

const useSoundEffects = (soundFiles) => {
  const sounds = useMemo(() => soundFiles.map(file => new Audio(file)), [soundFiles])

  const playRandomSound = () => {
    const sound = sounds[Math.floor(Math.random() * sounds.length)]
    sound.play()
  }

  return playRandomSound
}

export default useSoundEffects
