import HexaCell from '../ui/HexaCell';
import { ALIVE, DEAD } from '../store/cell-duck';

const toggleStatus = status => console.log(status);

export default [
  {
    name: 'alive hexagonal cell',
    component: HexaCell,
    props: {
      status: ALIVE,
      toggleStatus,
    }
  }, {
    name: 'dead hexagonal cell',
    component: HexaCell,
    props: {
      status: DEAD,
      toggleStatus,
    }
  },
];