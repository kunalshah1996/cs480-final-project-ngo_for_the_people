import React, { Component } from "react";
import CauseDataService from "../services/cause.service";

export default class Cause extends Component {
  constructor(props) {
    super(props);
    //this.onChangeEmployee_id = this.onChangeEmployee_id.bind(this);
    this.onChangeCause_type = this.onChangeCause_type.bind(this);
    this.onChangeCause_status = this.onChangeCause_status.bind(this);
    this.onChangeApprover_id = this.onChangeApprover_id.bind(this);
    
    this.getCause = this.getCause.bind(this);
    this.updateCause = this.updateCause.bind(this);
    this.deleteCause= this.deleteCause.bind(this);

    this.state = {
      currentCause: {
        cause_id: "",
        cause_type: "",
        cause_status: "",
        approver_id: "",
        
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCause(this.props.match.params.id);
  }

  onChangeCause_type(e) {
    const cause_type = e.target.value;
    
    this.setState(prevState => ({
      currentCause: {
        ...prevState.currentCause,
        cause_type: cause_type
      }
    }));
  }

  onChangeCause_status(e) {
    const cause_status = e.target.value;
    
    this.setState(prevState => ({
      currentCause: {
        ...prevState.currentCause,
        cause_status: cause_status
      }
    }));
  }

  onChangeApprover_id(e) {
    const approver_id= e.target.value;
    
    this.setState(prevState => ({
      currentCause: {
        ...prevState.currentCause,
        approver_id: approver_id
      }
    }));
  }

  

  getCause(id) {
    console.log("get cause",id)
    CauseDataService.get(id)
      .then(response => {
        this.setState({
          currentCause: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        alert(e);
      });
  }


  updateCause() {
    CauseDataService.update(
      this.state.currentCause.cause_id,
      this.state.currentCause
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Cause was updated successfully!"
        });
      })
      .catch(e => {
        alert(e);
      });
  }

  deleteCause() {    
      console.log(this.state.currentCause.cause_id)
    CauseDataService.delete(this.state.currentCause.cause_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/causes')
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    const { currentCause } = this.state;

    return (
      <body id ="bg">
      <div>
        {currentCause ? (
          <div className="edit-form" id ="fifth">
            <h4 id ="fontc">Cause</h4>
            <form>
              <div className="form-group">
                <label htmlFor="cause_id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_id"
                  value={currentCause.cause_id}
                  onChange={this.onChangeCause_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cause_type">Type of the cause</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_type"
                  value={currentCause.cause_type}
                  onChange={this.onChangeCause_type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cause_status">status</label>
                <input
                  type="text"
                  className="form-control"
                  id="cause_status"
                  value={currentCause.cause_status}
                  onChange={this.onChangeCause_status}
                />
              </div>
              <div className="form-group">
                <label htmlFor="approver_id">Approver ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="approver_id"
                  value={currentCause.approver_id}
                  onChange={this.onChangeApprover_id}
                  />
                  </div>
                
             

              
            </form>

            <button
              className="btn btn-danger m-3"
              onClick={this.deleteCause}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-warning m-3" 
              onClick={this.updateCause}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Cause</p>
          </div>
        )}
      </div>
      </body>
    );
  }

  }
