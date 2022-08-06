import axios from "axios";

axios.defaults.params = {
  key: "4f0e9f61afa2d443d6b89a2212eb625e",
  token: "eeb95696b6767d662d2c7a03c28c75d2cd71d79203789d1c3d6cd6d6530345a0",
};

axios.defaults.baseURL = "https://api.trello.com";

function getBoards() {
  return axios
    .get("/1/members/me/boards")
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function createBoard(name) {
  return axios
    .post("/1/boards", null, {
      params: {
        name,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function getLists(id) {
  return axios
    .get(`/1/boards/${id}/lists`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
}

function addList(name, idBoard) {
  return axios
    .post("/1/lists", null, {
      params: {
        name,
        idBoard,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function archiveList(id) {
  return axios
    .put(`/1/lists/${id}/closed`, null, {
      params: {
        value: true,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function getCards(id) {
  return axios
    .get(`/1/lists/${id}/cards`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function addCard(name, idList) {
  return axios
    .post("/1/cards", null, {
      params: {
        name,
        idList,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function deleteCard(id) {
  return axios
    .delete(`/1/cards/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function getChecklists(id) {
  return axios
    .get(`/1/cards/${id}/checklists`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function addChecklist(name, idCard) {
  return axios
    .post(`/1/checklists`, null, {
      params: {
        name,
        idCard,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function deleteChecklist(id) {
  return axios
    .delete(`/1/checklists/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function getCheckitems(id) {
  return axios
    .get(`/1/checklists/${id}/checkItems`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function addCheckitem(name, id) {
  return axios
    .post(`/1/checklists/${id}/checkItems`, null, {
      params: {
        name,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function deleteCheckitem(id, idCheckItem) {
  return axios
    .delete(`/1/checklists/${id}/checkItems/${idCheckItem}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
}

function updateCheckitem(idCard,idCheckItem,state) {
  return axios
    .put(
      `/1/cards/${idCard}/checkItem/${idCheckItem}`,null,{
        params: {
          state
        }
      }
    )
    .then((res) => res.data)
    .catch((err) => console.error(err))
}

export {
  getBoards,
  createBoard,
  getLists,
  addList,
  archiveList,
  getCards,
  addCard,
  deleteCard,
  getChecklists,
  addChecklist,
  deleteChecklist,
  getCheckitems,
  addCheckitem,
  deleteCheckitem,
  updateCheckitem
};
