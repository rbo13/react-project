import React from 'react'

const useDisablePinchZoomEffect = () => {
  React.useEffect(() => {
    const disablePinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }
    document.addEventListener("touchmove", disablePinchZoom, { passive: false })
    return () => {
      document.removeEventListener("touchmove", disablePinchZoom)
    }
  }, [])
}

export { useDisablePinchZoomEffect }