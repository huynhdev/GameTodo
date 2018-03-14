let squares = Array(10).fill(null)
let observer = null;

function emitChange() {
  observer(squares);
}
export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}


export function addText(text,i){
  squares[i] = text;
  emitChange();
}

export function moveText(from , to){
  let text = squares[from]
  squares[from] = squares[to]
  squares[to] = text
  emitChange();
}
