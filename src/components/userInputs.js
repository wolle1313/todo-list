import React, { Component } from "react";
import ErrorName, { ErrorDate } from "./errors";
class UserInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      description: "",
      category: "osobiste",
      important: false,
      errors: {
        name: {
          length: true,
          repeat: true,
        },
        date: {
          choosen: true,
          format: true,
          past: true,
        },
      },
    };
  }
  taskValidation(inpName, inpDate, tasks) {
    let name = {
      length: false,
      repeat: false,
    };
    let date = {
      format: false,
      length: false,
      past: false,
    };
    let correct = false;
    if (inpName.length > 2) {
      name.length = true;
      if (tasks.findIndex((el) => el.name === inpName) === -1) {
        name.repeat = true;
      }
    }
    const dateNumber = new Date(inpDate).getTime();
    if (parseInt(dateNumber)) {
      date.choosen = true;
      if (inpDate.length === 16) {
        date.format = true;
        const currDate = new Date().getTime();
        console.log(`${dateNumber} - ${currDate}`);
        if (parseInt(dateNumber) > parseInt(currDate)) {
          date.past = true;
        }
      }
    }
    if (
      date.past === true &&
      date.format === true &&
      date.choosen === true &&
      name.repeat === true &&
      name.length === true
    ) {
      correct = true;
    }
    return {
      name,
      date,
      correct,
    };
  }
  handleNameInput = (e) => {
    if (e.target.value.length < 50) {
      this.setState({ name: e.target.value });
    }
  };
  handleDateInput = (e) => {
    this.setState({ date: e.target.value });
  };
  handleCheckboxChange = () => {
    this.setState({ important: !this.state.important });
  };
  handleDescInput = (e) => {
    if (e.target.value.length < 100) {
      this.setState({ description: e.target.value });
    }
  };
  handleSelectChange = (e) => {
    this.setState({ category: e.target.value });
  };
  handleBtnAdd = () => {
    const { name, date, category, important, description } = this.state;
    const validation = this.taskValidation(name, date, this.props.tasks);
    if (validation.correct) {
      this.props.click(name, date, category, important, description);
      this.setState({
        name: "",
        date: "",
        description: "",
        category: "osobiste",
        important: false,
      });
    }
    this.setState({
      errors: {
        name: validation.name,
        date: validation.date,
      },
    });
  };
  render() {
    return (
      <div className="inputs">
        <div id="nameInput">
          <label htmlFor="nameTask">Nazwa zadania</label>
          <input
            type="text"
            id="nameTask"
            value={this.state.name}
            onInput={this.handleNameInput}
          />
          <ErrorName error={this.state.errors.name} />
        </div>
        <div id="descriptionInput">
          <label htmlFor="descTask">Opis (opcjonalny)</label>
          <textarea
            type="text"
            id="descTask"
            value={this.state.description}
            onInput={this.handleDescInput}
          />
        </div>
        <div id="selectTask">
          <label htmlFor="selectTask">Kategoria</label>
          <div>
            <select
              id="selectTask"
              value={this.state.category}
              onChange={this.handleSelectChange}
            >
              <option value="osobiste">osobiste</option>
              <option value="praca">praca</option>
              <option value="dom">dom</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="dateTask">Data</label>
          <input
            type="datetime-local"
            id="dateTask"
            value={this.state.date}
            onInput={this.handleDateInput}
          />
          <ErrorDate error={this.state.errors.date} />
        </div>
        <div id="checkPrio">
          <input
            id="prioBox"
            type="checkbox"
            checked={this.state.important}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="prioBox">Priorytet</label>
        </div>
        <button onClick={this.handleBtnAdd}>DODAJ ZADANIE</button>
      </div>
    );
  }
}

export default UserInputs;
