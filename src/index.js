import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {observe} from './Game'
import Board from './components/Board'

const rootEl = document.getElementById('root');

observe((squares, desc, data) =>
  ReactDOM.render(
    <Board squares={squares} desc={desc} data={data} />,
    rootEl
  )
);
