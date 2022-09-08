import React from 'react';
import MainToRender from './components/MainToRender';
import RenderToMain from './components/RenderToMain';
import RenderToWayMain from './components/RenderToWayMain';

function App() {
  return (
    <div className="App">
      {/* React-electron-template1 */}
      <RenderToMain/>
      <RenderToWayMain/>
      <MainToRender/>
    </div>
  );
}

export default App;
