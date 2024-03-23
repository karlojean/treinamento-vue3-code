export default (httpClient) => ({
  // eslint-disable-next-line
  login: async ({ email, password }) => {
    console.log("Login");
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });
    let errors = null;

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText,
      };
    }

    return {
      data: response.data,
      errors,
    };
  },
});
