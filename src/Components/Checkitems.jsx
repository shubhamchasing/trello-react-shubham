import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

import * as TrelloApi from "./Api";

class Checkitems extends Component {
  state = { checkitems: [], checkitemName: "" };

  checklistId = this.props.checklistId;
  cardId = this.props.cardId;

  componentDidMount() {
    TrelloApi.getCheckitems(this.checklistId).then((data) => {
      this.setState({ checkitems: data });
    });
  }

  handleChange(e) {
    this.setState({
      checkitemName: e.target.value,
    });
  }

  handleAddCheckitem = () => {
    let checkitemName = this.state.checkitemName;
    if (checkitemName) {
      TrelloApi.addCheckitem(checkitemName, this.checklistId).then((data) => {
        this.setState({
          checkitemName: "",
          checkitems: [data, ...this.state.checkitems],
        });
      });
    }
  };

  handleDeleteCheckitem = (e) => {
    let checkitemId = e.target.value;
    TrelloApi.deleteCheckitem(this.checklistId, checkitemId).then(() => {
      let filteredCheckitems = this.state.checkitems.filter((checkitem) => {
        if (checkitemId !== checkitem.id) {
          return true;
        }
      });
      this.setState({ checkitems: filteredCheckitems });
    });
  };

  handleUpdateCheckitem = (e) => {
    let checkitemId = e.target.value;
    let state = e.target.checked === true ? "complete" : "incomplete";
    TrelloApi.updateCheckitem(this.cardId, checkitemId, state).then((data) => {
      console.log(data);
      let filteredCheckitems = this.state.checkitems.filter((checkitem) => {
        if (checkitemId !== checkitem.id) {
          return true;
        }
      });
      this.setState({ checkitems: [data, ...filteredCheckitems] });
    });
  };

  render() {
    return (
      <Form>
        <InputGroup className="mb-1">
          <Form.Control
            placeholder="Add an item"
            aria-label="Add an item"
            aria-describedby="basic-addon2"
            onChange={(e) => this.handleChange(e)}
            value={this.state.checkitemName}
            required
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            type="button"
            onClick={this.handleAddCheckitem}
          >
            Add item
          </Button>
        </InputGroup>

        {this.state.checkitems.length > 0 &&
          this.state.checkitems.map((checkitem) => {
            let status = checkitem.state === "complete" ? true : false;
            return (
              <Form.Group
                className="mb-3 item-container"
                controlId="formBasicCheckbox"
                key={checkitem.id}
              >
                <Form.Check
                  type="checkbox"
                  label={checkitem.name}
                  checked={status}
                  value={checkitem.id}
                  onChange={(e) => this.handleUpdateCheckitem(e)}
                />
                <Button
                  variant="outline-danger"
                  id="button-addon2"
                  type="button"
                  value={checkitem.id}
                  onClick={(e) => this.handleDeleteCheckitem(e)}
                  size="sm"
                >
                  Delete
                </Button>
              </Form.Group>
            );
          })}
      </Form>
    );
  }
}

export default Checkitems;
