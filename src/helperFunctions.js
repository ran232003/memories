export const getUserLocalStorage = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user;
};
export const setUserLocalStorage = () => {
  let user = localStorage.setItem("user", JSON.stringify(user));
};
export const checkInput = (input) => {
  if (input.length === 0) {
    return false;
  }
  return true;
};
