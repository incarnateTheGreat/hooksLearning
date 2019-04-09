import React, { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";

const EditUserForm = props => {
  const user_id = props.location.state.user.id;
  const user_name = props.location.state.user.name;
  const user_occupation = props.location.state.user.occupation;

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

    props.history.goBack();
  };

  const deleteUserFunc = () => {
    dispatch({
      payload: user_id,
      type: "delete"
    });

    props.history.goBack();
  };

  // Testing Context necessity.
  const { appContext, dispatch }: any = useContext(FormContext);
  const { name, occupation } = appContext;

  // Check to toggle Edit User Button.
  useEffect(() => {
    setUser({ id: user_id, name: user_name, occupation: user_occupation });
  }, []);

  return (
    <div className="username-form">
      <div className="username-form_fields">
        <span className="username-form_fields_container">
          <label>{name}</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            onChange={handleInputChange}
          />
        </span>
        <span className="username-form_fields_container">
          <label>{occupation}</label>
          <input
            type="text"
            name="occupation"
            value={user.occupation || ""}
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
