import http from "../http-common";

class LoginDataService {
    Login() {
      return http.get("/users/login");
    }
}

export default new LoginDataService();