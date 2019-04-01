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
  displayView: string;
  displayViewToggle_button: string;
  editUser: string;
  email: string;
  header: string;
  language: string;
  languageToggle_button: string;
  name: string;
  occupation: string;
  posts_error: string;
  text: string;
  toggleMode_button: string;
}

export interface IUser {
  id: number;
  name: string;
  occupation: string;
}

export interface IDropdown {
  alignment?: string;
  buttonDisplayText: string;
  displayText: string;
  dropdownValue: string;
  dropdownValues: object;
  setDropdownValue: (e) => {};
}

export interface ProviderStoreInterface {
  appContext: object;
  dispatch: object;
  posts: object | [];
  setView: object;
  // toggleMode?: string;
  // toggleMode_func?: () => void;
  usersContext: object[];
  view: string;
  views: object;
}
