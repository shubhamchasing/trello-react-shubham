import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import * as TrelloApi from "./Api";
import Checklists from "./Checklists";
import * as action from "../Redux/ActionCreator/ActionCreator";

const mapStateToProps = (state) => {
  console.log(state.cardsInList)
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
      console.log("data",data)
      this.setState({ cardName: "" });

      this.props.addCard({
        card: data,
        listId,
      });
    });

  };

  handleDelete = async (e) => {
    let cardId = e.target.value;
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
            { this.props.cards[this.props.listId] === undefined? null : this.props.cards[this.props.listId].map((card) => (
              <div key={card.id} className="card-container">
                <div>
                   <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      marginBottom: "5px",
                    }}
                  >
                    {card.name}
                  </p>
                  <hr style={{ marginTop: "0px" }} />
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
                active={false}
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
