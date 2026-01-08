type SparklineProps = {
  values: number[]
}

export function Sparkline({ values }: SparklineProps) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = 100 / (values.length - 1)
  const points = values
    .map((value, index) => {
      const x = index * step
      const y = 40 - ((value - min) / range) * 40
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const last = values[values.length - 1]
  const previous = values[values.length - 2] ?? last
  const trendUp = last >= previous

  return (
    <div className="sparkline" data-trend={trendUp ? 'up' : 'down'}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none">
        <polyline points={points} />
      </svg>
      <span>{trendUp ? 'UP' : 'DOWN'}</span>
    </div>
  )
}
