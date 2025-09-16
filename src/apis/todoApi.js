import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 1000,
});

export const getTodos = async () => {
  const response = await instance.get("/todos");
  return response;
};

export const addTodo = async (todo) => {
  const response = await instance.post("/todos", todo);
  return response;
};

export const deleteTodo = async (id) => {
  const response = await instance.delete(`/todos/${id}`);
  return response;
};

export const updateTodo = async (id, updatedFields) => {
  const response = await instance.put(`/todos/${id}`, updatedFields);
  return response;
};

export const patchTodo = async (id, updatedFields) => {
  const response = await instance.patch(`/todos/${id}`, updatedFields);
  return response;
};

instance.interceptors.request.use(
  (config) => {
    // request configuration
    console.log("request success", config);
    config.metadata = {
      startTime: Date.now(),
    };
    return config;
  },
  (error) => {
    // handle request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // handle response
    console.log("response success", response);
    console.log(
      "Api duration is" +
        (Date.now() - response.config.metadata.startTime) +
        "ms"
    );
    return response;
  },
  (error) => {
    // handle response error
    const { status, data } = error.response;
    if (status === 400 || status === 401 || status === 403 || status === 404) {
      alert(`Client response Error ${status} : ${data}`);
      console.log(error.response);
      // do something
    } else if (status >= 500) {
      alert(`Server response Error ${status} : ${data}`);
      console.log(error.response);
      // do something
    }
    return Promise.reject(error);
  }
);
