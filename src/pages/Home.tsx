import React, { useState, useEffect } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import Piece from '../components/Piece';
import Modal from '../components/Modal';
import { emptySquare, checkPossibleMoves, executePlay, language } from '../functions/Rules';

const Home: React.FC = () => {

	const _possibleMoves = [
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ],
		[ false, false, false, false, false, false, false, false ]
	];

	const _board = [
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}],
		[{},{},{},{},{},{},{},{}]
	];

	const _match = {
		gameOver: false,
		check: false,
		checkMate: false,
		onMove: false,
		currentPlayer: 1,
		started: false,
		enPassant: false
	};

	const _modal = {
		show: false,
		message: ''
	};
	
	const [match, setMatch] = useState(_match);

	const [pieceSelected,setPieceSelected]:[pieceSeleceted:any,setPieceSelected:Function] = useState({});

	const [modal,setModal] = useState(_modal);

	const [blackPiecesTaken, setBlackPiecesTaken]:[blackPiecesTaken:any,setBlackPiecesTaken:Function] = useState([]);

	const [whitePiecesTaken, setWhitePiecesTaken]:[whitePiecesTaken:any,setWhitePiecesTaken:Function] = useState([]);

	const [possibleMoves, setPossibleMoves] = useState(_possibleMoves);

	const [board, setBoard] = useState(_board);

	const handleMove = (selectedSquare:any) => {
		if(match.gameOver) {
			return {
				field: 'handleMove',
				error: 'Match has Ended'
			};
		}

		const { row, column } = selectedSquare;
		if(emptySquare(board[row][column])) {
			setPieceSelected({});
			return {
				field: 'handleMove',
				error: 'No Piece in the square'
			};
		}

		const updatedPieceSelected:any = { ...board[row][column], row, column };
		if(updatedPieceSelected.color !== match.currentPlayer) {
			setPieceSelected({});
			return {
				field: 'handleMove',
				error: 'Not your turn'
			};
		}

		setPieceSelected(updatedPieceSelected);
		const updatedPossibleMoves = checkPossibleMoves(selectedSquare, board, match);
		setPossibleMoves(updatedPossibleMoves);
		setMatch({...match, onMove: true});
	}

	const makeMoveNew = (square:any) => {
		if(match.gameOver) {
			return {
				field: 'makeMoveNew',
				error: 'Match has Ended'
			};
		}

		const { updatedBoard, updatedMatch, updatedModal, updatedBlackPiecesTaken, updatedWhitePiecesTaken } = executePlay(board,possibleMoves,{...match},{...pieceSelected},square,blackPiecesTaken,whitePiecesTaken);

		setBoard(updatedBoard);
		setBlackPiecesTaken(updatedBlackPiecesTaken);
		setWhitePiecesTaken(updatedWhitePiecesTaken);
		setModal({ ...modal, ...updatedModal });
		setMatch({ ...match, ...updatedMatch });
		setPieceSelected({});
		setPossibleMoves(_possibleMoves);
	};

	const startGame = () => {
		setMatch({ ..._match, started: true });
		setPieceSelected({});
		setModal(_modal);
		setBlackPiecesTaken([]);
		setWhitePiecesTaken([]);
		setPossibleMoves(_possibleMoves);
		const __board:any = [
			[{ class: 'rook', color: 0, moves: 0 }, { class: 'knight', color: 0, moves: 0 }, { class: 'bishop', color: 0, moves: 0 }, { class: 'queen', color: 0, moves: 0 }, { class: 'king', color: 0, moves: 0 }, { class: 'bishop', color: 0, moves: 0 }, { class: 'knight', color: 0, moves: 0 }, { class: 'rook', color: 0, moves: 0 }],
			[{ class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }, { class: 'pawn', color: 0, moves: 0 }],
			[{},{},{},{},{},{},{},{}],
			[{},{},{},{},{},{},{},{}],
			[{},{},{},{},{},{},{},{}],
			[{},{},{},{},{},{},{},{}],
			[{ class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }, { class: 'pawn', color: 1, moves: 0 }],
			[{ class: 'rook', color: 1, moves: 0 }, { class: 'knight', color: 1, moves: 0 }, { class: 'bishop', color: 1, moves: 0 }, { class: 'queen', color: 1, moves: 0 }, { class: 'king', color: 1, moves: 0 }, { class: 'bishop', color: 1, moves: 0 }, { class: 'knight', color: 1, moves: 0 }, { class: 'rook', color: 1, moves: 0 }]
		]
		setBoard(__board);
	};

	useEffect(() => {
		if(modal.show) {
			setTimeout(() => {
				setModal({
					...modal,
					show: !modal.show,
					message: ``
				});
			},1000);
		}
	},[modal]);

	return (
		<View>
			<View style={{ display: 'flex', flexDirection: 'column'}}>
			{
				board.map((row,i) => (
					<View 
						style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 50 }}
						key={`${i}`}
					>
						{
							row.map((column,j) => {
								let backgroundColor = (match.onMove) ?
									(possibleMoves[i][j]) ?
										'#d3d3d3'
									:
										(i % 2 === 1) ?
											(j % 2 === 0) ? '#B88B4A' : '#E3C16F'
										:
											(j % 2 === 0) ? '#E3C16F' : '#B88B4A'
								:
									(i % 2 === 1) ?
										(j % 2 === 0) ? '#B88B4A' : '#E3C16F'
									:
										(j % 2 === 0) ? '#E3C16F' : '#B88B4A';

								return (<View 
									style={{
										width: '12.5%',
										height: 50,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor										
									}}
									key={`${i}-${j}`}
								>
									<TouchableOpacity 
										onPress={
											(match.onMove) ?
												() => makeMoveNew({ ...column, row:i,column:j})
											:
												() => handleMove({ ...column, row:i,column:j})
										}
									>
									{
										!emptySquare(column) ? 
											<Piece piece={column} /> 
										: 
											<View ><Text style={{ fontSize: 40, color: backgroundColor }}>X</Text></View>
									}
									</TouchableOpacity>
								</View>)
							})
						}
					</View>
				))
			}
			</View>
			<View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255, 255, 240, 0.5)', height: 45 }}>
				{
					blackPiecesTaken.map((piece:any,i:number) => {
						return (
							<View key={`blackPieceTaken${i}`}>
								<Piece piece={piece} />
								{piece.count > 1 ? <Text style={{ position: 'relative', top: -47, left: 32 }}>x{piece.count}</Text> : null }
							</View>
						)
					})
				}
			</View>
			<View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(128, 128, 128, 0.5)', height: 45 }}>
				{
					whitePiecesTaken.map((piece:any,i:number) => {
						return (
							<View key={`whitePiecesTaken${i}`}>
								<Piece piece={piece} />
								{piece.count > 1 ? <Text style={{ position: 'relative', top: -47, left: 32 }}>x{piece.count}</Text> : null }
							</View>
						)
					})
				}
			</View>
			{
				match.started	? 
					null
				: 
					<View style={{
						backgroundColor: 'rgb(127, 255, 0)',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: 50,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 8,
						padding: 10
					}}>
						<TouchableOpacity onPress={startGame} >
							<Text style={{
								fontSize: 24
							}}>
								{language() === 'en_us' ? 'New Game' : 'Novo Jogo'}
							</Text>
						</TouchableOpacity>
					</View>
			}
			<Modal 
				onClose={() => { setModal({ ...modal, show: false })}} 
				show={modal.show}
			>
				<Text >{modal.message}</Text>
			</Modal>
		</View>
  );
}

export default Home;
