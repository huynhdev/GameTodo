
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
    const { i, square, connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div 
        className={square ? "drop_box_border drop_box_border_ht" : "drop_box_border"}
        style={{borderStyle: canDrop ? 'dashed' : 'solid', borderWidth: '2px', borderColor: isOver ? 'black' : '#f0ebed'  }}
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
