import http from "../http-common";

class CauseDataService {
  getAll() {
    return http.get("/causes");
  }

  get(id) {
    console.log("in ds")
    return http.get(`/causes/${id}`);
  }

  create(data) {
    return http.post("/causes", data);
  }

  update(id, data) {
    return http.put(`/causes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/causes/${id}`);
  }

  deleteAll() {
    return http.delete(`/causes`);
  }

  findById(id) {
    return http.get(`/causes?cause_id=${id}`);
  }
}

export default new CauseDataService();