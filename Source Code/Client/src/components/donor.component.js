import React, { Component } from "react";
import DonorDataService from "../services/donor.service";

export default class Donor extends Component {
  constructor(props) {
    super(props);
    //this.onChangeDonor_id = this.onChangeDonor_id.bind(this);
    this.onChangeDonor_name = this.onChangeDonor_name.bind(this);
    this.onChangeDonor_ssn = this.onChangeDonor_ssn.bind(this);
    this.onChangeDonor_contact = this.onChangeDonor_contact.bind(this);
    this.getDonor = this.getDonor.bind(this);
    this.updateDonor = this.updateDonor.bind(this);
    this.deleteDonor = this.deleteDonor.bind(this);

    this.state = {
      currentDonor: {
        donor_id: "",
        donor_ssn: "",
        donor_name: "",
        donor_contact: "",

      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDonor(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }



  onChangeDonor_name(e) {
    const donor_name = e.target.value;
    
    this.setState(prevState => ({
      currentDonor: {
        ...prevState.currentDonor,
        donor_name: donor_name
      }
    }));
  }

  onChangeDonor_ssn(e) {
    const donor_ssn = e.target.value;
    
    this.setState(prevState => ({
      currentDonor: {
        ...prevState.currentDonor,
        donor_ssn: donor_ssn
      }
    }));
  }

  onChangeDonor_contact(e) {
    const donor_contact = e.target.value;
    
    this.setState(prevState => ({
      currentDonor: {
        ...prevState.currentDonor,
        donor_contact: donor_contact
      }
    }));
  }

 

  getDonor(id) {
    DonorDataService.get(id)
      .then(response => {
        this.setState({
          currentDonor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateDonor() {
    DonorDataService.update(
      this.state.currentDonor.donor_id,
      this.state.currentDonor
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Donor was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDonor() {    
      console.log(this.state.currentDonor.donor_id)
    DonorDataService.delete(this.state.currentDonor.donor_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/donors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDonor } = this.state;

    return (
      <div>
        {currentDonor ? (
          <div className="edit-form">
            <h4>Donor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="donor_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_id"
                  value={currentDonor.donor_id}
                  onChange={this.onChangeDonor_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donor_ssn">SSN</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_ssn"
                  value={currentDonor.donor_ssn}
                  onChange={this.onChangeDonor_ssn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donor_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_name"
                  value={currentDonor.donor_name}
                  onChange={this.onChangeDonor_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donor_contact">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="donor_contact"
                  value={currentDonor.donor_contact}
                  onChange={this.onChangeDonor_contact}
                />
              </div>


              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteDonor}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateDonor}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Donor</p>
          </div>
        )}
      </div>
    );
  }

  }
