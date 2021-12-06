import http from "../http-common";

class LoginDataService {
    login(data) {
      return http.post("users/login", data);
    }
    getAll(){
      return http.get("users/display_all");
    }
    register(data){
      return http.post("users/register",data)
    }
}

export default new LoginDataService();