import React, { useMemo, useReducer, useState } from "react";
import mainReducer from "./reducers/main.reducer";
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

// useReducer

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
    email: "",
    func_button: "",
    header: "",
    language: "",
    languageToggle_button: "",
    name: "",
    occupation: "",
    text: ""
  };

  if (locale === "en") {
    res = en;
  } else if (locale === "es") {
    res = es;
  }

  return res;
};

const testFunc = locale => () => {
  if (locale === "en") {
    console.log("hello.");
  } else {
    console.log("hola");
  }
};

const App = () => {
  // Setting State
  const [locale, setLocale] = useState("en");
  const [users, dispatch] = useReducer(UserReducer, initUserList);

  // Memoized Components.
  const SelectLocaleMemo = useMemo(
    () => <SelectLocale locale={locale} setLocale={setLocale} />,
    [locale]
  );

  const DetailsMemo = useMemo(() => <Details />, [users]);

  // Get Locales Data
  const {
    addNewUser_button,
    addUser,
    email,
    func_button,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    text
  } = getLocaleData(locale);

  // Assign the Locales variables.
  const appContext: AppContextInterface = {
    addNewUser_button,
    addUser,
    email,
    func_button,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    text
  };

  // If multiple values/functions are being passed into Context, they can be applied to a object.
  const values: ProviderStoreInterface = {
    appContext,
    dispatch,
    languages,
    testFunc: testFunc(locale),
    usersContext: users
  };

  return (
    <FormContext.Provider value={values}>
      <div className="app">
        <header>{SelectLocaleMemo}</header>

        {DetailsMemo}
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
      func_button: "",
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
      func_button,
      header,
      name,
      occupation,
      text
    } = this.getLocaleData();

    const appContext: AppContextInterface = {
      addNewUser_button,
      addUser,
      email,
      func_button,
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
