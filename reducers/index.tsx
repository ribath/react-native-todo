import { FETCH_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS, ADD_SUCCESS } from '../constants/';
import { STORE, TODO } from '../models/POJO';

const initialState:STORE = {
  list:[
  ]
};

const replaceObject = (array:TODO[], item:TODO) => {
  let new_array:TODO[] = []
  array.map((x)=>{
    if(x.id===item.id){
      new_array.push(item)
    } else {
      new_array.push(x)
    }
  });
  return new_array;
}
const uniq = (a:any, param:string) => {
  return a.filter((item: { [x: string]: any; }, pos: any, array: any[]) => array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos);
}

function rootReducer(state = initialState, action: any) {
  if (action.type === FETCH_SUCCESS) {
    return { ...state, list: uniq([...state.list, ...action.payload], 'id')};
  } if (action.type === DELETE_SUCCESS) {
    return { ...state, list: [...state.list.filter((item)=>item.id!==action.payload.id)] };
  } if (action.type === ADD_SUCCESS) {
    return { ...state, list: [action.payload, ...state.list] };
  } if (action.type === UPDATE_SUCCESS) {
    return { ...state, list: replaceObject(state.list, action.payload) };
  }
  return state;
}
export default rootReducer;