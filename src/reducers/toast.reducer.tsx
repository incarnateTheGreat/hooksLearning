const ToastReducer = (state, action) => {
  switch (action.type) {
    case "showToast": {
      const newState = true;
      return newState;
    }
    case "hideToast": {
      const newState = false;
      return newState;
    }
    default:
      return state;
  }
};

export default ToastReducer;
