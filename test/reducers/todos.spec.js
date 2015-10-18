import expect from 'expect';
import tasks from '../../reducers/tasks';
import * as types from '../../constants/ActionTypes';

describe('tasks reducer', () => {
  it('should handle initial state', () => {
    expect(
      tasks(undefined, {})
    ).toEqual([{
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
    }]);
  });

  it('should handle ADD_TASK', () => {
    expect(
      tasks([], {
        type: types.ADD_TASK,
        text: 'Task name'
      })
    ).toEqual([{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }]);

    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }], {
        type: types.ADD_TASK,
        text: 'Run the tests'
      })
    ).toEqual([{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: false,
      completed: false,
      id: 1
    }]);
  });

  it('should handle DELETE_TASK', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: false,
        completed: false,
        id: 1
      }], {
        type: types.DELETE_TASK,
        id: 1
      })
    ).toEqual([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }]);
  });

  it('should handle EDIT_TASK', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: false,
        completed: false,
        id: 1
      }], {
        type: types.EDIT_TASK,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }, {
      text: 'Fix the tests',
      checked: false,
      completed: false,
      id: 1
    }]);
  });

  it('should handle CHECK_TASK', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: false,
        completed: false,
        id: 1
      }], {
        type: types.CHECK_TASK,
        id: 1
      })
    ).toEqual([{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: true,
      completed: false,
      id: 1
    }]);
  });

  it('should handle COMPLETE_TASK', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: false,
        completed: false,
        id: 1
      }], {
        type: types.COMPLETE_TASK,
        id: 1
      })
    ).toEqual([{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: false,
      completed: true,
      id: 1
    }]);
  });

  it('should handle TOGGLE_ALL', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: false,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: false,
        completed: false,
        id: 1
      }], {
        type: types.TOGGLE_ALL,
      })
    ).toEqual([{
      text: 'Task name',
      checked: true,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: true,
      completed: false,
      id: 1
    }]);
  });

  it('should handle DELETE_SELECTED_TASKS', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: true,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: true,
        completed: false,
        id: 1
      }, {
        text: 'Fix the tests',
        checked: false,
        completed: false,
        id: 2
      }], {
        type: types.DELETE_SELECTED_TASKS
      })
    ).toEqual([{
      text: 'Fix the tests',
      checked: false,
      completed: false,
      id: 2
    }]);
  });

  it('should handle COMPLETE_SELECTED_TASKS', () => {
    expect(
      tasks([{
        text: 'Task name',
        checked: true,
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        checked: true,
        completed: false,
        id: 1
      }, {
        text: 'Fix the tests',
        checked: false,
        completed: false,
        id: 2
      }], {
        type: types.COMPLETE_SELECTED_TASKS,
        markAsDone: true
      })
    ).toEqual([{
      text: 'Task name',
      checked: true,
      completed: true,
      id: 0
    }, {
      text: 'Run the tests',
      checked: true,
      completed: true,
      id: 1
    }, {
      text: 'Fix the tests',
      checked: false,
      completed: false,
      id: 2
    }]);

    //undone
    expect(
      tasks([{
        text: 'Task name',
        checked: true,
        completed: true,
        id: 0
      }, {
        text: 'Run the tests',
        checked: true,
        completed: true,
        id: 1
      }, {
        text: 'Fix the tests',
        checked: false,
        completed: false,
        id: 2
      }], {
        type: types.COMPLETE_SELECTED_TASKS,
        markAsDone: false
      })
    ).toEqual([{
      text: 'Task name',
      checked: true,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: true,
      completed: false,
      id: 1
    }, {
      text: 'Fix the tests',
      checked: false,
      completed: false,
      id: 2
    }]);
  });

  
});
