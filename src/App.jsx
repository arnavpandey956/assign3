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

function Square ({value}) {
  return (<button className='square'>{value}</button>);
}


export default function App() {
  const [name, setName] = React.useState('Let\'s play Tic-Tac-Toe!')

  return (<>
    <h1 className="greeting display-6 fw-bold">{name}</h1>
    <div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div>
    <div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div><div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div>
    </>
  );
}
