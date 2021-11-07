import http from "../http-common";

class LoginDataService {
    login(data) {
      console.log("entered login data service")
      console.log(data)
      return http.post("users/login", data);
    }
}

export default new LoginDataService();