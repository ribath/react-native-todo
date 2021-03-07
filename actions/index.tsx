import { ADD_SUCCESS, FETCH_SUCCESS, DELETE_SUCCESS, UPDATE_SUCCESS } from '../constants/';
import { TODO } from '../models/POJO';

export function todoList(payload: TODO[]) {
  return { type: FETCH_SUCCESS, payload };
}

export function deleteTodo(payload: TODO) {
  return { type: DELETE_SUCCESS, payload };
}

export function addTodo(payload: TODO) {
  return { type: ADD_SUCCESS, payload };
}

export function editTodo(payload: TODO) {
  return { type: UPDATE_SUCCESS, payload };
}