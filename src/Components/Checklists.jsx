import React, { Component } from "react";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";

import * as TrelloApi from "./Api";

class Checklists extends Component {
  state = { modal: false, checklists: [], checklistName: "" };

  cardId = this.props.card.id;
  cardName = this.props.card.name;
  componentDidMount() {
    TrelloApi.getChecklists(this.cardId).then((data) =>
      this.setState({ checklists: data })
    );
  }

  handleViewCard = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange = (e) => {
    this.setState({
      checklistName: e.target.value,
    });
  };

  handleAddChecklist = () => {
    let checklistName = this.state.checklistName;
    if (checklistName) {
      TrelloApi.addChecklist(checklistName, this.cardId).then((data) => {
        this.setState({
          checklistName: "",
          checklists: [data, ...this.state.checklists],
        });
      });
    }
  };

  handleDeleteChecklist = (e) => {
    let checklistId = e.target.value;
    TrelloApi.deleteChecklist(checklistId).then(() => {
      let filteredChecklists = this.state.checklists.filter((checklist) => {
        if (checklistId !== checklist.id) {
          return true;
        }
      });
      this.setState({ checklists: filteredChecklists });
    });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleViewCard}>
          View Card
        </Button>

        <Modal show={this.state.modal} onHide={this.handleModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.cardName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="Add new checklist"
                aria-label="Add new checklist"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
                value={this.state.checklistName}
                required
              />
              <Button
                variant="primary"
                id="button-addon2"
                type="button"
                onClick={this.handleAddChecklist}
              >
                Add checklist
              </Button>
            </InputGroup>
            {this.state.checklists.map((checklist) => {
              return (
                <Card key={checklist.id}>
                  <Card.Header className="card-header">
                    {checklist.name}
                    <Button
                      variant="danger"
                      type="button"
                      value={checklist.id}
                      onClick={(e) => this.handleDeleteChecklist(e)}
                    >
                      Delete
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Button variant="primary">Add Checkitems</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Checklists;

/* 
<div key={checklist.id}>
<h5>{checklist.name}</h5>
<Button variant="secondary" id="button-addon2">Delete</Button>
</div> */
