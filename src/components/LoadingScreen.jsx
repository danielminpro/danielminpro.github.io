import { useProgress } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'

export const LoadingScreen = () => {
  const { progress } = useProgress()
  const [animClass, setAnimClass] = useState('')
  const timer = useRef(null)

  useEffect(() => {
    if (progress >= 100) {
      document.body.classList.add('loaded')

      timer.current = setTimeout(() => {
        document.body.classList.add('enable-html')
        setAnimClass('pt-page-moveToBottomEasing')
      }, 550)
    }
    return () => {
      document.body.classList.remove('loaded')
      if (timer.current) {
        clearTimeout(timer.current)
        document.body.classList.remove('enable-html')
      }
    }
  }, [progress])

  return (
    <div className={`loading loading-container ${animClass}`}>
      <div className={`loading-data`}>{Math.round(progress)}</div>
      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  )
}
