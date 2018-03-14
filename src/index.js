import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {observe} from './Game'
import Board from './components/Board'

const rootEl = document.getElementById('root');

observe(squares =>
  ReactDOM.render(
    <Board squares={squares} />,
    rootEl
  )
);
