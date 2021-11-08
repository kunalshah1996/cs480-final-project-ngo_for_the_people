import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import AddEmployee from "./components/add-employee.component";
import EmployeesList from "./components/employees-list.component";
import Employee from "./components/employee.component";
import Home from "./components/home.component";
import Login from "./components/Login.component"
import AddCampaign from "./components/add-campaign.component";
import CampaignsList from "./components/campaigns-list.component";
import Campaign from "./components/campaign.component";
import AddReceiver from "./components/add-receiver.component";
import ReceiversList from "./components/receivers-list.component";
import Receiver from "./components/receiver.component";
import AddItem from "./components/add-item.component";
import ItemsList from "./components/items-list.component";
import Item from "./components/item.component";
import AddDonor from "./components/add-donor.component";
import DonorsList from "./components/donors-list.component";
import Donor from "./components/donor.component";
import AddCause from "./components/add-cause.component";
import CausesList from "./components/causes-list.component";
import Cause from "./components/cause.component";
import AddEducation from "./components/add-education.component";
import EducationList from "./components/educations-list.component";
import Education from "./components/education.component";
import addHealth from "./components/add-health.component";
import HealthList from "./components/health-list.component";
import Health from "./components/health.component";
import AddDonation from "./components/add-donation.component";
import Donation from "./components/donation.component";
import DonationsList from "./components/donation-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
                NGO FOR THE PEOPLE
          </Link>
          
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to={"/login"} className="nav-link">
                Login
          </Link>
            </li>
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/campaigns"} className="nav-link">
                Campaigns
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/receivers"} className="nav-link">
                Receivers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/donors"} className="nav-link">
                Donor
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/causes"} className="nav-link">
                Cause
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/educations"} className="nav-link">
                Education
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/healths"} className="nav-link">
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/donations"} className="nav-link">
                Donation
              </Link>
            </li>
            <li>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/employees" component={EmployeesList} />
            <Route exact path="/addemployee" component={AddEmployee} />
            <Route path="/employees/:id" component={Employee} />
            <Route exact path="/campaigns" component={CampaignsList} />
            <Route exact path="/addcampaign" component={AddCampaign} />
            <Route path="/campaigns/:id" component={Campaign} />
            <Route exact path="/receivers" component={ReceiversList} />
            <Route exact path="/addreceiver" component={AddReceiver} />
            <Route path="/receivers/:id" component={Receiver} />
            <Route exact path="/items" component={ItemsList} />
            <Route exact path="/additem" component={AddItem} />
            <Route path="/items/:id" component={Item} />
            <Route exact path="/donors" component={DonorsList} />
            <Route exact path="/adddonor" component={AddDonor} />
            <Route path="/donors/:id" component={Donor} />
            <Route exact path="/causes" component={CausesList} />
            <Route exact path="/addcause" component={AddCause} />
            <Route path="/causes/:id" component={Cause} />
            <Route exact path="/educations" component={EducationList} />
            <Route exact path="/addeducation" component={AddEducation} />
            <Route path="/educations/:id" component={Education} />
            <Route exact path="/healths" component={HealthList} />
            <Route exact path="/addhealth" component={addHealth} />
            <Route path="/healths/:id" component={Health} />
            <Route exact path="/donations" component={DonationsList} />
            <Route exact path="/adddonation" component={AddDonation} />
            <Route path="/donations/:id" component={Donation} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;