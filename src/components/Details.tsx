import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import FormContext from "../context/form-context";

const Details = () => {
  const { usersContext }: any = useContext(FormContext);

  // Memoized Components.
  const AddNewUserFormMemo = useMemo(() => <AddUserForm />, []);

  const AddUser = () => {
    return (
      <>
        {AddNewUserFormMemo}
        <div className="details_rows">
          {usersContext.length > 0 ? (
            usersContext.map(user => {
              const id = user.id;

              return (
                <Link
                  className="details_rows_row"
                  data-id={id}
                  key={id}
                  to={{
                    pathname: `/editPost/${id}`,
                    state: {
                      user
                    }
                  }}
                >
                  <span className="details_rows_row_name">{user.name}</span>
                  <span className="details_rows_row_occupation">
                    {user.occupation}
                  </span>
                </Link>
              );
            })
          ) : (
            <div>Sorry. There are no Users to display.</div>
          )}
        </div>
      </>
    );
  };

  // Show Edit User Mode if the Edit User has been found and set. Otherwise, display the Add Form.
  return (
    <div className="details view-container">
      <AddUser />
    </div>
  );
};

export default Details;
