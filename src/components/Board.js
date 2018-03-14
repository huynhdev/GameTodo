import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import data from '../data.json';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BoardSquare from './BoardSquare'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import {addText} from '../Game'

const focusField = input => {
  input.focus();
};

class Board extends Component {
  state={
    squares: Array(10).fill(null),
    data: null,
  }

  componentDidMount(){
    let newData = _.map(data,'title')
    this.setState({data: newData})
  }

  handleClick(i){
    let newSquares = _.clone(this.props.squares);
    if(newSquares[i] === null){
      addText(this.state.data.pop(),i)
    }
    else{
      this.state.data.push(newSquares[i])
      addText(null,i)
    }
    
  }

  renderSquare(i) {
    return (
      <div key={i}
        className="drop_box_container"
      >
        <BoardSquare i={i} onClick={this.handleClick.bind(this)} 
        >
          {this.props.squares[i]}
        </BoardSquare>
        <div style={{width: '100%', height: '75px', borderStyle: 'solid', margin: '10px 0 ', display: this.props.squares[i] ? null : 'none'}}>
          <textarea ref={focusField}  style={{boxSizing: 'border-box', width: '100%', height: '100%'}}></textarea>
        </div>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 10; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={4}>
            <h2>{_.last(this.state.data)}</h2>
          </Col>
          <Col xs={6} md={8}>
            <div className="boxContainer">
              {squares}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
