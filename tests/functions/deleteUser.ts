export const deleteUser = async (token: string, id: string) => {
  const response = await fetch(`http://localhost:3000/api/users/delete/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;
};
