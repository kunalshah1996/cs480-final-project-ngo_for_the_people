import http from "../http-common";

class DonorDataService {
  getAll() {
    return http.get("/donors");
  }

  get(id) {
    return http.get(`/donors/${id}`);
  }

  create(data) {
    return http.post("/donors", data);
  }

  update(id, data) {
    return http.put(`/donors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/donors/${id}`);
  }

  deleteAll() {
    return http.delete(`/donors`);
  }

  findById(id) {
    return http.get(`/donors?donor_id=${id}`);
  }
}

export default new DonorDataService();