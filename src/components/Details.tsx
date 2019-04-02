import React, { useContext, useMemo, useState } from "react";
import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";
import FormContext from "../context/form-context";

const Details = () => {
  const { usersContext }: any = useContext(FormContext);
  const [editUser, setEditUser] = useState<number | null>(null);

  // Memoized Components.
  const AddNewUserFormMemo = useMemo(() => <AddUserForm />, []);

  const AddUser = () => {
    return (
      <>
        {AddNewUserFormMemo}
        <div className="details_rows">
          {usersContext.length > 0 ? (
            usersContext.map(user => (
              <div
                className="details_rows_row"
                data-id={user.id}
                key={user.id}
                onClick={editUserFunc}
              >
                <span className="details_rows_row_name">{user.name}</span>
                <span className="details_rows_row_occupation">
                  {user.occupation}
                </span>
              </div>
            ))
          ) : (
            <div>Sorry. There are no Users to display.</div>
          )}
        </div>
      </>
    );
  };

  const EditUser = () => {
    const user = usersContext.find(u => u.id === editUser);

    return (
      <>
        <EditUserForm {...user} />
        <button onClick={editUserFunc}>Go back</button>
      </>
    );
  };

  const editUserFunc = event => {
    // Handle the ID by either getting the click event's dataset ID, or return null if no number is returned.
    // The latter will occur on the "Go Back" click event.
    const id = parseInt(event.currentTarget.dataset.id, 10) || null;

    setEditUser(id);
  };

  // Show Edit User Mode if the Edit User has been found and set. Otherwise, display the Add Form.
  return (
    <div className="details view-container">
      <>{editUser === null ? <AddUser /> : <EditUser />}</>
    </div>
  );
};

export default Details;
