import Board from '../ui/Board';
import { ALIVE, DEAD } from '../store/cell-duck';
import BoardContainer from '../ui/BoardContainer';

export default [
  {
    name: 'Honeycomb',
    component: Board,
    props: {
      honeyComb: [
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, DEAD, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
      ],
    }
  }, {
    name: 'Rectangular board',
    component: Board,
    reduxState: {

    },
    props: {
      tableOfCells: [
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, DEAD, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
      ],
    }
  }, {
    name: 'BoardContainer',
    component: BoardContainer,
    reduxState: {
      tableOfCells: [
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, DEAD, DEAD, DEAD, DEAD],
        [DEAD, DEAD, ALIVE, DEAD, DEAD, DEAD],
        [ALIVE, ALIVE, ALIVE, DEAD, ALIVE, DEAD],
      ],
    },
  },
];