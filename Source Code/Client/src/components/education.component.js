import React, { Component } from "react";
import EducationDataService from "../services/education.service";

export default class Education extends Component {
  constructor(props) {
    super(props);
    //this.onChangeEmployee_id = this.onChangeEmployee_id.bind(this);
    this.onChangeInstitution_name = this.onChangeInstitution_name.bind(this);
    this.onChangeNeed_type = this.onChangeNeed_type.bind(this);
    this.onChangeNeed_quantity = this.onChangeNeed_quantity.bind(this);
    this.onChangePoc_name = this.onChangePoc_name.bind(this);
    this.onChangePoc_contact = this.onChangePoc_contact.bind(this);
    
    this.getEducation = this.getEducation.bind(this);
    this.updateEducation = this.updateEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);

    this.state = {
      currentEducation: {
        cause_id: "",
        institution_name: "",
        need_type: "",
        need_quantity: "",
        poc_name: "",
        poc_contact: "",
        
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEducation(this.props.match.params.id);
  }

//   onChangeEmployee_id(e) {
//     const employee_id = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentEmployee: {
//           ...prevState.currentEmployee,
//           employee_id: employee_id
//         }
//       };
//     });
//   }

  onChangeInstitution_name(e) {
    const institution_name = e.target.value;
    
    this.setState(prevState => ({
      currentEducation: {
        ...prevState.currentEducation,
        institution_name : institution_name
      }
    }));
  }

  onChangeNeed_type(e) {
    const need_type = e.target.value;
    
    this.setState(prevState => ({
      currentEducation: {
        ...prevState.currentEducation,
        need_type: need_type
      }
    }));
  }

  onChangeNeed_quantity(e) {
    const need_quantity = e.target.value;
    
    this.setState(prevState => ({
      currentEducation: {
        ...prevState.currentEducation,
        need_quantity: need_quantity
      }
    }));
  }

  onChangePoc_name(e) {
    const poc_name = e.target.value;
    
    this.setState(prevState => ({
      currentEducation: {
        ...prevState.currentEducation,
        poc_name: poc_name
      }
    }));
  }

  onChangePoc_contact(e) {
    const poc_contact = e.target.value;
    
    this.setState(prevState => ({
      currentEducation: {
        ...prevState.currentEducation,
        poc_contact: poc_contact
      }
    }));
  }
 

  getEducation(id) {
    EducationDataService.get(id)
      .then(response => {
        this.setState({
          currentEducation: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateEducation() {
    EducationDataService.update(
      this.state.currentEducation.cause_id,
      this.state.currentEducation
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cause was updated successfully!"
        });
        alert("Updated successfully");
        window.location.href = '/educations'
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEducation() {    
      console.log(this.state.currentEducation.cause_id)
    EducationDataService.delete(this.state.currentEducation.cause_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/educations')
        alert("Deleted successfully");
        window.location.href = '/educations'
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEducation } = this.state;

    return (
      <body id = "bg">
      <div>
        {currentEducation ? (
          <div className="edit-form" id ="fifth">
            <h4 id = "fontc">Education</h4>
            <form>
              <div className="form-group">
                <label htmlFor="cause_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_id"
                  value={currentEducation.cause_id}
                  onChange={this.onChangeCause_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="institution_name">Institution Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="institution_name"
                  value={currentEducation.institution_name}
                  onChange={this.onChangeInstitution_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="need_type">Need Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_type"
                  value={currentEducation.need_type}
                  onChange={this.onChangeNeed_type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="need_quantity">Need Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="need_quantity"
                  value={currentEducation.need_quantity}
                  onChange={this.onChangeNeed_quantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poc_name">Name (Point of Contact)</label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_name"
                  value={currentEducation.poc_name}
                  onChange={this.onChangePoc_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poc_contact">Contact (Point of Contact)</label>
                <input
                  type="text"
                  className="form-control"
                  id="poc_contact"
                  value={currentEducation.poc_contact}
                  onChange={this.onChangePoc_contact}
                />
              </div>

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteEducation}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateEducation}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Education cause</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
