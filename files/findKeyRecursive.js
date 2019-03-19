public getKey = (queryObj, queryKey) => {
    let value = "";

    recursiveGetKey(queryObj);

    return value;

    function recursiveGetKey(obj: object) {
      for (const key in obj) {
        if (value === "") {
          if (typeof obj[key] !== "object") {
            continue;
          } else {
            if (key === queryKey) {
              value = key;
              break;
            } else {
              recursiveGetKey(obj[key]);
            }
          }
        }
      }
    }
  };