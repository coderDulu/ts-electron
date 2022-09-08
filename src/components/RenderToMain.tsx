import React, { useState } from 'react'

export default function RenderToMain() {

  const [title, setTitle] = useState('');

  function handleSet() {
    window.electronAPI.setTitle(title)
    // console.log(title);
    // ipcRenderer.send('set-title', title);
    // window.Electron.ipcRenderer.send('set-title', title)
  }

  return (
    <>
      Title: <input id='title' onChange={e => setTitle(e.target.value)}/>
      <br></br>
      <button className="btn" onClick={handleSet}>Set</button>
    </>
  )
}
