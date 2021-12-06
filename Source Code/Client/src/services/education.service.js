import http from "../http-common";

class EducationDataService {
  getAll() {
    return http.get("/educations");
  }

  get(id) {
    return http.get(`/educations/${id}`);
  }

  create(data) {
    return http.post("/educations", data);
  }

  update(id, data) {
    return http.put(`/educations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/educations/${id}`);
  }

  deleteAll() {
    return http.delete(`/educations`);
  }

  findById(id) {
    console.log("In ds")
    return http.get(`/educations?cause_id=${id}`);
  }
}

export default new EducationDataService();