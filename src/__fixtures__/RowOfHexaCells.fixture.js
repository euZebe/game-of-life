import RowOfHexaCells from '../ui/RowOfHexaCells';
import { ALIVE, DEAD } from '../store/cell-duck';

export default [
  {
    name: 'row of random hexa cells',
    component: RowOfHexaCells,
    props: {
      cells: [ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
      yIndex: 0,
    }
  }, {
    name: 'very long row with no wrap',
    component: RowOfHexaCells,
    props: {
      cells: [ALIVE, DEAD, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, ALIVE, DEAD, DEAD, DEAD, ALIVE, DEAD],
      yIndex: 0,
    }
  },
];