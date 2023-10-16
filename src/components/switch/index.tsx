import React from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'

// .SwitchRoot {
//     width: 42px;
//     height: 25px;
//     background-color: var(--black-a9);
//     border-radius: 9999px;
//     position: relative;
//     box-shadow: 0 2px 10px var(--black-a7);
//     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
//   }
//   .SwitchRoot:focus {
//     box-shadow: 0 0 0 2px black;
//   }
//   .SwitchRoot[data-state='checked'] {
//     background-color: black;
//   }

//   .SwitchThumb {
//     display: block;
//     width: 21px;
//     height: 21px;
//     background-color: white;
//     border-radius: 9999px;
//     box-shadow: 0 2px 2px var(--black-a7);
//     transition: transform 100ms;
//     transform: translateX(2px);
//     will-change: transform;
//   }
//   .SwitchThumb[data-state='checked'] {
//     transform: translateX(19px);
//   }

const Switch: React.FC = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <RadixSwitch.Root
      className={`w-12 h-[23px] border border-slate-400 rounded-full ${
        checked ? 'bg-green-400' : 'bg-gray-200'
      }`}
      checked={checked}
      onCheckedChange={setChecked}
    >
      <RadixSwitch.Thumb
        className={`block w-5 h-5 bg-white rounded-full shadow  ${
          checked ? 'translate-x-[25px]' : 'translate-x-[2px]'
        }`}
      />
    </RadixSwitch.Root>
  )
}

export default Switch
