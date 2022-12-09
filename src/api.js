import { default as Axios } from 'axios';
import { API_URL } from "./config";

const axios = Axios.create({
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  baseURL: API_URL
});


function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const APISUFFIX = ""

export const api = {
  async logIn(username, password) {
    console.log("sending log request")

    let payload = {
        username: username,
        password: password
    }

    return axios.post(`${APISUFFIX}/authorize`, payload);
  },

  async register(username, password) {
    console.log("sending register request")

    let payload = {
        username: username,
        password: password,
        role: "User"
    }

    return axios.post(`${APISUFFIX}/register`, payload);
  },

  async getMe(token) {
    return axios.get(`${APISUFFIX}/users/me`, authHeaders(token));
  },

  async updateMe(token, data) {
    return axios.put(`${APISUFFIX}/users/me`, data, authHeaders(token));
  },

  async getUsers(token) {
    let config = authHeaders(token);
    // if (params !== undefined) {
    //   config['params'] = params;
    // }
    return axios.get(`${APISUFFIX}/users`, config);
  },
  async getUser(token, id) {
    return axios.get(`${APISUFFIX}/users/${id}`, authHeaders(token));
  },

  async updateUser(token, userId, data) {
    return axios.put(`${APISUFFIX}/users/${userId}`, data, authHeaders(token));
  },

  async fetchTemplates(token) {
    return axios.get(`${APISUFFIX}/templates/`, authHeaders(token));
  },

  async fetchTemplate(token, id) {
    return axios.get(`${APISUFFIX}/templates/${id}`, authHeaders(token));
  },

  async createTemplate(token, data) {
    return axios.post(`${APISUFFIX}/templates/`, data, authHeaders(token));
  },

  async modifyTemplate(token, id, data) {
    return axios.put(`${APISUFFIX}/templates/${id}`, data, authHeaders(token));
  },

  async deleteTemplate(token, id) {
    return axios.delete(`${APISUFFIX}/templates/${id}`, authHeaders(token));
  }



};