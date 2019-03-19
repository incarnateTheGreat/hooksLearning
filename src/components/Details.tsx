import React, { useContext } from "react";
import FormContext from "../context/form-context";
import AddUserForm from "./AddUserForm";

const Details = () => {
  const { appContext, dispatch, usersContext }: any = useContext(FormContext);
  const { addUser } = appContext;

  const deleteUserFunc = id => () => {
    dispatch({
      payload: id,
      type: "delete"
    });
  };

  return (
    <div className="details">
      <>
        <>
          <h2>{addUser}</h2>
          <AddUserForm />
        </>
        <div className="details_rows">
          {usersContext.length > 0 ? (
            usersContext.map(user => (
              <div className="details_rows_row" key={user.id}>
                <span className="details_rows_row_name">{user.name}</span>
                <span className="details_rows_row_occupation">
                  {user.occupation}
                </span>
                <span
                  className="details_rows_row_deleteUser"
                  onClick={deleteUserFunc(user.id)}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <div>Sorry. There are no Users to display.</div>
          )}
        </div>
      </>
    </div>
  );
};

export default Details;
