export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (user) => {
  let newObject = JSON.parse(localStorage.getItem("user"));
  return newObject;
};
