import { useEffect, useState } from 'react'

export function useLiveTime() {
  const [liveTime, setLiveTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLiveTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      )
    }

    updateTime()
    const timer = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return liveTime
}
