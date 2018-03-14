
import React, { Component } from 'react';
import Square from './Square';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props) {
    return true;
  },

  drop(props) {
    console.log("drop",props)
    return{i: props.i}
  }
};

function collect(connect, monitor) {

  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


class BoardSquare extends Component {
  render(){
    const { i, connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div
        style={{ width: '100%', height: '150px', marginRight: '10px', borderStyle: 'solid' }}
        onClick={() => this.props.onClick(i)}
      >
        <Square i={i}>
          {this.props.children}
        </Square>
      </div>

    )
  }
}

export default DropTarget('card', squareTarget, collect)(BoardSquare);
