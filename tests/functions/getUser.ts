export const getUser = async (token: string) => {
  const response = await fetch("http://localhost:3000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;
};
