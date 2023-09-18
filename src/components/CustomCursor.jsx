import { useRef, useEffect } from 'react'

export const CustomCursor = () => {
  // const { type } = useContext(CustomCursorContext);
  // const secondaryCursor = useRef(null)
  const mainCursor = useRef(null)
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  })

  useEffect(() => {
    const eventHandler = (event) => {
      const { clientX, clientY } = event

      const mouseX = clientX
      const mouseY = clientY

      positionRef.current.mouseX = mouseX // - secondaryCursor.current.clientWidth / 2
      positionRef.current.mouseY = mouseY // - secondaryCursor.current.clientHeight / 2
      mainCursor.current.style.transform = `translate3d(${mouseX - mainCursor.current.clientWidth / 2}px, ${
        mouseY - mainCursor.current.clientHeight / 2
      }px, 0)`
      // secondaryCursor.current.style.opacity = '1'
    }
    document.addEventListener('mousemove', eventHandler)

    return () => {
      positionRef.current = undefined
      document.removeEventListener('mousemove', eventHandler)
    }
  }, [])

  // useEffect(() => {
  //   const followMouse = () => {
  //     positionRef.current.key = requestAnimationFrame(followMouse)
  //     const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positionRef.current
  //     if (!destinationX || !destinationY) {
  //       positionRef.current.destinationX = mouseX
  //       positionRef.current.destinationY = mouseY
  //     } else {
  //       positionRef.current.distanceX = (mouseX - destinationX) * 0.15
  //       positionRef.current.distanceY = (mouseY - destinationY) * 0.15
  //       if (Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.1) {
  //         positionRef.current.destinationX = mouseX
  //         positionRef.current.destinationY = mouseY
  //       } else {
  //         positionRef.current.destinationX += distanceX
  //         positionRef.current.destinationY += distanceY
  //       }
  //     }
  //     secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
  //     return positionRef.current.key
  //   }
  //   const animKey = followMouse()
  //   return () => {
  //     cancelAnimationFrame(animKey)
  //   }
  // }, [])
  return (
    <div className={`cursor-wrapper`}>
      <div className="main-cursor " ref={mainCursor}>
        <div className="main-cursor-background"></div>
      </div>
      {/*<div className="secondary-cursor" ref={secondaryCursor}>*/}
      {/*  <div className="cursor-background"></div>*/}
      {/*</div>*/}
    </div>
  )
}

// export default memo(CustomCursor)
