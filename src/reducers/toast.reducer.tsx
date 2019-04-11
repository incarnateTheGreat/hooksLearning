const ToastReducer = (state, action) => {
  switch (action.type) {
    case "showSuccessToast": {
      const newState = action.payload;
      return newState;
    }
    case "showErrorToast": {
      const newState = action.payload;
      return newState;
    }
    case "hideToast": {
      const newState = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default ToastReducer;
