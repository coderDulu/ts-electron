import React, { useEffect } from 'react';
import { keyDownListener } from './utils/common/listener';

function App() {
  useEffect(() => {
    keyDownListener();
  }, [])


  return (
    <div className="App">
      React-Ts-electron-template
    </div>
  );
}

export default App;
