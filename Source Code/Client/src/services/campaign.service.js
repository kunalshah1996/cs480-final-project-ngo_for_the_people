import http from "../http-common";

class CampaignDataService {
  getAll() {
    return http.get("/campaigns");
  }

  get(id) {
    return http.get(`/campaigns/${id}`);
  }

  create(data) {
    return http.post("/campaigns", data);
  }

  update(id, data) {
    return http.put(`/campaigns/${id}`, data);
  }

  delete(id) {
    return http.delete(`/campaigns/${id}`);
  }

  deleteAll() {
    return http.delete(`/campaigns`);
  }

  findById(id) {
    return http.get(`/campaigns?campaign_id=${id}`);
  }
}

export default new CampaignDataService();