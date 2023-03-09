const axios = require("axios");
const URL = "https://jsonplaceholder.typicode.com/posts";

async function list() {
  const res = await axios.get(`${URL}`);
  return res.data;
}
async function get(id) {
  const res = await axios.get(`${URL}/${id}`);
  return res.data;
}
async function create(data) {
  const res = await axios.post(`${URL}`, data);
  return res.data;
}
async function update(id, data) {
  const res = await axios.put(`${URL}/${id}`, data);
  return res.data;
}
async function remove(id) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
