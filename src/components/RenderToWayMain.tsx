import React, { useState } from 'react'

export default function RenderToWayMain() {
  const [path, setPath] = useState()

  async function openHandle() {
    const filePath = await window.electronAPI.openFile();
    setPath(filePath);
  }

  return (
    <>
      <div>Dialog</div>
      <button type='button' onClick={openHandle}>Open a File</button>
      <div>
        File path: <strong id="filePath">{path}</strong>
      </div>
    </>
  )
}
