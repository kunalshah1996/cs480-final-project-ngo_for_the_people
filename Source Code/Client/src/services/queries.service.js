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

  show_donations() {
    return http.get("/queries/donation_quantity");
  }
  budget_city(data){
    return http.get(`/queries/budget_city/?city=${data.city}`)
  }
  show_funds(){
    return http.get("/queries/allocated_funds")
  }
  active_causes(){
    return http.get("/queries/active_causes")
  }
  budget_online(){
    return http.get("/queries/budget_online")
  }
  desgination_pr(){
    return http.get("/queries/designation_pr")
  }
  trim_ename(){
    return http.get("/queries/trim_ename")
  }
  count_donation(data){
    return http.get(`/queries/count_donation/?countvalue=${data.countvalue}`)
  }
  joining_period(data){
    return http.get(`/queries/joining_period/?date1=${data.date1}&date2=${data.date2}`)
  }
}

export default new QueriesDataService();
