import React, { useRef, useEffect } from 'react'
import { useHologramStore } from '../../store/useHologramStore'

const Sound = () => {
  const audioRef = useRef(null)

  const { isAudioPlaying, setIsAudioPlaying } = useHologramStore()

  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
        setIsAudioPlaying(false)
      }
    } else {
      const audio = new Audio('/sounds/background.mp3')
      audio.loop = true
      audio.volume = 1
      audio.play()
      audioRef.current = audio
      setIsAudioPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <button onClick={handleAudioToggle} style={{ position: 'absolute', top: 20, left: 20 }}>
        {isAudioPlaying ? 'Stop Audio' : 'Play Audio'}
      </button>
    </div>
  )
}

export default Sound
