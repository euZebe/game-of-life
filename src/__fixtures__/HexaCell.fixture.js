import HexaCell from '../ui/HexaCell';
import { ALIVE, DEAD } from '../store/cell-duck';

export default [
  {
    name: 'alive hexagonal cell',
    component: HexaCell,
    props: {
      status: ALIVE,
    }
  }, {
    name: 'dead hexagonal cell',
    component: HexaCell,
    props: {
      status: DEAD,
    }
  },
];