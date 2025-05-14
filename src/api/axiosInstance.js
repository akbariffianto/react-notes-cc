import axios from "axios";

const instance = axios.create({
  baseURL: "https://notes-backend-wijdan-13926268988.us-central1.run.app",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;