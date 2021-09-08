import "./App.css";
import UserInputs from "./userInputs";
import Tasks from "./tasks";
import React, { Component } from "react";
import Info from "./info";
import SortBtns from "./sortBtns";
class App extends Component {
  constructor(props) {
    super(props);
    this.counter = 9;
    this.state = {
      tasks: [],
      pastTasks: [],
      clickImportant: false,
      currentSort: "wszystko",
    };
  }
  handleButtonClick = (name, date, category, important, description) => {
    const task = {
      id: this.counter++,
      name,
      date,
      category,
      important,
      description,
    };
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };
  componentDidMount() {
    fetch("./initialTasks.json")
      .then((response) => response.json())
      .then((tasks) => this.setState({ tasks }));
  }
  removeTask = (name, prev) => {
    let tasks;
    if (prev) {
      tasks = this.state.pastTasks;
    } else {
      tasks = this.state.tasks;
    }
    const index = tasks.findIndex((el) => name === el.name);
    tasks.splice(index, 1);
    if (prev) {
      this.setState({ pastTasks: tasks });
    } else {
      this.setState({ tasks });
    }
  };
  taskFinished = (task) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((el) => task.name === el.name);
    const pastTask = tasks.splice(index, 1);
    let today = new Date().toLocaleString();
    today = `${today.slice(0, 2)}-${today.slice(3, 5)}-${today.slice(
      6,
      8
    )} ${today.slice(11, 17)}`;
    pastTask[0].finishDate = today;
    const pastTasks = [...pastTask, ...this.state.pastTasks];
    this.setState({ tasks, pastTasks });
  };
  handleClickImportant = (e) => {
    this.setState({ clickImportant: !this.state.clickImportant });
    e.target.classList.toggle("clicked");
  };
  handleMenuClick(currentSort, e) {
    document
      .querySelectorAll(".menuSort div")
      .forEach((tab) => tab.classList.remove("clicked"));
    e.classList.add("clicked");
    this.setState({ currentSort });
  }
  render() {
    return (
      <div className="wrapper">
        <SortBtns
          clickImportant={this.handleClickImportant.bind(this)}
          clickMenu={this.handleMenuClick.bind(this)}
        />
        <Info />
        <UserInputs
          tasks={this.state.tasks}
          click={this.handleButtonClick.bind(this)}
        />
        <Tasks
          important={this.state.clickImportant}
          currentSort={this.state.currentSort}
          tasks={this.state.tasks}
          pastTasks={this.state.pastTasks}
          clickRemove={this.removeTask.bind(this)}
          clickFinished={this.taskFinished.bind(this)}
        />
      </div>
    );
  }
}

export default App;
