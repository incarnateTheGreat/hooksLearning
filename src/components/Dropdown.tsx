import React, { useEffect, useRef, useState } from "react";

// Interfaces
import { IDropdown } from "../interfaces/form.interface";

// Set the Locale.
const Dropdown = props => {
  const {
    alignment,
    buttonDisplayText,
    displayText,
    dropdownValue,
    dropdownValues,
    setDropdownValue
  }: IDropdown = props;

  const generateKey = () => Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
  const dropdown: any = useRef(null);
  const [dropdownToggle, setDropdownToggle] = useState<HTMLInputElement | null>(
    null
  );

  const ChangeValue = event => {
    setDropdownValue(event.target.dataset.value);
  };

  // Toggle the Dropdown natively.
  const toggleDropdown = () => {
    if (dropdownToggle) {
      const contents = dropdownToggle.getElementsByClassName(
        "dropdown_contents"
      )[0];

      contents.classList.toggle("--show");
    }
  };

  // Handles custom class name additions based on condition.
  const selectedClassNames = key => {
    return [
      "dropdown_contents_item",
      key === dropdownValue ? "--selected" : ""
    ].join(" ");
  };

  const containerClassNames = () => {
    return [
      "dropdown_menu_container",
      alignment === "right" ? "dropdown_menu_container--right" : ""
    ].join(" ");
  };

  // Extracting the Keys from the Dropdown Values object.
  const dropdownValuesArr = Object.keys(dropdownValues);

  // Close the Dropdown if clicked anywhere outside of the Dropdown itself.
  useEffect(() => {
    setDropdownToggle(dropdown.current);
  }, []);

  document.body.onclick = () => {
    const list = document.getElementsByClassName("dropdown_contents");

    for (const key of list) {
      key.classList.remove("--show");
    }
  };

  return (
    <div ref={dropdown} className="dropdown" data-id={generateKey()}>
      <div className={containerClassNames()}>
        <button
          className="dropdown_menu_container_button"
          onClick={toggleDropdown}
          title={buttonDisplayText}
        >
          {displayText}
        </button>
      </div>
      <div className="dropdown_contents">
        {dropdownValuesArr.length > 0 &&
          dropdownValuesArr.map(key => {
            return (
              <span
                className={selectedClassNames(key)}
                data-value={key}
                key={key}
                onClick={ChangeValue}
              >
                {dropdownValues[key]}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default Dropdown;
