import expect from 'expect';
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions/tasksList';

describe('task actions', () => {
  it('addTask should create ADD_TASK action', () => {
    expect(actions.addTask('Task name')).toEqual({
      type: types.ADD_TASK,
      text: 'Task name'
    });
  });

  it('deleteTask should create DELETE_TASK action', () => {
    expect(actions.deleteTask(1)).toEqual({
      type: types.DELETE_TASK,
      id: 1
    });
  });

  it('editTask should create EDIT_TASK action', () => {
    expect(actions.editTask(1, 'New task name')).toEqual({
      type: types.EDIT_TASK,
      id: 1,
      text: 'New task name'
    });
  });

  it('completeTask should create COMPLETE_TASK action', () => {
    expect(actions.completeTask(1)).toEqual({
      type: types.COMPLETE_TASK,
      id: 1
    });
  });

  it('checkTask should create CHECK_TASK action', () => {
    expect(actions.checkTask(1)).toEqual({
      type: types.CHECK_TASK,
      id: 1
    });
  });

  it('toggleAll should create TOGGLE_ALL action', () => {
    expect(actions.toggleAll()).toEqual({
      type: types.TOGGLE_ALL
    });
  });

  it('deleteSelectedTasks should create DELETE_SELECTED_TASKS action', () => {
    expect(actions.deleteSelectedTasks()).toEqual({
      type: types.DELETE_SELECTED_TASKS
    });
  });

  it('completeSelectedTasks should create COMPLETE_SELECTED_TASKS action', () => {
    expect(actions.completeSelectedTasks(true)).toEqual({
      type: types.COMPLETE_SELECTED_TASKS,
      markAsDone: true
    });
  });
});
