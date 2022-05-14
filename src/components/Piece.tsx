import React from 'react';
import blackBishop from '../assets/img/bB.svg';
import blackKing from '../assets/img/bK.svg';
import blackKnight from '../assets/img/bN.svg';
import blackPawn from '../assets/img/bP.svg';
import blackQueen from '../assets/img/bQ.svg';
import blackRook from '../assets/img/bR.svg';
import whiteBishop from '../assets/img/wB.svg';
import whiteKing from '../assets/img/wK.svg';
import whiteKnight from '../assets/img/wN.svg';
import whitePawn from '../assets/img/wP.svg';
import whiteQueen from '../assets/img/wQ.svg';
import whiteRook from '../assets/img/wR.svg';

const Piece: React.FC = ({ piece }:{piece:any}) => {
  
  let Image = blackBishop;
  if(piece.color === 0) {
    switch(piece.class) {
      case 'bishop':
        Image = blackBishop;
        break;
      case 'king':
        Image = blackKing;
        break;
      case 'knight':
        Image = blackKnight;
        break;
      case 'pawn':
        Image = blackPawn;
        break;
      case 'queen':
        Image = blackQueen;
        break;
      case 'rook':
        Image = blackRook;
        break;
    }
  } else {
    switch(piece.class) {
      case 'bishop':
        Image = whiteBishop;
        break;
      case 'king':
        Image = whiteKing;
        break;
      case 'knight':
        Image = whiteKnight;
        break;
      case 'pawn':
        Image = whitePawn;
        break;
      case 'queen':
        Image = whiteQueen;
        break;
      case 'rook':
        Image = whiteRook;
        break;
    }
  }

  return (
    <Image />
  )
}

export default Piece;