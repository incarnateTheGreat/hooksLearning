const ToastSequence = (dispatchToast, type) => {
  dispatchToast({
    payload: { showToast: true, type },
    type: "showSuccessToast"
  });

  setTimeout(() => {
    dispatchToast({
      payload: { showToast: false, type },
      type: "hideToast"
    });
  }, 3000);
};

export default ToastSequence;
