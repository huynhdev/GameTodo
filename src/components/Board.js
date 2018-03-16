import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BoardSquare from './BoardSquare'
import _ from 'lodash'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import {addText, addDesc, restart} from '../Game'
import MediaQuery from 'react-responsive';
import Square from './Square'

const focusField = input => {
  input ? input.focus() : null

};

class Board extends Component {
  state = {
    input: false,
    value: null
  }

  handleClick(i){
    let newSquares = _.clone(this.props.squares);
    if(newSquares[i] === null){
      addText(this.props.data.pop(),i)
    }
    else{
      this.props.data.push(newSquares[i])
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
        <BoardSquare i={i} square={this.props.squares[i]}  onClick={this.handleClick.bind(this)} 
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
        <BoardSquare i={i} square={this.props.squares[i]} onClick={this.handleClick.bind(this)} 
        >
          <div style={{cursor: 'move'}}>
            {this.props.squares[i]}
          </div>
        </BoardSquare>
      </div>
    )
  }

  renderSquaresData(i){
    return(
      <div key={i}  className="drag_box">
        <div className="drop_box">
          <Square >
            {this.props.data[i]}
          </Square>
        </div>
      </div>
    )
  }

  handleClickInput(){
    this.setState({input:true})
  }

  handleInput(event){
    this.setState({value: event.target.value})

  }

  handleInputDone(){
    this.props.data.push(this.state.value)
    this.setState({input: false})
  }

  render() {
    const squaresData = [];
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

    if(this.props.data){
      for(let i = 0; i < this.props.data.length; i++){
        squaresData.push(this.renderSquaresData(i))
      }
    }


    return (
      <div>
        <div className="header">

        </div>
        <div className="wrapper">
          <div className="w_1320">
            <div className="sidebar">
              <div className="sidebar_inner">
                <div className="text">
                  <h3>How To Play</h3>
                  <p>Click on the pile to draw a new card.</p>
                  <p>Drag and drop each card into a space on the right depending on whether it is very important, somewhat important, or not important to you.</p>
                  <p>You may click and drag cards to move them after you have placed them.</p>
                </div>
                <div className="drag_boxes">

                  {squaresData}
                  {
                    this.state.input ? (
                      <div className="drag_box">
                        <div className="drop_box">
                          <Square >
                            <textarea onChange={(e) => this.handleInput(e)} ref={focusField} name="" cols="31" rows="12"></textarea>
                          </Square>
                        </div>
                      </div>
                    ):null
                  }

                </div>
                <div className="tips">
                  <p>Haven’t seen what you’re looking for?</p>
                  <div className="write_button_box">
                    {
                      this.state.input ? (
                        <button onClick={() => this.handleInputDone()}>Done</button>
                      ):(
                        <button onClick={() => this.handleClickInput()}>Write your own</button>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="main">
              <div className="main_inner">
                <div className="main_top">
                  <div className="restart_btn">
                    <button onClick={()=> restart()}>
                      Restart
                    </button>
                  </div>

                </div>
                <div className="drop_boxes_wrap drop_boxes_wrap_1">
                  <div className="title_wrap">
                    <div className="title_wrap_inner">
                      <h3 className="title">Very Important</h3>
                      <span className="subtitle">These are the ten you value most.</span>
                    </div>
                  </div>
                  <div className="drop_boxes">
                    {squaresImportant}
                  </div>
                </div>
                <div className="sub_drop_boxes">
                  <div className="drop_boxes_wrap">
                    <div className="title_wrap">
                      <div className="title_wrap_inner">
                        <h3 className="title">SomeWhat Important</h3>
                        <span className="subtitle"></span>
                      </div>
                    </div>
                    <div className="drop_boxes">
                      {squaresSomeWhatImportant}
                    </div>

                  </div>
                  <div className="drop_boxes_wrap drop_boxes_wrap_fr">
                    <div className="title_wrap">
                      <div className="title_wrap_inner">
                        <h3 className="title">SomeWhat Important</h3>
                        <span className="subtitle"></span>
                      </div>
                    </div>
                    <div className="drop_boxes">
                      {squaresNotImportant}
                    </div>

                  </div>

                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
