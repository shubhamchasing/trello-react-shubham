import React, { Component } from "react";
import { Button } from "react-bootstrap";

import * as TrelloApi from "./Api";
import Checklists from "./Checklists";

class CardsInList extends Component {
  state = {
    cards: [],
    cardName: "",
  };

  componentDidMount() {
    TrelloApi.getCards(this.props.listId).then((data) => {
      this.setState({
        cards: data,
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
      this.setState({
        cardName: "",
        cards: [data, ...this.state.cards],
      });
    });
  };

  handleDelete = async (e) => {
    let cardId = e.target.value;
    await TrelloApi.deleteCard(cardId);
    let filteredCards = this.state.cards.filter((card) => {
      if (card.id !== cardId) {
        return true;
      }
      else{
        return false;
      }
    });
    this.setState({
      cards: filteredCards,
    });
  };

  render() {
    return (
      <>
        <div className="main-container">
          {" "}
          {this.state.cards.map((card) => (
            <div key={card.id} className="card-container">
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: "500", marginBottom:"5px"}}>
                  {card.name}
                </p>
                <hr style={{marginTop:"0px"}} />
              </div>
              <div className="buttons">
                <Checklists key={card.id} card={card} />
                <Button
                  onClick={(e) => this.handleDelete(e)}
                  value={card.id}
                  type="button"
                  variant="danger"
                  size="sm"
                  style={{
                    fontSize: "0.5rem",
                    padding: "5px 10px",
                    fontWeight: "900",
                  }}
                >
                  Delete Card
                </Button>
              </div>
            </div>
          ))}
          <div>
            <input
              className="add-card"
              placeholder="Enter card name"
              value={this.state.cardName}
              onChange={this.handleChange}
              type="text"
              required
            />
            <Button
            active = {false}
            variant="outline-secondary"
              onClick={(e) => this.handleOnClick(e)}
              type="button"
              style={{
                marginLeft: "15px",
                fontSize: "0.65rem",
                fontWeight: "700",
              }}
            >
              <span style={{fontSize:"0.7rem"}}> + </span> Add Card
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default CardsInList;
