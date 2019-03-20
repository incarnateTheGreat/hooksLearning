import { Interface } from "readline";

export interface IProps {
  text: string;
  age?: number;
}

export interface IAppState {
  locale: string;
}

export interface IState {
  email: string;
  name: string;
}

export interface AppContextInterface {
  addNewUser_button: string;
  addUser: string;
  editUser: string;
  email: string;
  header: string;
  language: string;
  languageToggle_button: string;
  name: string;
  occupation: string;
  text: string;
  toggleMode_button: string;
}

export interface IUser {
  id: number;
  name: string;
  occupation: string;
}

export interface ProviderStoreInterface {
  appContext: object;
  dispatch: object;
  languages: object;
  locale: string;
  setLocale: object;
  toggleMode?: string;
  toggleMode_func?: () => void;
  usersContext: object[];
}
