
import React, { Component } from 'react';
import Square from './Square';
import { DropTarget } from 'react-dnd';
import {canMove} from '../Game'

const squareTarget = {
  canDrop(props) {
    return canMove(props.i)
  },

  drop(props) {
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
        className="drop_box_border"
        style={{borderStyle: canDrop ? 'dashed' : 'solid', borderWidth: isOver ? '2px' : '1px'}}
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
