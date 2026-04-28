import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({ val, squareClick, isSelected }) {
  return (
    <button
      className='square'
      onClick={squareClick}
      style={{ background: isSelected ? '#b95ff1' : '#fff' }}>{val}</button>
  );
}

export default function App() {
  const [name, setName] = React.useState('Let\'s play Tic-Tac-Toe!')
  const [count, setCount] = React.useState(0)
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [selectedSquare, setSelectedSquare] = React.useState(null); //used for storing the index of the currently selected square for adjacency check
  
  function handleClick(i) {
    if (calculateWinner(squares)) return;

    const currentPlayer = count % 2 === 0 ? 'X' : 'O';
    const currentPlayerCount = squares.filter(s => s === currentPlayer).length;
    const isMovementPhase = currentPlayerCount === 3;

    if (!isMovementPhase) {
      //normal placement
      if (squares[i]) return;
      const next = squares.slice();
      next[i] = currentPlayer;
      commitMove(next);
    } else {
      //Two-click movement
      if (selectedSquare === null) {
        if (squares[i] !== currentPlayer) return;  //ust click own piece
        setSelectedSquare(i);
      } else {
        if (i === selectedSquare) { setSelectedSquare(null); return; }
        if (squares[i] !== null)  { setSelectedSquare(null); return; }
        if (!isAdjacent(selectedSquare, i)) { setSelectedSquare(null); return; }

        const next = squares.slice();
        next[i] = currentPlayer;
        next[selectedSquare] = null;

        // Center rule: if you hold center and this move doesn't vacate it or win is illegal
        if (squares[4] === currentPlayer && selectedSquare !== 4 && !calculateWinner(next)) {
          setSelectedSquare(null);
          return;
        }

        setSelectedSquare(null);
        commitMove(next);
      }
    }
  }
  function commitMove(next) {
    const winner = calculateWinner(next);
    setSquares(next);
    setCount(count + 1);
    setHistory([...history, next]);
    if (winner) {
      setName(`Player ${winner} wins!`);
    } else {
      setName(`Player ${count % 2 === 0 ? 'O' : 'X'}'s turn`);
    }
  }

  function jumpTo(move) {     
    setSquares(history[move]);
    setCount(move);
    setHistory(history.slice(0, move + 1));
    setSelectedSquare(null);
    setName("Let's play Tic-Tac-Toe!");
  }

  const historyButtons = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move === 0 ? 'Go to game start' : `Go to move #${move}`}
      </button>
    </li>
  ));

  return (<>
    <h1 className="greeting display-6 fw-bold">{name}</h1>
    <div className='board-row'>
      <Square val={squares[0]} squareClick={() => handleClick(0)} isSelected={selectedSquare === 0} />
      <Square val={squares[1]} squareClick={() => handleClick(1)} isSelected={selectedSquare === 1} />
      <Square val={squares[2]} squareClick={() => handleClick(2)} isSelected={selectedSquare === 2} />
    </div>
    <div className='board-row'>
      <Square val={squares[3]} squareClick={() => handleClick(3)} isSelected={selectedSquare === 3} />
      <Square val={squares[4]} squareClick={() => handleClick(4)} isSelected={selectedSquare === 4} />
      <Square val={squares[5]} squareClick={() => handleClick(5)} isSelected={selectedSquare === 5} />
    </div><div className='board-row'>
      <Square val={squares[6]} squareClick={() => handleClick(6)} isSelected={selectedSquare === 6} />
      <Square val={squares[7]} squareClick={() => handleClick(7)} isSelected={selectedSquare === 7} />
      <Square val={squares[8]} squareClick={() => handleClick(8)} isSelected={selectedSquare === 8} />
    </div>
      <button className='game-info' onClick={() => {
      setSquares(Array(9).fill(null));
      setCount(0);
      setHistory([Array(9).fill(null)]);
      setName('Let\'s play Tic-Tac-Toe!');
      setSelectedSquare(null);
    }}>Reset Game</button>
    <div className="game-info">
          <ol>{historyButtons}</ol>
        </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isAdjacent(a, b) { //used for checking if two squares are adjacent
  const rowA = Math.floor(a / 3), colA = a % 3;
  const rowB = Math.floor(b / 3), colB = b % 3;
  return a !== b && Math.abs(rowA - rowB) <= 1 && Math.abs(colA - colB) <= 1;
}

