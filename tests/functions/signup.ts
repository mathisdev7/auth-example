export const signup = async (
  name: string,
  email: string,
  password: string,
  username: string,
  role?: string
) => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, username, role }),
  });
  return response.status;
};
