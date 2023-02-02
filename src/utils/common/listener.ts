export function keyDownListener() {
  // f12开发者工具监听
  window.addEventListener('keydown', e => {
    const { code } = e;
    if (code === 'F12') {
      window.electronAPI.openDev();
    } else if (code === 'F5') {
      location.reload();
    }
  })
}