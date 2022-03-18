import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// emitter
/*
const emitter = new EventEmitter();

const handle = (data) => { 
  console.log('called', data)
  // long computation.... took 20 second
};
const handle2 = (data) => {};

emitter.on('eventName', handle);
emitter.on('eventName', handle);

emitter.on('eventName2', handle2);

emitter.emmit('eventName', { a: 2 });
// -> 20s
emitter.emmit('eventName', { a: 2 });
// -> 20s


// -> 'called', { a: 2 };
emitter.emmit('eventName2', { b: 2 });

emitter.off('eventName2', handle2);
emitter.off('eventName2');
*/

export class EventEmitter {
  emitters = {};
  state = {};
  async = false;

  constructor({ async = false }) {
    this.async = async;
  }

  on(name, handler) {
    if (this.emitters[name]) {
      this.emitters[name].push(handler);
    } else {
      this.emitters[name] = [handler];
    }
  }

  off(name, handler) {
    if (this.emitters[name]) {
      if (!handler) {
        this.emitters[name] = [];
      } else {
        this.emitters[name].filter((h) => h !== handler); 
      }
    }
  }

  emit(name, data) {
    if (this.emitters[name]) {
      this.emitters[name].forEach((h) => {
        if (this.async) {
          // new Promise((res) => {
          //   h(data);
          //   res();
          // })
          setTimeout(() => {
            h(data);
          }, 0);
        } else {
          h(data, this.emit)
        }
      });
    }
  }
}

const emitter = new EventEmitter({ async: false });

const handle = (data, emit) => { 
  console.log('called', data);
  new Array(10000000).fill(1).map((n, i) => n + i);
  emit('eventName2', { a: 1 });
};

// emitter.on('eventName', handle);
// console.time('start');
// emitter.emit('eventName', { a: 2 });
// emitter.emit('eventName', { a: 2 });
// emitter.emit('eventName', { a: 2 });
// console.timeEnd('start');
