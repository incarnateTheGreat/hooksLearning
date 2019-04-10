import React, { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";

const AddUserForm = () => {
  const generateKey = () => Math.floor(Math.random() * (10000 - 0 + 1)) + 0;

  const initialFormState = {
    // disabled: true,
    id: generateKey(),
    name: "",
    occupation: ""
  };
  const [user, setUser] = useState(initialFormState);
  const [disabled, setDisabled] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const toggleSubmitButton = nameObj => {
    const { name, occupation } = nameObj;

    if (name === "" || occupation === "") {
      setDisabled(true);
    } else if (name !== "" && occupation !== "") {
      setDisabled(false);
    }

    setUser({ ...user });
  };

  const handleSubmit = submitUser => () => {
    const { name, occupation } = submitUser;

    if (!name || !occupation) return;

    dispatch({ type: "add", payload: submitUser });

    dispatchToast({ type: "showToast" });

    setTimeout(() => {
      dispatchToast({ type: "hideToast" });
    }, 3000);

    setUser(initialFormState);
  };

  const { appContext, dispatch, dispatchToast }: any = useContext(FormContext);
  const { addNewUser_button, name, occupation } = appContext;

  // Check to toggle Add New User Button.
  useEffect(() => {
    toggleSubmitButton(user);
  }, [user.name, user.occupation]);

  return (
    <div className="username-form">
      <div className="username-form_fields">
        <span className="username-form_fields_container">
          <label>{name}</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </span>
        <span className="username-form_fields_container">
          <label>{occupation}</label>
          <input
            type="text"
            name="occupation"
            value={user.occupation}
            onChange={handleInputChange}
          />
        </span>
      </div>
      <div className="username-form_buttons">
        <button
          title={addNewUser_button}
          className="username-form_buttons_submit"
          disabled={disabled}
          onClick={handleSubmit(user)}
        >
          {addNewUser_button}
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;
