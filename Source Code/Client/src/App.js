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
import Fund from "./components/fund.component";
import AddFund from "./components/add-fund.component";
import FundsList from "./components/fund-list.component";
import Queries from "./components/queries.component";
import Employees_education from "./components/employees_education.component";
import Free_employees from "./components/free_employee.component";
import Incomplete_donation from "./components/incomplete_donation.component";
import Donation_quantity from "./components/donation_quantity.component";
import Budget_city from "./components/budget_city.component";
import Allocated_funds from "./components/allocated_funds.component"
import Active_causes from "./components/active_causes.component"
import Budget_online from "./components/budget_online.component.js"
import Designation_pr from "./components/designation_pr.component.js";
import Trim_ename from "./components/trim_ename.component.js";

import Count_donation from "./components/count_donation.component.js";
import Joining_period from "./components/joining_period.component.js";
import ngo_image from "./logongo.jpg";
import Contact from "./Contact";
import About from "./About";
import Users from "./components/display_users.component";
import Register from "./components/register-user.component";


import 'bootstrap';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/js/dist/dropdown';



class App extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.clear();
    window.location.href='/login'
   }
  
  render() {
    return (
      
      <div id = "main">
   
        <nav className="navbar navbar-expand navbar-dark bg-dark" id  = "logo" >
          <div style={{marginLeft:10 }}>
           <a><img  src={ngo_image} style={{width:30}}/></a>
          </div>
          <Link to={"/"} className="navbar-brand" style={{marginLeft:10 }}>
                NGO FOR THE PEOPLE
          </Link>
          
          
          <div className="navbar-nav mr-auto">
          {/* <div id = "crud"  >
            <UncontrolledDropdown>
        <DropdownToggle caret>
          CRUD Entities
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem tag ={Link} to={"/campaigns"}>Campaigns</DropdownItem>
                  <DropdownItem tag = {Link} to={"/causes"}>Cause</DropdownItem>
                  <DropdownItem tag = {Link} to={"/donations"}>Donation</DropdownItem>
                  <DropdownItem tag = {Link} to={"/donors"}>Donor</DropdownItem>
                  <DropdownItem tag = {Link} to={"/Funds"}>Fund</DropdownItem>
                  <DropdownItem tag = {Link} to={"/educations"}>Education</DropdownItem>
                  <DropdownItem tag = {Link} to={"/employees"}>Employees</DropdownItem>
                  <DropdownItem tag = {Link} to={"/healths"}>Health</DropdownItem>
                  <DropdownItem tag = {Link} to={"/items"}>Items</DropdownItem>
                  <DropdownItem tag = {Link} to={"/receivers"}>Receivers</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      </div> */}
            <li className="nav-item">{ !sessionStorage.getItem("login") &&
            <Link to={"/login"} className="nav-link">
                Login
            </Link>
            
            }</li>
            <div>{sessionStorage.getItem("login") &&
            <div>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
            <li className="nav-item">
            <Link to={"/contact"} className="nav-link">
                Contact us
            </Link>
            
            </li>
            <li className="nav-item">
            <Link to={"/about"} className="nav-link">
                About us
            </Link>
            
            </li>
            <li className="nav-item">
            <Link to={"/users"} className="nav-link">
                Users
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
            <li className="nav-item">
              <Link to={"/funds"} className="nav-link">
                Fund
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/queries"} className="nav-link">
              Functions and Queries
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" onClick={this.logout}>
                Logout
          </Link>
          
            </li> 
            </nav></div>
            }    </div>
            
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
            <Route exact path="/funds" component={FundsList} />
            <Route exact path="/addfund" component={AddFund} />
            <Route path="/funds/:id" component={Fund} />
            <Route exact path="/queries" component={Queries} />
            <Route exact path="/employees_education" component={Employees_education} />
            <Route exact path="/free_employees" component={Free_employees} />
            <Route exact path="/incomplete_donation" component={Incomplete_donation} />
            <Route exact path="/donation_quantity" component={Donation_quantity} />
            <Route exact path="/budget_city" component={Budget_city} />
            <Route exact path="/allocated_funds" component={Allocated_funds} />
            <Route exact path="/active_causes" component={Active_causes} />
            <Route exact path="/budget_online" component={Budget_online} />
            <Route exact path="/designation_pr" component={Designation_pr} />
            <Route exact path="/trim_ename" component={Trim_ename} />
            <Route exact path="/count_donation" component={Count_donation} />
            <Route exact path="/joining_period" component={Joining_period} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/register_user" component={Register} />



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;