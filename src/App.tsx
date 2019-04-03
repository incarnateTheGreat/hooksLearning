import axios from "axios";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { withRouter } from "react-router";
import { RotateLoader } from "react-spinners";
import Main from "./Main";

// Services
import getPostsData from "./services/getPostsData.service";

// Reducers
import UserReducer from "./reducers/user.reducer";

// Components
import Dropdown from "./components/Dropdown";

// Context
import FormContext from "./context/form-context";

// Styles
import "./styles/styles.scss";

// Locales
import en from "./locales/en.json";
import es from "./locales/es.json";

// Interfaces
import {
  AppContextInterface,
  ProviderStoreInterface
} from "./interfaces/form.interface";

// Data
import { initUserList, languages, views } from "./data/data";

const getLocaleData = locale => {
  let res: AppContextInterface = {
    addNewUser_button: "",
    addUser: "",
    displayView: "",
    displayViewToggle_button: "",
    editUser: "",
    email: "",
    header: "",
    language: "",
    languageToggle_button: "",
    name: "",
    occupation: "",
    posts_error: "",
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
  const [view, setView] = useState("users");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, dispatch] = useReducer(UserReducer, initUserList);

  // Get Posts Data
  useEffect(() => {
    getPostsData(setIsLoading, setPosts);
  }, []);

  const RenderPage = () => {
    return (
      <>
        <header>
          <nav>
            {SelectLocaleMemo} {SelectViewMemo}
          </nav>
        </header>
        <Main />
      </>
    );
  };

  // Get Locales Data
  const {
    addNewUser_button,
    addUser,
    displayView,
    displayViewToggle_button,
    editUser,
    email,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    posts_error,
    text,
    toggleMode_button
  } = getLocaleData(locale);

  // Assign the Locales variables.
  const appContext: AppContextInterface = {
    addNewUser_button,
    addUser,
    displayView,
    displayViewToggle_button,
    editUser,
    email,
    header,
    language,
    languageToggle_button,
    name,
    occupation,
    posts_error,
    text,
    toggleMode_button
  };

  // If multiple values/functions are being passed into Context, they can be applied to a object.
  const values: ProviderStoreInterface = {
    appContext,
    dispatch,
    posts,
    setView,
    usersContext: users,
    view,
    views
  };

  // Memoize-ing Components.
  const SelectLocaleMemo = useMemo(
    () => (
      <Dropdown
        buttonDisplayText={languageToggle_button}
        displayText={language}
        dropdownValues={languages}
        dropdownValue={locale}
        setDropdownValue={setLocale}
      />
    ),
    [locale]
  );

  const SelectViewMemo = useMemo(
    () => (
      <Dropdown
        alignment="right"
        buttonDisplayText={displayViewToggle_button}
        displayText={displayView}
        dropdownValues={views}
        dropdownValue={view}
        isNavigation={true}
        setDropdownValue={setView}
      />
    ),
    [locale, view]
  );

  return (
    <FormContext.Provider value={values}>
      <div className="app">
        {isLoading ? (
          <div className="loader">
            <RotateLoader color={"#123abc"} loading={true} />
          </div>
        ) : (
          <>
            <RenderPage />
          </>
        )}
      </div>
    </FormContext.Provider>
  );
};

export default withRouter(App);

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
