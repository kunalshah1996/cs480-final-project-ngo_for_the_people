import http from "../http-common";

class ReceiverDataService {
  getAll() {
    return http.get("/receivers");
  }

  get(id) {
    return http.get(`/receivers/${id}`);
  }

  create(data) {
    return http.post("/receivers", data);
  }

  update(id, data) {
    return http.put(`/receivers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/receivers/${id}`);
  }

  deleteAll() {
    return http.delete(`/receivers`);
  }

  findById(id) {
    console.log("in ds")
    return http.get(`/receivers?receiver_id=${id}`);
  }
}

export default new ReceiverDataService();