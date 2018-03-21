import React from 'react';
import Cell from './Cell';

const Cells = ({ cells, addDeadCell, addAliveCell }) => (
  <React.Fragment>
    <div>
      {Object.values(cells).map(c => <Cell key={c.id} state={c.state}/>)}
    </div>
    <button onClick={addDeadCell}>dead</button>
    <button onClick={addAliveCell}>alive</button>
  </React.Fragment>
);

export default Cells;