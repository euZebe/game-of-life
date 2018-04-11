import Cell from '../ui/Cell';
import { ALIVE, DEAD } from '../store/cell-duck';

export default [
  {
    name: 'alive rectangular cell',
    component: Cell,
    props: {
      status: ALIVE,
      toggleStatus: () => console.log('youhou'),
    }
  }, {
    name: 'dead rectangular cell',
    component: Cell,
    props: {
      status: DEAD,
      toggleStatus: () => console.log('youhou'),
    }
  },
];