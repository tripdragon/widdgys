export type Widget = {
  title: string
  value: string
  detail: string
  tag: string
  extra?: 'nasdaq' | 'clock'
  span?: 1 | 2 | 3 | 4
}

type WidgetInputs = {
  liveTime: string
  nasdaqValue: string
}

export const buildWidgets = ({ liveTime, nasdaqValue }: WidgetInputs): Widget[] => [
  {
    title: '24hr Clock',
    value: liveTime,
    detail: 'Updates every second',
    tag: 'Realtime',
    extra: 'clock',
    span: 1
  },
  {
    title: 'Nasdaq',
    value: nasdaqValue,
    detail: 'Simulated live tick',
    tag: 'Markets',
    extra: 'nasdaq',
    span: 1
  },
  {
    title: 'Launch Window',
    value: '04:18',
    detail: 'Next auto-deploy ETA',
    tag: 'Scheduler'
  },
  {
    title: 'Storage Drift',
    value: '2.1 TB',
    detail: 'Projected in 6 days',
    tag: 'Capacity'
  },
  {
    title: 'Geo Mix',
    value: '7 regions',
    detail: 'Most active: Reykjavik',
    tag: 'Global'
  },
  {
    title: 'Focus Tiles',
    value: '5',
    detail: 'Pinned from last sprint',
    tag: 'Workflows'
  }
]
