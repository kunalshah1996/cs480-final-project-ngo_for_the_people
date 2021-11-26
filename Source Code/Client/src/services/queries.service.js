import http from "../http-common";

class QueriesDataService {
  employees_education() {
    return http.get("/queries/employees_education");
  }
  
  incomplete_donation() {
    return http.get("/queries/incomplete_donation");
  }

  free_employees() {
    return http.get("/queries/free_employees");
  }

  donation_quantity() {
    return http.get("/queries/donation_quantity");
  }
  budget_city(data){
    return http.get(`/queries/budget_city/?city=${data.city}`)
  }
  show_funds(){
    return http.get("/queries/allocated_funds")
  }
}

export default new QueriesDataService();