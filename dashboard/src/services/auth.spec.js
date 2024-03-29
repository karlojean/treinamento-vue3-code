import axiosMock from "axios";
import AuthService from "./auth";

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return a token when user login", async () => {
    const token = "123.123.123";

    axiosMock.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await AuthService(axiosMock).login({
      email: "jean@admin.com",
      password: "123",
    });
    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it("should return an user when user register", async () => {
    const user = {
      name: "Jean",
      password: "123",
      email: "jean@admin.com",
    };

    axiosMock.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user });
    });

    const response = await AuthService(axiosMock).login({
      email: "jean@admin.com",
      password: "123",
    });

    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("password");
    expect(response.data).toHaveProperty("email");
    expect(response).toMatchSnapshot();
  });

  it("should throw an error when not found", async () => {
    const errors = { status: 404, statusText: "Not Found" };
    axiosMock.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors });
    });

    const response = await AuthService(axiosMock).login({
      email: "igor@igor.me",
      password: "123",
    });
    expect(response.errors).toHaveProperty("status");
    expect(response.errors).toHaveProperty("statusText");
  });
});
