import React, { Component } from "react";
import { Modal, Spinner } from "react-bootstrap";

import Board from "./Board";
import * as TrelloApi from "./Api";

class DisplayBoards extends Component {
  state = { boards: [], modal: false, boardTitle: "", spinner: true };

  componentDidMount() {
    TrelloApi.getBoards().then((data) => {
      this.setState({ boards: data, spinner: false });
    });
  }

  handleBoardTitle = (e) => {
    this.setState({
      boardTitle: e.target.value,
    });
  };

  createBoard = () => {
    TrelloApi.createBoard(this.state.boardTitle).then((data) => {
      this.setState({
        boards: [data, ...this.state.boards],
        modal: !this.state.modal,
        boardTitle: "",
      });
    });
  };

  handleCreateBoard = (e) => {
    if(this.state.boardTitle){
    this.createBoard();}
  };

  handleOnClickForm = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleModal = () => {
    this.setState({ boardTitle: "", modal: !this.state.modal });
  };

  render() {
    return (
      <>
        <Modal show={this.state.modal} onHide={this.handleModal}>
          <form className="create-board" onSubmit={this.handleCreateBoard}>
            <h3>Create New Board</h3>
            <hr />
            <label htmlFor="boardTitleInputElement" className="mt-3">
              Board title
            </label>
            <input
              type="text"
              onChange={this.handleBoardTitle}
              value={this.state.boardTitle}
              id="boardTitleInputElement"
              className="col-12 form-control mt-2"
              placeholder="Enter board title"
              required
            />
            <div className="create-board-buttons d-flex justify-content-end">
              <button
                type="button"
                onClick={this.handleModal}
                className="create-board-close-button btn btn-secondary btn-sm"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary btn-sm col-4">
                Add Board
              </button>
            </div>
          </form>
        </Modal>

        <div className="boards-container">
          <div className=" d-flex flex-wrap ">
            <div className={this.state.spinner ? "trello-spinner" : "d-none"}>
              <Spinner animation="border" />
            </div>

            {this.state.boards.map((board) => {
              return <Board key={board.id} board={board} />;
            })}
            <div
              onClick={this.handleOnClickForm}
              className={
                !this.state.spinner
                  ? "boards-create-board d-flex flex-column justify-content-center align-items-center"
                  : "d-none"
              }
            >
              Create new board
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayBoards;
