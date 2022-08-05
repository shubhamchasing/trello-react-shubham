import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import CardsInList from "./CardsInLists";
import * as TrelloApi from "./Api";

class List extends Component {
  state = { lists: [], listName: "" };

  boardId = this.props.match.params.boardId;

  componentDidMount() {
    TrelloApi.getLists(this.boardId).then((data) =>
      this.setState({ lists: data })
    );
  }

  handleDelete = async (e) => {
  
    let archiveListId = e.target.value;
    await TrelloApi.archiveList(archiveListId);
    let filteredLists = this.state.lists.filter((list) => {
      if (list.id !== archiveListId) {
        return true;
      }
    });
    this.setState({
      lists: filteredLists,
    });
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
          lists: [data, ...this.state.lists],
          listName: "",
        });
      });
    }
  };

  render() {
    return (
      <div className="list-container">
        {this.state.lists.map((list) => {
          return (
            <Card className="lists" key={list.id}>
              <Card.Header as="h5">{list.name}</Card.Header>
              <CardsInList listId={list.id} />
              <Card.Body>
                <br />
                <Button
                  variant="danger"
                  type="submit"
                  value={list.id}
                  onClick={(e) => this.handleDelete(e)}
                >
                  Archive List
                </Button>
              </Card.Body>
            </Card>
          );
        })}
        <Card className="add-list">
          <Card.Header as="h5">{"Add another list"}</Card.Header>
          <Card.Body>
            <input
              type="text"
              placeholder="Enter list name"
              value={this.state.listName}
              onChange={this.handleChange}
              required
            />
            <br />
            <br/>
            <Button onClick={this.handleSubmit} type="submit">
              Add List
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default List;
