import React, { useContext, useRef } from "react";
import FormContext from "../context/form-context";

// Set the Locale.
const SelectLocale = ({ locale, setLocale }) => {
  const { appContext, testFunc, languages }: any = useContext(FormContext);
  const { func_button } = appContext;
  const dropdown: any = useRef(null);

  const ChangeLocale = event => {
    setLocale(event.target.dataset.language);
    openDropdown();
  };

  const openDropdown = () => {
    dropdown.current.classList.toggle("--show");
  };

  // Handles custom class name additions based on condition.
  const classNames = key => {
    return ["dropdown_contents_item", key === locale ? "--selected" : ""].join(
      " "
    );
  };

  // Localizing the Languages Array.
  const languagesArr = Object.keys(languages);

  return (
    <div className="dropdown">
      <div className="dropdown_menu_container">
        <button
          className="dropdown_menu_container_button"
          onClick={openDropdown}
          title={appContext.languageToggle_button}
        >
          {appContext.language}
        </button>
        <button onClick={testFunc}>{func_button}</button>
      </div>
      <div ref={dropdown} className="dropdown_contents">
        {languagesArr.length > 0 &&
          languagesArr.map(key => (
            <span
              className={classNames(key)}
              data-language={key}
              key={key}
              onClick={ChangeLocale}
            >
              {languages[key]}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SelectLocale;
