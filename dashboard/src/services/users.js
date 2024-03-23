export default (httpClient) => ({
  // eslint-disable-next-line
  getMe: async () => {
    const response = await httpClient.get("/users/me");
    return {
      data: response.data,
    };
  },
  // eslint-disable-next-line
  generateApikey: async () => {
    const response = await httpClient.post("/users/me/apikey");

    return {
      data: response.data,
    };
  },
});
