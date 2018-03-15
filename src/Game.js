let squares = Array(46).fill(null)
let desc = Array(10).fill(null)
let observer = null;

function emitChange() {
  observer(squares, desc);
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
  let title = squares[from]
  squares[from] = squares[to]
  squares[to] = title
  let descTitle = desc[from]
  desc[from] = desc[to]
  desc[to] = descTitle
  emitChange();
}

export function addDesc(text,i){
  desc[i] = text;
  emitChange();
}

export function canMove(i){
  if(i >= 0 && i < 46){
    return true;
  }
  return false;
}
