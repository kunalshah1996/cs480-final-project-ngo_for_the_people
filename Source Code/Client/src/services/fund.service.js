import http from "../http-common";

class FundsDataService {
  getAll() {
    return http.get("/funds");
  }

  get(id) {
    return http.get(`/funds/${id}`);
  }

  create(data) {
    return http.post("/funds", data);
  }

  update(id, data) {
    return http.put(`/funds/${id}`, data);
  }

  delete(id) {
    return http.delete(`/funds/${id}`);
  }

  deleteAll() {
    return http.delete(`/funds`);
  }

  findById(id) {
    return http.get(`/funds?fund_id=${id}`);
  }
}

export default new FundsDataService();