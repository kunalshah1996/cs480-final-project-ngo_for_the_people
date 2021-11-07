import React, { Component } from "react";
import CampaignDataService from "../services/campaign.service";
import { Link } from "react-router-dom";
import '../campaign.css';
// export default CampaignList;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCampaign_id = this.onChangeSearchCampaign_id.bind(this);
    this.retrieveCampaigns = this.retrieveCampaigns.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCampaign = this.setActiveCampaign.bind(this);
    this.removeAllCampaigns = this.removeAllCampaigns.bind(this);
    this.searchCampaign_id = this.searchCampaign_id.bind(this);

    this.state = {
      campaignss: [],
      currentCampaign: null,
      currentIndex: -1,
      searchCampaign: ""
    };
  }

  componentDidMount() {
    this.retrieveCampaigns();
    if(!sessionStorage.getItem("login")) {
      window.location = "/login"
    }
  }

  onChangeSearchCampaign_id(e) {
    const searchCampaign_id = e.target.value;

    this.setState({
      searchCampaign_id: searchCampaign_id
    });
  }

  retrieveCampaigns() {
    CampaignDataService.getAll()
      .then(response => {
        this.setState({
          campaigns: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCampaigns();
    this.setState({
      currentCampaign: null,
      currentIndex: -1
    });
  }

  setActiveCampaign(campaign, index) {
    this.setState({
      currentCampaign: campaign,
      currentIndex: index
    });
  }

  removeAllCampaigns() {
    CampaignDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCampaign_id() {
    CampaignDataService.findById(this.state.searchCampaign_id)
      .then(response => {
        this.setState({
          campaigns: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  addCampaign() {
    window.location="/addcampaign"
  }

  render() {
    const { searchCampaign_id, campaigns, currentCampaign, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by campaign_id"
              value={searchCampaign_id}
              onChange={this.onChangeSearchCampaign_id}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCampaign_id}
              >
                Search
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addCampaign}
              >
              Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6">
          <h4>Campaigns List</h4>

          <ul className="list-group">
            {campaigns &&
              campaigns.map((campaign, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCampaign(campaign, index)}
                  key={index}
                >
                  {campaign.campaign_id}
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
          {currentCampaign ? (
            <div>
              <h4>Campaign</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentCampaign.campaign_id}
              </div>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCampaign.campaign_name}
              </div>
              <div>
                <label>
                  <strong>Details:</strong>
                </label>{" "}
                {currentCampaign.campaign_details}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentCampaign.campaign_location}
              </div>
              <div>
                <label>
                  <strong>Employee id:</strong>
                </label>{" "}
                {currentCampaign.campaign_employee_id}
              </div>
              <div>
                <label>
                  <strong>Budget:</strong>
                </label>{" "}
                {currentCampaign.campaign_budget}
              </div>

              <Link
                to={"/campaigns/" + currentCampaign.campaign_id}
                className="text text-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Campaign</p>
            </div>
          )}
        </div>
      </div>
    );
    }
}