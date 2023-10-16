import React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'

const Slider: React.FC<RadixSlider.SliderProps> = (props) => {
  return (
    <RadixSlider.Root
      className='relative flex items-center select-none touch-none w-full h-5'
      {...props}
    >
      <RadixSlider.Track className='bg-slate-900 relative flex-grow rounded h-2'>
        <RadixSlider.Range className='absolute bg-sky-500 h-full rounded-full' />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className='block w-5 h-5 rounded-full shadow-md bg-sky-500'
        aria-label='Volume'
      />
    </RadixSlider.Root>
  )
}

export default Slider
