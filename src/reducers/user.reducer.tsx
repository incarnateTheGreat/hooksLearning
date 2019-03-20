// Interfaces
import { IUser } from "../interfaces/form.interface";

export const initialState: IUser = {
  id: 0,
  name: "",
  occupation: ""
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return [...state, action.payload];
    }
    case "delete": {
      return state.filter(user => user.id !== action.payload);
    }
    case "update": {
      const index = state.findIndex(x => x.id === action.payload.id);
      state[index] = action.payload;

      return state;
    }
    default:
      throw new Error("Unexpected action");
  }
};

export default UserReducer;
