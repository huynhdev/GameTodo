import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd'
import {moveText} from '../Game'

const squareSource = {
  beginDrag(props) {
    return {
      i: props.i
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if(dropResult){
      moveText(item.i, dropResult.i)
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Square extends Component {

  render() {
    const { isDragging, connectDragSource } = this.props
    return connectDragSource(
      <div className="table">
        <div className="td">
          <div className="textarea_box" >
            {this.props.children}
          </div>
          <div className="textarea_overlay"></div>
        </div>
      </div>
    );
  }
}

export default DragSource('card', squareSource, collect)(Square)
