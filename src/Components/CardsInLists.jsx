import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";

import * as TrelloApi from "./Api";
import Checklists from "./Checklists";
import * as action from "../Redux/ActionCreator/ActionCreator";

const mapStateToProps = (state) => {
  console.log(state.cardsInList);
  return {
    cards: state.cardsInList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (data) => dispatch(action.getCards(data)),
    addCard: (data) => dispatch(action.addCard(data)),
    deleteCard: (data) => dispatch(action.deleteCard(data)),
  };
};

class CardsInList extends Component {
  state = {
    cardName: "",
  };

  componentDidMount() {
    TrelloApi.getCards(this.props.listId).then((data) => {
      this.props.getCards({
        cards: data,
        listId: this.props.listId,
      });
    });
  }

  handleChange = (e) => {
    let cardName = e.target.value;
    this.setState({
      cardName,
    });
  };

  handleOnClick = () => {
    let listId = this.props.listId;
    TrelloApi.addCard(this.state.cardName, listId).then((data) => {
      console.log("data", data);
      this.setState({ cardName: "" });

      this.props.addCard({
        card: data,
        listId,
      });
    });
  };

  handleDelete = async (e) => {
    let cardId = e.currentTarget.value;
    await TrelloApi.deleteCard(cardId);
    let filteredCards = this.props.cards[this.props.listId].filter((card) => {
      if (card.id !== cardId) {
        return true;
      } else {
        return false;
      }
    });
    this.props.deleteCard({
      remainingCards: filteredCards,
      listId: this.props.listId,
    });
  };

  render() {
    return (
      <>
        <div className="main-container">
          {" "}
          {this.props.cards[this.props.listId] === undefined
            ? null
            : this.props.cards[this.props.listId].map((card) => (
                <div key={card.id} className="card-container" style={{margin:"1rem" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems:"center",
                      padding: "0rem 0.5rem",
                      fontWeight: "400",
                      borderRadius:"5px"
                      ,boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      
                      
                    }}
                  >
                    <span style={{fontSize:"0.7rem", color:"gray"}}>{card.name}</span>
                    <button
                      onClick={(e) => this.handleDelete(e)}
                      value={card.id}
                      type="button"
                      style={{ border: "none", backgroundColor: "transparent" }}
                    >
                      <MdDeleteOutline color="red" />
                    </button>
                  </div>
                  <Checklists key={card.id} card={card} />
                </div>
              ))}
          <div>
            <input
              className="add-card"
              placeholder="Enter card name"
              value={this.state.cardName}
              onChange={this.handleChange}
              type="text"
              required={true}
            />
            <Button
              variant="outline-secondary"
              onClick={(e) => this.handleOnClick(e)}
              type="button"
              style={{
                marginLeft: "15px",
                fontSize: "0.65rem",
                fontWeight: "700",
              }}
            >
              <span style={{ fontSize: "0.7rem" }}> + </span> Add Card
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsInList);
