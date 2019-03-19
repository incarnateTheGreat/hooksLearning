const userReducer = (state, action) => {
  switch (action) {
    case "add": {
      return [
        ...state,
        {
          id: 5,
          name: "Oliver",
          occupation: "Miau"
        }
      ];
    }
    case "delete":
      return state - 1;
    default:
      throw new Error("Unexpected action");
  }
};

export default userReducer;
