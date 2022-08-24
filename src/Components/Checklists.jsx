import React, { Component } from "react";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";


import * as TrelloApi from "./Api";
import Checkitems from "./Checkitems";

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
    let checklistId = e.currentTarget.value;
    TrelloApi.deleteChecklist(checklistId).then(() => {
      let filteredChecklists = this.state.checklists.filter((checklist) => {
        if (checklistId !== checklist.id) {
          return true;
        }
        else{
          return false;
        }
      });
      this.setState({ checklists: filteredChecklists });
    });
  };

  render() {
    return (
      <>
        <button  onClick={this.handleViewCard}
         style={{fontSize:"0.5rem", fontWeight:"500",backgroundColor:"transparent",border:"none", color:"#6c757d"}} >
          View Card
        </button>

        <Modal show={this.state.modal} onHide={this.handleModal} >
          <Modal.Header closeButton>
            {this.cardName}
          </Modal.Header>

          <Modal.Body> 
            <InputGroup className="mb-4">
              <Form.Control
                placeholder="Add new checklist"
                aria-label="Add new checklist"
                aria-describedby="basic-addon2"
                onChange={(e) => this.handleChange(e)}
                value={this.state.checklistName}
                required
                style={{fontSize:"0.7rem"}}
              />
              <Button
                variant="outline-primary"
                id="button-addon2"
                type="button"
                size="sm"
                onClick={this.handleAddChecklist}
                style={{fontSize:"0.7rem"}}
              >
                Add checklist
              </Button>
            </InputGroup>
            {this.state.checklists.map((checklist) => {
              return (
                <Card key={checklist.id} style={{ margin:"1rem"}} >
                  <Card.Header className="card-header" style={{fontSize:"1rem",display:"flex",alignItems:"center" , justifyContent:"space-between" ,padding:"0.1rem 0.5rem"}}>
                    {checklist.name}
                    <button
                      type="button"
                      value={checklist.id}
                      onClick={(e) => this.handleDeleteChecklist(e)}
                      style={{ border: "none", backgroundColor: "transparent" }}

                    >
                      <MdDeleteOutline color="red"/>
                    </button>
                  </Card.Header>
               <div style={{padding:"1rem"}}>
               <Checkitems checklistId = {checklist.id} cardId ={this.cardId}/>
               </div>
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
/* 
<Card.Body>
<Button variant="light">Add an item</Button>
</Card.Body> */