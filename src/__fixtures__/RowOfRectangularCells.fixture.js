import RowOfRectangularCells from '../ui/RowOfRectangularCells';
import { ALIVE, DEAD } from '../store/cell-duck';

export default [
  {
    name: 'row of random hexa cells',
    component: RowOfRectangularCells,
    props: {
      cells: [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
      yIndex: 0,
    }
  },
];