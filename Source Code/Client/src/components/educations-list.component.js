import React, { Component } from "react";
import EducationDataService from "../services/education.service";
import { Link } from "react-router-dom";

// export default EmployeesList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCause_id = this.onChangeSearchCause_id.bind(this);
    this.retrieveEducations = this.retrieveEducations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEducation = this.setActiveEducation.bind(this);
    this.removeAllEducations = this.removeAllEducations.bind(this);
    this.searchCause_id = this.searchCause_id.bind(this);

    this.state = {
      educations: [],
      currentEducation: null,
      currentIndex: -1,
      searchEducation: ""
    };
  }

  componentDidMount() {
    this.retrieveEducations();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchCause_id(e) {
    const searchCause_id = e.target.value;

    this.setState({
      searchCause_id: searchCause_id
    });
  }

  retrieveEducations() {
    EducationDataService.getAll()
      .then(response => {
        this.setState({
          educations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEducations();
    this.setState({
      currentEducation: null,
      currentIndex: -1
    });
  }

  setActiveEducation(education, index) {
    this.setState({
      currentEducation: education,
      currentIndex: index
    });
  }

  removeAllEducations() {
    EducationDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCause_id() {
    EducationDataService.findById(this.state.searchCause_id)
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addEducation() {
    window.location="/addeducation"
  }

  render() {
    const { searchCause_id, educations, currentEducation, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by cause_id"
              value={searchCause_id}
              onChange={this.onChangeSearchCause_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCause_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addEducation}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6">
          <h4>Education Causes List</h4>

          <ul className="list-group">
            {educations &&
              educations.map((education, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEducation(education, index)}
                  key={index}
                >
                  {education.cause_id}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentEducation ? (
            <div>
              <h4>Education</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentEducation.cause_id}
              </div>
              <div>
                <label>
                  <strong>Institution Name:</strong>
                </label>{" "}
                {currentEducation.institution_name}
              </div>
              <div>
                <label>
                  <strong>Need Type :</strong>
                </label>{" "}
                {currentEducation.need_type}
              </div>
              <div>
                <label>
                  <strong>Need Quantity</strong>
                </label>{" "}
                {currentEducation.need_quantity}
              </div>
              <div>
                <label>
                  <strong>Name (point of contact)</strong>
                </label>{" "}
                {currentEducation.poc_name}
              </div>
              <div>
                <label>
                  <strong>contact (point of contact)</strong>
                </label>{" "}
                {currentEducation.poc_contact}
              </div>
             

              <Link
                to={"/educations/" + currentEducation.cause_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Cause</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}