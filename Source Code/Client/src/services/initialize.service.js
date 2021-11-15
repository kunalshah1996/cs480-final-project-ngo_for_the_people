import http from "../http-common";

class InitializeDataService {
  start() {
    return http.get("/initializedb");
  }
}

export default new InitializeDataService();