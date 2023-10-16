import React, { useMemo } from 'react'
import GaugeChart from 'react-gauge-chart'

interface IGaugeProps {
  title?: string
  Icon?: React.ReactNode
  value?: number
  min?: number
  max?: number
}

const Gauge: React.FC<IGaugeProps> = ({ title, Icon, min = 0, max = 100, value = 0 }) => {
  const percent = useMemo(() => {
    const range = max - min
    const divValue = value - min
    return divValue / range
  }, [min, max, value])

  return (
    <div className='flex flex-col w-full'>
      {title && (
        <div className='flex mb-4 pb-8 border  w-full'>
          {Icon && Icon}
          <span className=' font-semibold'>{title}</span>
        </div>
      )}
      <div className='flex items-center justify-center w-full min-h-[150px]'>
        <div className='w-[80%] h-full'>
          <GaugeChart
            nrOfLevels={3}
            cornerRadius={0}
            arcPadding={0}
            arcWidth={0.2}
            textColor='#000'
            percent={percent}
            formatTextValue={() => value.toFixed(2)}
            // hideText={true}
            animate={true}
            colors={['#A30B37', '#FA8334', '#79B473']}
          />
        </div>
      </div>
    </div>
  )
}
export default Gauge
