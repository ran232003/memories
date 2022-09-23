export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  let newObject = JSON.parse(localStorage.getItem("user"));
  return newObject;
};
export const removeUser = () => {
  localStorage.removeItem("user");
};
