import React, { Component } from "react";
import CampaignDataService from "../services/campaign.service";
import '../campaign.css';

export default class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.onChangeCampaign_id = this.onChangeCampaign_id.bind(this);
    this.onChangeCampaign_name = this.onChangeCampaign_name.bind(this);
    this.onChangeCampaign_details = this.onChangeCampaign_details.bind(this);
    this.onChangeCampaign_location = this.onChangeCampaign_location.bind(this);
    this.onChangeCampaign_employee_id = this.onChangeCampaign_employee_id.bind(this);
    this.onChangeCampaign_budget = this.onChangeCampaign_budget.bind(this);
    //this.onChangeCampaign_availability = this.onChangeCampaign_availability.bind(this);
    this.saveCampaign = this.saveCampaign.bind(this);
    this.newCampaign = this.newCampaign.bind(this);

    this.state = {
      id: null,
      campaign_id:"",
      campaign_name:"",
      campaign_details: "",
      campaign_location:"",
      campaign_employee_id:"",
      campaign_budget:"",
      submitted: false
    };
  }

  componentDidMount = () => {
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeCampaign_id(e) {
    this.setState({
      campaign_id: e.target.value
    });
  }

  onChangeCampaign_name(e) {
    this.setState({
      campaign_name: e.target.value
    });
  }

  onChangeCampaign_details(e) {
    this.setState({
      campaign_details: e.target.value
    });
  }

  onChangeCampaign_location(e) {
    this.setState({
      campaign_location: e.target.value
    });
  }

  onChangeCampaign_employee_id(e) {
    this.setState({
      campaign_employee_id: e.target.value
    });
  }

  onChangeCampaign_budget(e) {
    this.setState({
      campaign_budget: e.target.value
    });
  }

  // onChangeCampaign_availability(e) {
  //   this.setState({
  //     campaign_availability: e.target.value
  //   });
  // }

  saveCampaign() {
    var data = {
      campaign_id: this.state.campaign_id,
      campaign_name: this.state.campaign_name,
      campaign_details: this.state.campaign_details,
      campaign_location: this.state.campaign_location,
      campaign_employee_id: this.state.campaign_employee_id,
      campaign_budget: this.state.campaign_budget,
      //campaign_availability: this.state.campaign_availability
    };

    CampaignDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          campaign_id: response.data.campaign_id,
          campaign_name: response.data.campaign_name,
          campaign_details: response.data.campaign_details,
          campaign_location: response.data.campaign_location,
          campaign_employee_id: response.data.campaign_employee_id,
          campaign_budget: response.data.campaign_budget,
          //campaign_availability: response.data.campaign_availability,
          submitted: true
        });
        alert("submitted successfully")
      })
      .catch(e => {
        alert(e);
        console.log(e);
      });
  }

  newCampaign() {
    this.setState({
      id: null,
      campaign_id: "",
      campaign_name: "",
      campaign_details: "",
      campaign_location:"",
      campaign_employee_id:"",
      campaign_budget:"",
      //campaign_availability:"",
      submitted: false
    });
  }

  render() {
    return (
        <body id = "bg" >
          

        <div className="submit-form" id = "second">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={window.location.href = '/campaigns'}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" id = "form">
                <label htmlFor="title">Campaign ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_id"
                  required
                  value={this.state.campaign_id}
                  onChange={this.onChangeCampaign_id}
                  name="campaign_id"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Campaign Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_name"
                  required
                  value={this.state.campaign_name}
                  onChange={this.onChangeCampaign_name}
                  name="campaign_name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Campaign Details</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_details"
                  required
                  value={this.state.campaign_details}
                  onChange={this.onChangeCampaign_details}
                  name="campaign_details"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Campaign Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_location"
                  required
                  value={this.state.campaign_location}
                  onChange={this.onChangeCampaign_location}
                  name="campaign_location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_employee_id"
                  required
                  value={this.state.campaign_employee_id}
                  onChange={this.onChangeCampaign_employee_id}
                  name="campaign_employee_id"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Campaign Budget</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_budget"
                  required
                  value={this.state.campaign_budget}
                  onChange={this.onChangeCampaign_budget}
                  name="campaign_budget"
                />
              </div>

  
              <button onClick={this.saveCampaign} className="mt-3 btn btn-success" id = "button">
                Submit
              </button>
            </div>
          )}
        </div>
        </body>
          
      );
  }
}