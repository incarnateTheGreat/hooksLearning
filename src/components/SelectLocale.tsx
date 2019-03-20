import React, { useContext, useEffect, useRef, useState } from "react";
import FormContext from "../context/form-context";

// Set the Locale.
const SelectLocale = () => {
  const { appContext, locale, setLocale, languages }: any = useContext(
    FormContext
  );
  const dropdown: any = useRef(null);
  const [dropdownToggle, setDropdownToggle] = useState(false);

  const ChangeLocale = event => {
    setLocale(event.target.dataset.language);
    // toggleDropdown();
  };

  const toggleDropdown = () => {
    setDropdownToggle(dropdown.current.classList.toggle("--show"));
  };

  // Handles custom class name additions based on condition.
  const classNames = key => {
    return ["dropdown_contents_item", key === locale ? "--selected" : ""].join(
      " "
    );
  };

  // Localizing the Languages Array.
  const languagesArr = Object.keys(languages);

  // Close the Dropdown if clicked anywhere outside of the Dropdown itself.
  useEffect(() => {
    document.body.onclick = e => {
      if (dropdownToggle) {
        toggleDropdown();
      }
    };
  }, [dropdownToggle]);

  return (
    <div className="dropdown">
      <div className="dropdown_menu_container">
        <button
          className="dropdown_menu_container_button"
          onClick={toggleDropdown}
          title={appContext.languageToggle_button}
        >
          {appContext.language}
        </button>
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
