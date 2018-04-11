import Board from '../ui/Board';
import { ALIVE, DEAD } from '../store/cell-duck';

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
  },
];