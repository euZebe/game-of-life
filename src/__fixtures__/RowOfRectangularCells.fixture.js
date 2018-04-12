import RowOfRectangularCells from '../ui/RowOfRectangularCells';
import { ALIVE, DEAD } from '../store/cell-duck';

export default [
  {
    component: RowOfRectangularCells,
    props: {
      cells: [ALIVE, DEAD, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
      yIndex: 0,
    }
  },
];