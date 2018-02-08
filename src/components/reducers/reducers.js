
const globalReducer = (state = { dataReady: false, error: { isError: false, message: "" }, data: {} }, action) => {
  switch (action.type) {
    case "DATA_READY":
      return Object.assign({}, state, { dataReady: action.payload });
    case "DATA_RECEIVED":
      return Object.assign({}, state, { data: action.payload });
    case "ERROR":
      return Object.assign({}, state, { error: { isError: action.payload, message: action.message } });
    default:
      return state;
  }
}

export default globalReducer; 