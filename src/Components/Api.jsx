import axios from "axios";

axios.defaults.params = {
  key: "4f0e9f61afa2d443d6b89a2212eb625e",
  token: "eeb95696b6767d662d2c7a03c28c75d2cd71d79203789d1c3d6cd6d6530345a0",
};

function getBoards() {
  return axios
    .get("https://api.trello.com/1/members/me/boards")
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function createBoard(name) {
  return axios.post("https://api.trello.com/1/boards", null, {
    params: {
      name,
    },
  });
}

function getLists(id) {
  return axios
    .get(`https://api.trello.com/1/boards${id}/lists`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function addList(name, idBoard) {
  return axios.post("https://api.trello.com/1/lists", null, {
    params: {
      name,
      idBoard,
    },
  });
}

function archiveList(id) {
  return axios.put(`https://api.trello.com/1/lists/${id}/closed`, {
    params: {
      value: true,
    },
  });
}

function displayCards(id) {
  return axios
    .get(`https://api.trello.com/1/lists/${id}/cards`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function createCard(name, idList) {
  return axios.post("https://api.trello.com/1/lists", null, {
    params: {
      name,
      idList,
    },
  });
}

function deleteCard(id) {
  return axios.delete(`https://api.trello.com/1/cards/${id}`);
}

export {
  getBoards,
  createBoard,
  getLists,
  addList,
  archiveList,
  displayCards,
  createCard,
  deleteCard,
};
