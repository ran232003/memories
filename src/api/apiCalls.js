export const signup = async (user) => {
  const response = await fetch("http://localhost:5000/api/user/newUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  console.log(data);
  return data;
};
export const googleLogin = async (user) => {
  const response = await fetch("http://localhost:5000/api/user/googleLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  console.log(data);
  return data;
};
export const googleSignup = async (user) => {
  const response = await fetch("http://localhost:5000/api/user/googleSignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  console.log(data, "googleSignup");
  return data;
};
