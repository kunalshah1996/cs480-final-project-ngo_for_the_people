import React, { Component } from "react";
import DonationsDataService from "../services/donation.service";
import '../donation.css';
export default class Donation extends Component {
  constructor(props) {
    super(props);
    //this.onChangeDonation_id = this.onChangeDonation_id.bind(this);
    this.onChangeDonation_Donor_id = this.onChangeDonation_Donor_id.bind(this);
    this.onChangeDonation_type = this.onChangeDonation_type.bind(this);
    this.onChangeDonation_status = this.onChangeDonation_status.bind(this);
    this.getDonation = this.getDonation.bind(this);
    this.updateDonation = this.updateDonation.bind(this);
    this.deleteDonation = this.deleteDonation.bind(this);

    this.state = {
      currentDonation: {
        donation_id: "",
        donation_donor_id: "",
        donation_type: "",
        donation_status: "",

      },
      message: ""

    };
  }

  componentDidMount() {
    this.getDonation(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }



  onChangeDonation_Donor_id(e) {
    const donation_donor_id = e.target.value;
    
    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        donation_donor_id: donation_donor_id
      }
    }));
  }

  onChangeDonation_type(e) {
    const donation_type = e.target.value;
    
    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        donation_type: donation_type
      }
    }));
  }

  onChangeDonation_status(e) {
    const donation_status = e.target.value;
    
    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        donation_status: donation_status
      }
    }));
  }

 

  getDonation(id) {
    DonationsDataService.get(id)
      .then(response => {
        this.setState({
          currentDonation: response.data
        });
        console.log(this.state.currentDonation)
      })
      .catch(e => {
        alert(e);
      });
  }


  updateDonation() {
    DonationsDataService.update(
      this.state.currentDonation.donation_id,
      this.state.currentDonation
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Donation was updated successfully!"
        });
        alert("Updated successfully");
        window.location.href = '/donations'
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDonation() {    
      console.log(this.state.currentDonation.donation_id)
    DonationsDataService.delete(this.state.currentDonation.donation_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/donations')
        alert("Deleted successfully");
        window.location.href = '/donations'
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDonation } = this.state;
    console.log("Current donation",currentDonation)
    return (
      <body id = "bg">
      <div>
        {currentDonation ? (
          <div className="edit-form" id = "fifth">
            <h4 id = "fontc">Donation ID</h4>
            <form>
              <div className="form-group">
                <label htmlFor="donation_id">Donation ID : </label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_id"
                  value={currentDonation.donation_id}
                  onChange={this.onChangeDonation_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donation_donor_id">Donor ID :</label>
                <input
                  type="text"
                  className="form-control"
                  id="onation_donor_id"
                  value={currentDonation.donation_donor_id}
                  onChange={this.onChangeDonation_Donor_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donation_type">Donation Type :</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_type"
                  value={currentDonation.donation_type}
                  onChange={this.onChangeDonation_type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="donation_status">Donation status :</label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_status"
                  value={currentDonation.donation_status}
                  onChange={this.onChangeDonation_status}
                />
              </div>


              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteDonation}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateDonation}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Donation</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
