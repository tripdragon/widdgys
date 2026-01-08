import { useEffect, useState } from 'react'

const formatNasdaq = (value: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

export function useNasdaqTicker() {
  const [nasdaqPrice, setNasdaqPrice] = useState(15640.25)
  const [nasdaqHistory, setNasdaqHistory] = useState<number[]>([
    15610.2, 15622.8, 15615.6, 15630.1, 15618.4, 15636.7, 15628.9
  ])

  useEffect(() => {
    const tick = () => {
      setNasdaqPrice((current) => {
        const drift = (Math.random() - 0.45) * 12
        const next = Math.max(14000, current + drift)
        setNasdaqHistory((history) => [...history.slice(1), next])
        return next
      })
    }

    const timer = window.setInterval(tick, 2000)
    return () => window.clearInterval(timer)
  }, [])

  return {
    priceLabel: formatNasdaq(nasdaqPrice),
    history: nasdaqHistory
  }
}
