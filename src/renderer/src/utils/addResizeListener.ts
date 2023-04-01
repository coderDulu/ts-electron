class AddWindowListener {
  listener = new Map();

  add(key: string, callback: (e: any) => void) {
    if (this.listener.get(key)) {
      console.log('listener is add');
    } else {
      window.addEventListener(key, callback);
      this.listener.set(key, callback)
    }
  }

  remove(key: string) {
    this.listener.delete(key);
  }

  clear() {
    this.listener.forEach((callback, key) => {
      window.removeEventListener(key, callback);
    })
    this.listener.clear();
  }
}

export const addWindowListener = new AddWindowListener();


export function keyDownListener() {
  addWindowListener.add('keydown', e => {
    const { code } = e;
    // f12开发者工具监听
    if (code === 'F12') {
      window.electronAPI.openDevTool()
    } else if (code === 'F5') {
      location.reload();
    }
  })
}