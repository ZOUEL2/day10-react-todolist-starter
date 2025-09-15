const instance = axios.create({
  baseURL: 'https://68c78c945d8d9f514732230d.mockapi.io/api/',
  timeout: 1000,
});

export const getTodo = async () => {
    return instance.get('/todos');
}
