import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

const grid = [
  { id: 1},
  { id: 2},
  { id: 3},
  { id: 4},
  { id: 5},
  { id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
];

function Square ({val , squareClick}) {
  return (<button className='square' onClick={squareClick}>{val}</button>);
}


export default function App() {
  const [name, setName] = React.useState('Let\'s play Tic-Tac-Toe!')
  const [count, setCount] = React.useState(0)
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  function handleClick(i) {
    const newSquares = squares.slice();
    if (squares[i]) {
      return;
    }

    if (count % 2 === 0) {
      newSquares[i] = 'X';
    } else {
      newSquares[i] = 'O';
    }
    setSquares(newSquares);
    setCount(count + 1);
  }

  return (<>
    <h1 className="greeting display-6 fw-bold">{name}</h1>
    <div className='board-row'>
      <Square val={squares[0]} squareClick={() => handleClick(0)} />
      <Square val={squares[1]} squareClick={() => handleClick(1)} />
      <Square val={squares[2]} squareClick={() => handleClick(2)} />
    </div>
    <div className='board-row'>
      <Square val={squares[3]} squareClick={() => handleClick(3)} />
      <Square val={squares[4]} squareClick={() => handleClick(4)} />
      <Square val={squares[5]} squareClick={() => handleClick(5)} />
    </div><div className='board-row'>
      <Square val={squares[6]} squareClick={() => handleClick(6)} />
      <Square val={squares[7]} squareClick={() => handleClick(7)} />
      <Square val={squares[8]} squareClick={() => handleClick(8)} />
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
