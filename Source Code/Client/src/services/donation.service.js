import http from "../http-common";

class DonationsDataService {
  getAll() {
    return http.get("/donations");
  }

  get(id) {
    return http.get(`/donations/${id}`);
  }

  create(data) {
    return http.post("/donations", data);
  }

  update(id, data) {
    return http.put(`/donations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/donations/${id}`);
  }

  deleteAll() {
    return http.delete(`/donations`);
  }

  findById(id) {
    return http.get(`/donations?donation_id=${id}`);
  }
}

export default new DonationsDataService();