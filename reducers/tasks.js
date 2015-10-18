import * as types from '../constants/ActionTypes';

const initialState = [
  {
    text: 'Drink cofee',
    checked: false,
    completed: true,
    id: 0
  },
  {
    text: 'Enslave humanity',
    checked: false,
    completed: false,
    id: 2
  },
];

export default function tasks(state = initialState, action) {
  switch (action.type) {

  /*SINGLE ACTIONS*/
  case types.ADD_TASK:
    return [
      ...state,
      {
        id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
        checked: false,
        completed: false,
        text: action.text
      }
    ];

  case types.CHECK_TASK:
    return state.map(task =>
      task.id === action.id ?
        Object.assign({}, task, {checked: !task.checked}) :
        task
    );

  case types.DELETE_TASK:
    return state.filter(task =>
      task.id !== action.id
    );

  case types.EDIT_TASK:
    return state.map(task =>
      task.id === action.id ?
        Object.assign({}, task, {text: action.text}) :
        task
    );

  case types.COMPLETE_TASK:
    return state.map(task =>
      task.id === action.id ?
        Object.assign({}, task, {completed: !task.completed}) :
        task
    );

  /* GROUP ACTIONS */
  case types.TOGGLE_ALL:
    const areAllChecked = state.every(task => task.checked);
    console.log(areAllChecked, state.map(task => Object.assign({}, task, {
      checked: !areAllChecked
    })));
    return state.map(task => Object.assign({}, task, {
      checked: !areAllChecked
    }));

  case types.DELETE_SELECTED_TASKS:
    return state.filter(task =>
      !task.checked
    );

  case types.COMPLETE_SELECTED_TASKS:
    return state.map(task =>
      task.checked ?
        Object.assign({}, task, {completed: action.markAsDone}) :
        task
    );

  default:
    return state;
  }
}
