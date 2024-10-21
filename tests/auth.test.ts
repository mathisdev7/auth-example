import { describe, expect, test } from "@jest/globals";
import { getUser } from "./functions/getUser";
import { login } from "./functions/login";
import { signup } from "./functions/signup";

// before running tests, make sure to run the server and verify that this user does not exist in the database!!
const userData = {
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword",
  username: "johndoe",
  role: "admin", // changing this to "admin" will remove the user from the database in the deleteUser function test
};

let token: string;

describe("/POST api/auth/signup", () => {
  test("signs up user", async () => {
    const status = await signup(
      userData.name,
      userData.email,
      userData.password,
      userData.username,
      userData.role
    );
    expect(status).toBe(201);
  });
  test("signs up user with existing email", async () => {
    const status = await signup(
      userData.name,
      userData.email,
      userData.password,
      userData.username,
      userData.role
    );
    expect(status).toBe(400);
  });
});

describe("/POST api/auth/login", () => {
  test("logs in user", async () => {
    const response = await login("john@example.com", "securepassword");
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const data = await response.json();
      token = data.token;
    }
  });
  test("logs in user with invalid password", async () => {
    const response = await login("john@example.com", "wrongpassword");
    expect(response.status).toBe(400);
  });
  test("logs in user with invalid email", async () => {
    const response = await login("wrongemail@example.com", "securepassword");
    expect(response.status).toBe(400);
  });
  test("logs in user with missing fields", async () => {
    const response = await login("", "");
    expect(response.status).toBe(400);
  });
});

describe("/GET api/users/me", () => {
  test("gets user", async () => {
    const status = await getUser(token);
    expect(status).toBe(200);
  });
});

describe("/GET api/users/delete/:id", () => {
  test("deletes user", async () => {
    const response = await fetch("http://localhost:3000/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJson = await response.json();
    const user = responseJson.user;
    const deleteResponse = await fetch(
      `http://localhost:3000/api/users/delete/${user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (userData.role === "admin") {
      expect(deleteResponse.status).toBe(200);
    } else {
      expect(deleteResponse.status).toBe(403);
    }
  });
});
