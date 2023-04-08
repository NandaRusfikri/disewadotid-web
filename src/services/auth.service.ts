import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor() {
    this.instance = axios.create({
      baseURL: process.env.apidomain,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (email: string, password: string) => {
    return this.instance
      .post("api/v1/user/login", {
        email: email,
        password,
      })
      .then((res) => {

        return {
          username: res.data.data.username,
          avatar: res.data.data.path_avatar,
          id: res.data.data.id,
          accessToken: res.data.data.access_token,
          expiredAt: res.data.data.expired_at,
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };

  uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };
}
