import axios from "axios";
import React, { useEffect, useMemo, useReducer, useState } from "react";

// Reducers
import UserReducer from "./reducers/user.reducer";

// Components
import Details from "./components/Details";
import Posts from "./components/Posts";
import SelectLocale from "./components/SelectLocale";
import SelectView from "./components/SelectView";

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

const views: object = {
  posts: "Posts",
  users: "Users"
};

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
  const [toggleMode, setToggleMode] = useState("add");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, dispatch] = useReducer(UserReducer, initUserList);

  const toggleMode_func = () => {
    setToggleMode(toggleMode === "add" ? "edit" : "add");
  };

  useEffect(() => {
    async function getPostsData() {
      const instance = axios.create();
      instance.defaults.timeout = 2500;

      setIsLoading(true);

      await instance
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(data => {
          console.log(data);

          // setPosts(data);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
        });
    }

    getPostsData();
  }, []);

  const RenderPage = () => {
    console.log("render.");

    return (
      <>
        <header>
          <nav>
            {SelectLocaleMemo} {SelectViewMemo}
          </nav>
        </header>
        {view === "users" ? (
          <>
            <h2>{addUser}</h2>
            {DetailsMemo}
          </>
        ) : (
          view === "posts" && (
            <>
              <h2>Posts</h2>
              {PostsMemo}
            </>
          )
        )}
      </>
    );
  };

  // Memoize-ing Components.
  const DetailsMemo = useMemo(() => <Details />, [users]);
  const PostsMemo = useMemo(() => <Posts />, [posts]);
  const SelectLocaleMemo = useMemo(() => <SelectLocale />, [locale]);
  const SelectViewMemo = useMemo(() => <SelectView />, [view]);
  // const RenderPageMemo = useMemo(() => <RenderPage />, [users, posts]);

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
    languages,
    locale,
    posts,
    setLocale,
    setView,
    toggleMode,
    toggleMode_func,
    usersContext: users,
    view,
    views
  };

  return (
    <FormContext.Provider value={values}>
      <div className="app">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <RenderPage />
          </>
        )}
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
