import React, { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";

const AddUserForm = ({ addUser }) => {
  const generateKey = () => Math.floor(Math.random() * (10000 - 0 + 1)) + 0;

  const initialFormState = {
    disabled: true,
    id: generateKey(),
    name: "",
    occupation: ""
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const toggleSubmitButton = nameObj => {
    const { name, occupation } = nameObj;
    let { disabled } = nameObj;

    if (name === "" || occupation === "") {
      disabled = true;
    } else if (name !== "" && occupation !== "") {
      disabled = false;
    }

    // return disabled;
    setUser({ ...user, disabled });
  };

  const handleSubmit = submitUser => event => {
    event.preventDefault();

    const { name, occupation } = submitUser;

    if (!name || !occupation) return;

    addUser(user);
    setUser(initialFormState);
  };

  // Testing Context necessity.
  const { appContext }: any = useContext(FormContext);
  const { addNewUser_button, name, occupation } = appContext;

  // Check to toggle Add New User Button.
  useEffect(() => {
    toggleSubmitButton(user);
  }, [user.name, user.occupation]);

  return (
    <form className="username-form" onSubmit={handleSubmit(user)}>
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
      <button
        title={addNewUser_button}
        className="username-form_submit"
        disabled={user.disabled}
      >
        {addNewUser_button}
      </button>
    </form>
  );
};

export default AddUserForm;
