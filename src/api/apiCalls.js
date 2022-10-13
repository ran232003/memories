import axios from "axios";
export const signup = async (user, status) => {
  const response = await fetch(`http://localhost:5000/api/user/${status}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let data = await response.json();

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

  return data;
};

export const addPost = async (post, user) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("desc", post.desc);
  formData.append("file", post.image);
  formData.append("userId", user.id);
  const response = await fetch("http://localhost:5000/api/memory/addPost", {
    method: "POST",
    body: formData,
  });
  // const response = await axios.post(
  //   "http://localhost:5000/api/memory/addPost",
  //   formData
  // );

  let data = await response.json();
  return data;
};
export const getMemories = async () => {
  const response = await fetch("http://localhost:5000/api/memory/getMemories");
  let data = await response.json();

  return data;
};
export const deleteMemory = async (memoryId) => {
  const response = await fetch(
    "http://localhost:5000/api/memory/deleteMemory",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoryId),
    }
  );
  let data = await response.json();
  return data;
};
export const LikeMemory = async (payload) => {
  const response = await fetch("http://localhost:5000/api/memory/LikeMemory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let data = await response.json();
  return data;
};
export const editPostNewImage = async (post) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("desc", post.desc);
  formData.append("file", post.image);
  formData.append("memoryId", post.memoryId);
  const response = await fetch(
    "http://localhost:5000/api/memory/editPostNewImage",
    {
      method: "POST",
      body: formData,
    }
  );
  // const response = await axios.post(
  //   "http://localhost:5000/api/memory/addPost",
  //   formData
  // );

  let data = await response.json();
  return data;
};
export const editPostNoImage = async (payload) => {
  const response = await fetch(
    "http://localhost:5000/api/memory/editPostNoImage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  let data = await response.json();
  return data;
};
