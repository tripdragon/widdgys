import { useEffect, useRef } from 'react'
import Isotope from 'isotope-layout'
import { Sparkline } from './Sparkline'
import { JapaneseNumberFlashcard } from './JapaneseNumberFlashcard'
import { JapaneseNumberQuiz } from './JapaneseNumberQuiz'
import type { Widget } from '../data/widgets'

type WidgetGridProps = {
  widgets: Widget[]
  nasdaqHistory: number[]
}

export function WidgetGrid({ widgets, nasdaqHistory }: WidgetGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const isotopeRef = useRef<Isotope | null>(null)

  useEffect(() => {
    if (!gridRef.current) {
      return
    }

    isotopeRef.current = new Isotope(gridRef.current, {
      itemSelector: '.tile',
      layoutMode: 'masonry',
      percentPosition: true,
      masonry: {
        columnWidth: '.tile-sizer',
        gutter: 16
      }
    })

    return () => {
      isotopeRef.current?.destroy()
      isotopeRef.current = null
    }
  }, [])

  useEffect(() => {
    isotopeRef.current?.arrange()
  }, [widgets, nasdaqHistory])

  return (
    <div className="grid" ref={gridRef}>
      <div className="tile-sizer" aria-hidden="true" />
      <JapaneseNumberFlashcard span={4} />
      <JapaneseNumberQuiz span={1} />
      {widgets.map((widget) => (
        <article
          className={[
            'tile',
            widget.extra === 'clock' ? 'tile--clock' : '',
            widget.span ? `tile--span-${widget.span}` : ''
          ]
            .filter(Boolean)
            .join(' ')}
          key={widget.title}
        >
          <div className="tile-top">
            <p className="tile-title">{widget.title}</p>
            <span className="tile-tag">{widget.tag}</span>
          </div>
          <p className="tile-value">{widget.value}</p>
          <p className="tile-detail">{widget.detail}</p>
          {widget.extra === 'nasdaq' ? (
            <Sparkline values={nasdaqHistory} />
          ) : null}
        </article>
      ))}
    </div>
  )
}
