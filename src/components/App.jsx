import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: "",
    };
  }

  addReminder = () => {
    if (!this.state.text) {
      alert("Please insert your reminder");
    } else {
      if (!this.state.dueDate) {
        this.setState({
          dueDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        });
      }
      this.props.addReminder(this.state.text, this.state.dueDate);

      let className = document.getElementsByClassName("inputForm");
      for (var i = 0, ilen = className.length - 1; i < ilen; i++) {
        className[i].value = "";
      }
      this.setState({ text: "", dueDate: "" });
    }
  };

  deleteReminder = (id) => {
    this.props.deleteReminder(id);
  };

  renderReminder = () => {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>
              <div
                className="list-item delete-btn"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <div className="app">
        <div className="title">Reminder</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control inputForm"
              placeholder="I have to ..."
              onChange={(event) => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control inputForm"
              type="datetime-local"
              onChange={(event) =>
                this.setState({ dueDate: event.target.value })
              }
            />
            <button className="btn btn-success" onClick={this.addReminder}>
              Add Reminder
            </button>
          </div>
        </div>
        {this.renderReminder()}
        <div
          className="btn btn-danger mt-5"
          onClick={() => this.props.clearReminders()}
        >
          Clear Reminders
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state,
  };
}

export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders,
})(App);
