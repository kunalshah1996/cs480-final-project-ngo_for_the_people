import React, { Component } from "react";
import '../campaign.css';
import CampaignDataService from "../services/campaign.service";
import '../campaign.css';

export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.onChangeCampaign_name = this.onChangeCampaign_name.bind(this);
    this.onChangeCampaign_details = this.onChangeCampaign_details.bind(this);
    this.onChangeCampaign_location = this.onChangeCampaign_location.bind(this);
    this.onChangeCampaign_employee_id = this.onChangeCampaign_employee_id.bind(this);
    this.onChangeCampaign_budget = this.onChangeCampaign_budget.bind(this);
    this.getCampaign = this.getCampaign.bind(this);
    this.updateCampaign = this.updateCampaign.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);

    this.state = {
      currentCampaign: {
        campaign_id: "",
        campaign_name: "",
        campaign_details: "",
        campaign_location: "",
        campaign_employee_id: "",
        campaign_budget: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCampaign(this.props.match.params.id);
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeCampaign_name(e) {
    const campaign_name = e.target.value;
    
    this.setState(prevState => ({
      currentCampaign: {
        ...prevState.currentCampaign,
        campaign_name: campaign_name
      }
    }));
  }

  onChangeCampaign_details(e) {
    const campaign_details = e.target.value;
    
    this.setState(prevState => ({
      currentCampaign: {
        ...prevState.currentCampaign,
        campaign_details: campaign_details
      }
    }));
  }

  onChangeCampaign_location(e) {
    const campaign_location = e.target.value;
    
    this.setState(prevState => ({
      currentCampaign: {
        ...prevState.currentCampaign,
        campaign_location: campaign_location
      }
    }));
  }

  onChangeCampaign_employee_id(e) {
    const campaign_employee_id = e.target.value;
    
    this.setState(prevState => ({
      currentCampaign: {
        ...prevState.currentCampaign,
        campaign_employee_id: campaign_employee_id
      }
    }));
  }

  onChangeCampaign_budget(e) {
    const campaign_budget = e.target.value;
    
    this.setState(prevState => ({
      currentCampaign: {
        ...prevState.currentCampaign,
        campaign_budget: campaign_budget
      }
    }));
  }


  getCampaign(id) {
    CampaignDataService.get(id)
      .then(response => {
        this.setState({
          currentCampaign: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateCampaign() {
    CampaignDataService.update(
      this.state.currentCampaign.campaign_id,
      this.state.currentCampaign
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Campaign was updated successfully!"
        });
        alert("Updated successfully")
        window.location.href = '/campaigns'
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteCampaign() {    
      console.log(this.state.currentCampaign.campaign_id)
    CampaignDataService.delete(this.state.currentCampaign.campaign_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/campaigns')
        alert("Deleted successfully");
        window.location.href = '/campaigns'
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentCampaign } = this.state;
    const CampaignStyle = {
      width:'40em',
      height:'2.25em',
      textAlign:'center',
      paddingTop: '0.75em',
      display:'inline-block',
      marginRight: '0.5em',
      marginTop: '1em',
      fontWeight: 'bold',
      fontSize: '1.5em'
    }

    return (

      <body>
      <div style={CampaignStyle}>
        {currentCampaign ? (
          <div className="edit-form">
            <h4>Campaign</h4>
            <form>
              <div className="form-group" >
                <label htmlFor="campaign_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_id"
                  value={currentCampaign.campaign_id}
                  onChange={this.onChangeCampaign_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_name"
                  value={currentCampaign.campaign_name}
                  onChange={this.onChangeCampaign_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign_details">Details</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_details"
                  value={currentCampaign.campaign_details}
                  onChange={this.onChangeCampaign_details}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign_location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_location"
                  value={currentCampaign.campaign_location}
                  onChange={this.onChangeCampaign_location}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign_employee_id">Employee Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_employee_id"
                  value={currentCampaign.campaign_employee_id}
                  onChange={this.onChangeCampaign_employee_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign_budget">Budget</label>
                <input
                  type="text"
                  className="form-control"
                  id="campaign_budget"
                  value={currentCampaign.campaign_budget}
                  onChange={this.onChangeCampaign_budget}
                />
              </div>

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteCampaign}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateCampaign}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Campaign!</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }