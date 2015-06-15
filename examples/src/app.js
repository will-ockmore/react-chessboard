'use strict';

require('./app.less');

import React, { Component } from 'react';
import Chessboard from '../../src/Chessboard/Chessboard';
import { BOARD } from '../../src/constants';
import Chess from 'chess.js';

class App extends Component { // eslint-disable-line no-shadow
  constructor() {
    super();

    this.game = new Chess();

    this.state = {
      orientation: BOARD.ORIENTATION.WHITE,
      fen: this.game.fen()
    };

    this.flipBoard = ::this.flipBoard;
    this.onMove = ::this.onMove;
  }

  flipBoard() {
    this.setState({
      orientation: this.state.orientation === BOARD.ORIENTATION.WHITE
        ? BOARD.ORIENTATION.BLACK
        : BOARD.ORIENTATION.WHITE
    });
  }

  onMove(fromSquare, toSquare) {
    this.game.move({
      from: fromSquare,
      to: toSquare
    });

    this.setState({
      fen: this.game.fen()
    });
  }

  render() {
    return (
      <div>
        <h1>react-chessboard</h1>
        <div className="chessboard">
          <Chessboard orientation={this.state.orientation}
                      fen={this.state.fen}
                      onMove={this.onMove} />
          <button onClick={this.flipBoard}>Flip board</button>
        </div>
      </div>
    );
  }
}

React.render(<App />, document.getElementById('app'));
