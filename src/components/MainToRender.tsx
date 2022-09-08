import React, { useState } from 'react'

export default function MainToRender() {
  const [counter, setCounter] = useState(0);

  window.electronAPI.handleCount((event: any, value: number) => {
    setCounter(value);
    event.sender.send('counter-value', value)
  })

  return (
    <div>
      Current value:
      <strong>{counter}</strong>
    </div>
  )
}
