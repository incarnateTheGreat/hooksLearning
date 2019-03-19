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
  email: string;
  func_button: string;
  header: string;
  language: string;
  languageToggle_button: string;
  name: string;
  occupation: string;
  text: string;
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
  testFunc?: () => void;
  usersContext: object[];
}
