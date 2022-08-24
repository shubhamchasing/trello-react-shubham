import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

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
            minHeight: "90vh",
            Width: "100%",
            overflowX: "auto",
          }}
        >
          {this.props.lists.map((list) => {
            return (
              <Card
                className="lists"
                key={list.id}
                style={{
                  paddingBottom: "20px",
                  backgroundColor: "#ebecf0",
                  margin: "0.25rem",
                  minWidth: "330px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  <span style={{ width:"100%", display:"flex" , justifyContent:"space-between" ,margin:"0.3rem"}}>
                    {list.name}

                    <button
                      value={list.id}
                      onClick={(e) => this.handleDelete(e)}
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <AiOutlineMinusCircle color="red"/>
                    </button>
                  </span>
                </div>
                <CardsInList listId={list.id} />
              </Card>
            );
          })}
          <Card
            className="add-list"
            style={{
              paddingBottom: "20px",
              backgroundColor: "#4897cd",
              margin: "0.25rem",
              minWidth: "330px",
              maxWidth: "330px",
              color: "white",
            }}
          >
            <span style={{ marginLeft: "0.8rem", marginTop: "0.5rem" }}>
              {" "}
              <BiPlus /> {"Add another list"}
            </span>

            <input
              className="add-list"
              type="text"
              placeholder="Enter list name"
              value={this.state.listName}
              onChange={this.handleChange}
              required={true}
            />
            <Button
              onClick={this.handleSubmit}
              variant="outline-light"
              type="button"
              style={{
                marginLeft: "15px",
                fontSize: "0.65rem",
                fontWeight: "700",
                width: "5rem",
              }}
            >
              <span style={{ fontSize: "0.7rem" }}> + </span> Add List
            </Button>
          </Card>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
