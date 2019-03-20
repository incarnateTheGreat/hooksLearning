import React, { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";

const EditUserForm = props => {
  const initialFormState = {
    id: null,
    name: "",
    occupation: ""
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const updateUserFunc = () => {
    dispatch({
      payload: user,
      type: "update"
    });

    toggleMode_func();
  };

  const deleteUserFunc = () => {
    dispatch({
      payload: user.id,
      type: "delete"
    });

    toggleMode_func();
  };

  // Testing Context necessity.
  const { appContext, dispatch, toggleMode_func }: any = useContext(
    FormContext
  );
  const { name, occupation } = appContext;

  // Check to toggle Add New User Button.
  useEffect(() => {
    setUser({ id: props.id, name: props.name, occupation: props.occupation });
  }, []);

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
          className="username-form_buttons_update"
          onClick={updateUserFunc}
        >
          Update
        </button>
        <button
          className="username-form_buttons_delete"
          onClick={deleteUserFunc}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
