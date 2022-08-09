import React, { Component } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import Board from "./Board";
import * as TrelloApi from "./Api";
import * as action from "../Redux/ActionCreator/ActionCreator"

const mapStateToProps = (state) => {
  console.log(state.boards)
  return {
    boards: state.boards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards : (data) => dispatch( action.getBoards(data) ),
    createBoard : (data) => dispatch(action.createBoard(data))
  }
};

class DisplayBoards extends Component {
  state = {modal: false, boardTitle: "", spinner: true };

  componentDidMount() {
    console.log("678")
    TrelloApi.getBoards().then((data) => {
      this.setState({spinner: false })
      this.props.getBoards(data)
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
        modal: !this.state.modal,
        boardTitle: "",
      });
      this.props.createBoard(data)
    });
  };

  handleCreateBoard = (e) => {
    if (this.state.boardTitle) {
      this.createBoard();
    }
  };

  handleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <>
        <Modal show={this.state.modal} onHide={this.handleModal}>
          <form
            className="create-board"
            onClick={(e) => this.handleCreateBoard(e)}
          >
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
              <button type="button" className="btn btn-primary btn-sm col-4">
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

            {this.props.boards.map((board) => {
              return <Board key={board.id} board={board} />;
            })}
            <div
              onClick={this.handleModal}
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

export default connect(mapStateToProps,mapDispatchToProps)(DisplayBoards);
