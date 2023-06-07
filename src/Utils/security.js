function getToken() {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData).token;
  }
  return null;
}

export { getToken };
