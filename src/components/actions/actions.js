
export const simpleAction = (type, payload = null, message = "") => (
  {
    type,
    payload,
    message
  }
);

export const fetchingData = (user) => (
  (dispatch) => {
    if (user.length === 0) {
      return dispatch(simpleAction("DATA_READY", false));
    }
    return fetch(`https://api.github.com/users/${user}`)
      .then((res) => {
        if (res.status === 404) {
          return dispatch(simpleAction("ERROR", true));
        }
        dispatch(simpleAction("DATA_READY", true));

        return res.json()
      },
      (err) => (
        dispatch(simpleAction("ERROR", true, err))
      )
      )
      .then((result) => {
        dispatch(simpleAction("DATA_RECEIVED", result));
      })
  }

);
