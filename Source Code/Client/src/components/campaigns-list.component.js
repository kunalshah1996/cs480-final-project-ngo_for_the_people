import React, { Component } from "react";
import CampaignDataService from "../services/campaign.service";
import { Link } from "react-router-dom";
import '../campaign.css';
//export default CampaignList;

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
      campaigns: [],
      currentCampaign: null,
      currentIndex: -1,
      searchCampaign_id: ""
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
    console.log("on button click")
    CampaignDataService.findById(this.state.searchCampaign_id)
      .then(response => {
        this.setState({
          campaigns: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }
  addCampaign() {
    window.location="/addcampaign"
  }

  render() {
    const { searchCampaign_id, campaigns, currentCampaign, currentIndex } = this.state;

    return (
      <body id = "bg">
      <div className="list row" id = "first">
        <div className="col-md-8" id = "third" >
          <div className="input-group mb-3" id = "search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by the ID of the campaign"
              id = "fourth"
              value={searchCampaign_id}
              onChange={this.onChangeSearchCampaign_id}
            />
            <div className="input-group-append" >
              <button
                className="btn btn-outline-secondary"
                type="button"
                id = "search_btn"
                onClick={this.searchCampaign_id}
              >
                SEARCH
              </button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id="add_btn"
                type="button"
                onClick={this.addCampaign}
              >
              ADD
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6" id = "campaign1">
          <h4>List of campaigns</h4>

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
      </body>
    );
    }
}