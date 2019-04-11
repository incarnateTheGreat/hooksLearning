import React, { useContext, useEffect, useState } from "react";
import FormContext from "../context/form-context";

const Toast = () => {
  const { toastStatus } = useContext(FormContext);
  const [toastState, setToastState] = useState(null);
  const { showToast, type } = toastStatus;

  let selectedClassNames = null;

  /* In order to render the animation class properly (bypassing the render event), 
	we have to capture the updated value from Context, store it in State, 
	and then use that to render the correct class.
	*/
  useEffect(() => {
    selectedClassNames = ["Toast", showToast ? `--show --${type}` : ""]
      .join(" ")
      .trim();

    setToastState(selectedClassNames);
  });

  // To prevent a Flash of Unwanted Content, assign the "Toast" CSS Class if no Context is rendered yet.
  selectedClassNames = toastState ? toastState : "Toast";

  return (
    <div className={selectedClassNames}>
      <div className="Toast_close-container">x</div>
      <div className="Toast_content-container">
        <i className="Toast_content-container_icon">image</i>
        <span className="Toast-content-container_status">
          This is a message.
        </span>
      </div>
    </div>
  );
};

export default Toast;
