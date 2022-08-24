import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";


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
    let checkitemId = e.currentTarget.value;
    TrelloApi.deleteCheckitem(this.checklistId, checkitemId).then(() => {
      let filteredCheckitems = this.state.checkitems.filter((checkitem) => {
        if (checkitemId !== checkitem.id) {
          return true;
        }
        else{
          return false;
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
        else{
          return false;
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
            style={{fontSize:"0.7rem"}}

          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            type="button"
            onClick={this.handleAddCheckitem}
            style={{fontSize:"0.7rem"}}
            size="sm"
          >
            Add item
          </Button>
        </InputGroup>

        {this.state.checkitems.length > 0 &&
          this.state.checkitems.map((checkitem) => {
            let status = checkitem.state === "complete" ? true : false;
            return (
              <>
              <Form.Group
                className="mb-3 item-container"
                controlId="formBasicCheckbox"
                key={checkitem.id}
                style={{display:"flex" , alignItems:"center", justifyContent:"space-between"}}

              >
                <Form.Check
                  type="checkbox"
                  label={checkitem.name}
                  checked={status}
                  value={checkitem.id}
                  onChange={(e) => this.handleUpdateCheckitem(e)}
                />
                <button
                  type="button"
                  value={checkitem.id}
                  onClick={(e) => this.handleDeleteCheckitem(e)}
                  style={{ border: "none", backgroundColor: "transparent" }}

                >
                  <TiDeleteOutline color="red"/>
                </button>
              </Form.Group>
              <hr/>
              </>
            );
          })}
      </Form>
    );
  }
}

export default Checkitems;
