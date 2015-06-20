'use strict';

require('./Piece.less');

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { SQUARE, PIECE, DND_TYPES } from '../../utils/constants/constants';

const pieceSource = {
  canDrag(props) {
    return props.dnd;
  },

  beginDrag(props) {
    return {
      from: props.square
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

@DragSource(DND_TYPES.PIECE, pieceSource, collect)
export default class Piece extends Component {
  static propTypes = {
    dnd: PropTypes.bool.isRequired,
    name: PropTypes.oneOf(PIECE.NAMES).isRequired,
    square: PropTypes.oneOf(SQUARE.NAMES).isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { name, connectDragSource, isDragging } = this.props;
    const classes = classNames({
      'react-chessboard-piece': true,
      [`react-chessboard-piece--${name}`]: true,
      'react-chessboard-piece--dragging': isDragging
    });

    return connectDragSource(
      <div className={classes} />
    );
  }
}