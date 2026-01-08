import './App.css'
import { WidgetGrid } from './components/WidgetGrid'
import { buildWidgets } from './data/widgets'
import { useLiveTime } from './hooks/useLiveTime'
import { useNasdaqTicker } from './hooks/useNasdaqTicker'

function App() {
  const liveTime = useLiveTime()
  const { priceLabel, history } = useNasdaqTicker()
  const widgets = buildWidgets({ liveTime, nasdaqValue: priceLabel })

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Widdgys Grid System</p>
          <h1>Arrange signals into a crisp, responsive grid.</h1>
          <p className="subhead">
            A modular layout for dashboards, boards, and data-heavy views.
            Designed to breathe on mobile and feel dense on desktop.
          </p>
        </div>
        <div className="hero-card">
          <div>
            <p className="hero-title">Daily Pulse</p>
            <p className="hero-value">3,482</p>
            <p className="hero-note">Active widgets in the last 24 hours.</p>
          </div>
          <button className="primary">Add widget</button>
        </div>
      </header>

      <WidgetGrid widgets={widgets} nasdaqHistory={history} />
    </div>
  )
}

export default App
