import React, { useMemo, useReducer, useState } from "react";
import mainReducer from "./reducers/main.reducer";

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

const Example01 = () => {
  const initialState = 0;
  const [count, dispatch] = useReducer(mainReducer, initialState);

  return (
    <div>
      {count}
      <button onClick={() => dispatch("increment")}>+1</button>
      <button onClick={() => dispatch("decrement")}>-1</button>
      <button onClick={() => dispatch("reset")}>reset</button>
    </div>
  );
};

const App = () => {
  // Setting State
  const [locale, setLocale] = useState("en");
  const [users, setUsers] = useState(initUserList);

  // CRUD operations
  const addUserFunc = (user: IUser) => {
    setUsers([...users, user]);
  };

  const deleteUserFunc = (id: number) => () => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Memoized Components.
  const SelectLocaleMemo = useMemo(
    () => <SelectLocale locale={locale} setLocale={setLocale} />,
    [locale]
  );

  const DetailsMemo = useMemo(
    () => <Details addUserFunc={addUserFunc} deleteUserFunc={deleteUserFunc} />,
    [users]
  );

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
    languages,
    testFunc: testFunc(locale),
    usersContext: users
  };

  return (
    <FormContext.Provider value={values}>
      <div className="app">
        <header>{SelectLocaleMemo}</header>

        {DetailsMemo}

        <Example01 />
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
