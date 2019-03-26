import React, { useContext, useEffect, useRef, useState } from "react";
import FormContext from "../context/form-context";

// Set the View.
const SelectView = () => {
  const { appContext, view, setView, views }: any = useContext(FormContext);
  const { displayView, displayViewToggle_button } = appContext;
  const dropdown: any = useRef(null);
  const [dropdownToggle, setDropdownToggle] = useState(false);

  const ChangeView = event => {
    setView(event.target.dataset.displayView);
  };

  // Toggle the Dropdown natively.
  const toggleDropdown = () => {
    setDropdownToggle(dropdown.current.classList.toggle("--show"));
  };

  // Handles custom class name additions based on condition.
  const classNames = key => {
    return ["dropdown_contents_item", key === view ? "--selected" : ""].join(
      " "
    );
  };

  // Localizing the Views Array.
  const viewsArr = Object.keys(views);

  // Close the Dropdown if clicked anywhere outside of the Dropdown itself.
  useEffect(() => {
    // Close the Dropdown when the user clicks anywhere but the Dropdown button.
    document.body.onclick = e => {
      const target = e.target as HTMLTextAreaElement;

      if (
        dropdownToggle &&
        !target.classList.contains("dropdown_menu_container_button")
      ) {
        toggleDropdown();
      }
    };
  }, [dropdownToggle]);

  return (
    <div className="dropdown">
      <div className="dropdown_menu_container dropdown_menu_container--right">
        <button
          className="dropdown_menu_container_button"
          onClick={toggleDropdown}
          title={displayViewToggle_button}
        >
          {displayView}
        </button>
      </div>
      <div ref={dropdown} className="dropdown_contents">
        {viewsArr.length > 0 &&
          viewsArr.map(key => (
            <span
              className={classNames(key)}
              data-display-view={key}
              key={key}
              onClick={ChangeView}
            >
              {views[key]}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SelectView;
