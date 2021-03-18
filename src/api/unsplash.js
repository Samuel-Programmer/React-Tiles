import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 5u-iF908FYPZa5sFPp4CD1w1pWtd0YwyVUq8XAZDIjQ",
  },
});
