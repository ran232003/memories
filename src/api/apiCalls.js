export const signup = async (user) => {
  const response = await fetch("http://localhost:5000/api/user/newUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();
  return data;
};
