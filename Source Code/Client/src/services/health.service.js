import http from "../http-common";

class HealthDataService {
  getAll() {
    return http.get("/healths");
  }

  get(id) {
    return http.get(`/healths/${id}`);
  }

  create(data) {
    return http.post("/healths", data);
  }

  update(id, data) {
    return http.put(`/healths/${id}`, data);
  }

  delete(id) {
    return http.delete(`/healths/${id}`);
  }

  deleteAll() {
    return http.delete(`/healths`);
  }

  findById(id) {
    return http.get(`/healths?cause_id=${id}`);
  }
}

export default new HealthDataService();