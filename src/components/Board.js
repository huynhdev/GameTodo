import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import data from '../data.json';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BoardSquare from './BoardSquare'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import {addText, addDesc} from '../Game'

const focusField = input => {
  input ? input.focus() : null

};

class Board extends Component {
  state={
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
  updateDesc(i,e){
    addDesc(e.target.value,i)
  }

  renderSquareImportant(i) {
    return (
      <div key={i}
        className="drop_box_container"
      >
        <BoardSquare i={i}  onClick={this.handleClick.bind(this)} 
        >
          <div style={{cursor: 'move'}}>
            {this.props.squares[i]}
          </div>
        </BoardSquare>
        {
          <div className="box_desc" style={{ display: this.props.squares[i] ? null : 'none'}}>
            <textarea  ref={this.props.squares[i]  ? focusField : null}  onChange={(event) => this.updateDesc(i,event)} placeholder="Why is this card so important to you?" value={i < 10 ? this.props.desc[i] ? this.props.desc[i] : ""  : ""}>
            </textarea>
          </div>
        }
      </div>
    );
  }

  renderNotImportant(i){
    return(
      <div key={i} className="drop_box_container">
        <BoardSquare i={i} onClick={this.handleClick.bind(this)} 
        >
          <div style={{cursor: 'move'}}>
            {this.props.squares[i]}
          </div>
        </BoardSquare>
      </div>
    )

  }

  render() {
    const squaresImportant = [];
    const squaresSomeWhatImportant = [];
    const squaresNotImportant = [];

    for (let i = 0; i < 10; i++) {
      squaresImportant.push(this.renderSquareImportant(i));
    }
    for (let i = 10; i<28; i++){
      squaresSomeWhatImportant.push(this.renderNotImportant(i))
    }
    for (let i = 28; i<46; i++){
      squaresNotImportant.push(this.renderNotImportant(i))
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={5}>
            <h2>{_.last(this.state.data)}</h2>
          </Col>
          <Col xs={6} md={7}>
            <hr />
            <h1>VERY IMPORTANT</h1>
            <div className="boxContainer">
              {squaresImportant}
            </div>
            <Row className="subBox">
              <Col md={6} className="drop_boxes_wrap">
                <hr />
                <h1>SOMEWHAT IMPORTANT </h1>
                <div className="drop_boxes">
                  {squaresSomeWhatImportant}
                </div>
              </Col>
              <Col md={6} className="drop_boxes_wrap">
                <hr />
                <h1>NOT IMPORTANT</h1>
                <div className="drop_boxes">
                  {squaresNotImportant}
                </div>
              </Col>
            </Row>
            <div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
