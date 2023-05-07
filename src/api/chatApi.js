import axiosClient from "./axiosClient";

const chatApi = {
  chatGPT: (message) => {
    const url = "/chat/gpt";
    return axiosClient.post(url, { prompt: message });
  },
};

export default chatApi;
