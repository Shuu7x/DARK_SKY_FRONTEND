import React from 'react'
import { DomainTuple, VictoryChart, VictoryLine } from 'victory'

export type LineChartData = {
  x: number | Date
  y: number
}

export interface ILineChartProps {
  title?: string
  stokeColor?: string
  Icon?: React.ReactNode
  data: LineChartData[]
  domainY?: DomainTuple
}

const LineChartComponent: React.FC<ILineChartProps> = ({
  title,
  stokeColor = '#000',
  Icon,
  data,
  domainY = [0, 100],
}) => {
  return (
    <div className='flex flex-col w-full'>
      {title && (
        <div className='flex pb-3 border-b w-full'>
          {Icon && Icon}
          <span className=' font-semibold'>{title}</span>
        </div>
      )}
      <svg viewBox='0 0 700 300'>
        <VictoryChart width={730} height={300} standalone={false}>
          <VictoryLine
            style={{
              data: { stroke: stokeColor },
            }}
            domain={{ y: domainY }}
            data={data}
          />
        </VictoryChart>
      </svg>
    </div>
  )
}

export default LineChartComponent
