import React, { useMemo, useReducer, useState } from "react";
import UserReducer from "./reducers/user.reducer";

// Components

import Details from "./components/Details";
import SelectLocale from "./components/SelectLocale";
import FormContext from "./context/form-context";

// Styles
import "./styles/styles.scss";

// Locales
import en from "./locales/en.json";
import es from "./locales/es.json";

// Interfaces
import {
  AppContextInterface,
  IUser,
  ProviderStoreInterface
} from "./interfaces/form.interface";

// Data
const initUserList: IUser[] = [
  {
    id: 1,
    name: "Garry",
    occupation: "Software Engineer"
  },
  {
    id: 2,
    name: "Isabel",
    occupation: "Everything Person"
  },
  {
    id: 3,
    name: "John",
    occupation: "Salesman"
  },
  {
    id: 4,
    name: "Efi",
    occupation: "Insurance"
  },
  {
    id: 5,
    name: "Oliver",
    occupation: "Miau"
  }
];

const languages: object = {
  en: "English",
  es: "Español"
};

const getLocaleData = locale => {
  let res: AppContextInterface = {
    addNewUser_button: "",
    addUser: "",
    editUser: "",
    email: "",
    header: "",
    language: "",
    languageToggle_button: "",
    name: "",
    occupation: "",
    text: "",
    toggleMode_button: ""
  };

  if (locale === "en") {
    res = en;
  } else if (locale === "es") {
    res = es;
  }

  return res;
};

const App = () => {
  // Setting State
  const [locale, setLocale] = useState("en");
  const [toggleMode, setToggleMode] = useState("add");
  const [users, dispatch] = useReducer(UserReducer, initUserList);

  const toggleMode_func = () => {
    setToggleMode(toggleMode === "add" ? "edit" : "add");
  };

  // Memoize-ing Components.
  const DetailsMemo = useMemo(() => <Details />, [users]);
  const SelectLocaleMemo = useMemo(() => <SelectLocale />, [locale]);

  // Get Locales Data
  const {
    addNewUser_button,
    addUser,
    editUser,
    email,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    text,
    toggleMode_button
  } = getLocaleData(locale);

  // Assign the Locales variables.
  const appContext: AppContextInterface = {
    addNewUser_button,
    addUser,
    editUser,
    email,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    text,
    toggleMode_button
  };

  // If multiple values/functions are being passed into Context, they can be applied to a object.
  const values: ProviderStoreInterface = {
    appContext,
    dispatch,
    languages,
    locale,
    setLocale,
    toggleMode,
    toggleMode_func,
    usersContext: users
  };

  return (
    <FormContext.Provider value={values}>
      <div className="app">
        <header>{SelectLocaleMemo}</header>
        <>
          <h2>{addUser}</h2>
          {DetailsMemo}
        </>
      </div>
    </FormContext.Provider>
  );
};

export default App;

/*

// Working with Symbols to create a unique instance of a function call. Trying not to use Private.
const changeLocale = Symbol("changeLocale");

const SelectLocale = props => {
  return (
    <select value={props.locale} onChange={props.changeLocale}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};

const testFunc = locale => () => {
  if (locale === "en") {
    console.log("hello.");
  } else {
    console.log("hola");
  }
};

export default class App extends Component<{}, IAppState> {
  state = {
    locale: "en"
  };

  [changeLocale] = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;

    this.setState({ locale });
  };

  getLocaleData() {
    let res: AppContextInterface = {
      addNewUser_button: "",
      addUser: "",
      email: "",
      toggleMode_button: "",
      header: "",
      name: "",
      occupation: "",
      text: ""
    };

    if (this.state.locale === "en") {
      res = en;
    } else if (this.state.locale === "es") {
      res = es;
    }

    return res;
  }

  render() {
    // Get Locales Data
    const {
      addNewUser_button,
      addUser,
      email,
      toggleMode_button,
      header,
      name,
      occupation,
      text
    } = this.getLocaleData();

    const appContext: AppContextInterface = {
      addNewUser_button,
      addUser,
      email,
      toggleMode_button,
      header,
      name,
      occupation,
      text
    };

    // If multiple values/functions are being passed into Context, they can be applied to a object.
    const values: ProviderStoreInterface = {
      appContext,
      testFunc: testFunc(this.state.locale)
    };

    return (
      <FormContext.Provider value={values}>
        <div className="app">
          <header>
            <SelectLocale
              locale={this.state.locale}
              changeLocale={this[changeLocale]}
            />
          </header>

          <Details />
        </div>
      </FormContext.Provider>
    );
  }
}

*/
