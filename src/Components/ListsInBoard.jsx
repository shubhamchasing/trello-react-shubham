import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiOutlineMinusCircle } from "react-icons/ai";

import CardsInList from "./CardsInLists";
import * as TrelloApi from "./Api";
import * as action from "../Redux/ActionCreator/ActionCreator";

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLists: (data) => dispatch(action.getLists(data)),
    addList: (data) => dispatch(action.addList(data)),
    archiveList: (data) => dispatch(action.archiveList(data)),
  };
};

class List extends Component {
  state = { listName: "" }; 

  boardId = this.props.match.params.boardId;

  componentDidMount() {
    TrelloApi.getLists(this.boardId).then((data) => this.props.getLists(data));
  }
    
  handleDelete = async (e) => {
    let archiveListId = e.currentTarget.value;
    await TrelloApi.archiveList(archiveListId);
    let filteredLists = this.props.lists.filter((list) => {
      if (list.id !== archiveListId) {
        return true;
      } else {
        return false;
      }
    });

    this.props.archiveList(filteredLists);
  };

  handleChange = (e) => {
    let listName = e.target.value;
    this.setState({ listName });
  };

  handleSubmit = (e) => {
    let listName = this.state.listName;
    if (listName) {
      TrelloApi.addList(listName, this.boardId).then((data) => {
        this.setState({
          listName: "",
        });
        this.props.addList(data);
      });
    }
  };

  render() {
    return (
      <>
    
      
          <div
            className="list-container"
            style={{
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#0079bf",
              padding: "2rem",
              minHeight: "100vh",
              overflow: "auto",
            }}
          >
            {this.props.lists.map((list) => {
              return (
                <Card
                  className="lists"
                  key={list.id}
                  style={{ paddingBottom: "20px", backgroundColor: "#ebecf0" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    <span>{list.name}</span>
                    <button
                      value={list.id}
                      onClick={(e) => this.handleDelete(e)}
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <AiOutlineMinusCircle />
                    </button>
                  </div>
                  <CardsInList listId={list.id} />
                </Card>
              );
            })}
            <Card className="add-list">
              <Card.Header>{"Add another list"}</Card.Header>
              <Card.Body>
                <input
                  type="text"
                  placeholder="Enter list name"
                  value={this.state.listName}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <br />
                <Button onClick={this.handleSubmit} type="submit">
                  Add List
                </Button>
              </Card.Body>
            </Card>
          </div>

      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
