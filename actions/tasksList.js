import * as types from '../constants/ActionTypes';

export function addTask(text) {
  return {type: types.ADD_TASK, text};
}

export function deleteTask(id) {
  return {type: types.DELETE_TASK, id};
}

export function editTask(id, text) {
  return {type: types.EDIT_TASK, id, text};
}

export function completeTask(id) {
  return {type: types.COMPLETE_TASK, id};
}

export function checkTask(id) {
  return {type: types.CHECK_TASK, id};
}

export function toggleAll() {
  return {type: types.TOGGLE_ALL};
}

export function deleteSelectedTasks() {
  return {type: types.DELETE_SELECTED_TASKS};
}

export function completeSelectedTasks(markAsDone) {
  return {type: types.COMPLETE_SELECTED_TASKS, markAsDone};
}
