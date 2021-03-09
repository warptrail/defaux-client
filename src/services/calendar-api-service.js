import config from '../config';
import TokenService from './token-service';

const CalendarApiService = {
  getEvents() {
    if (TokenService.hasAuthToken()) {
      return fetch(`${config.API_ENDPOINT}/event`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      }).then((res) => {
        return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
      });
    }
    return null;
  },

  getEvent() {
    console.log('getting a single event');
  },

  updateEvent(data, id) {
    console.log(data);
    return fetch(`${config.API_ENDPOINT}/event/single/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(data)
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postNewEvent(data) {
    return fetch(`${config.API_ENDPOINT}/event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        date: data.date,
        timestamp: data.timestamp,
        info: data.info,
        category_id: data.category_id
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteEvent(id) {
    return fetch(`${config.API_ENDPOINT}/event/single/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    });
  },

  getCategories() {
    if (TokenService.hasAuthToken()) {
      return fetch(`${config.API_ENDPOINT}/event/category`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      }).then((res) => {
        return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
      });
    }
    return null;
  },

  postNewCategory(data) {
    return fetch(`${config.API_ENDPOINT}/event/category`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        real_name: data.real_name,
        encoded_name: data.encoded_name,
        icon: data.icon,
        color: data.color
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getSpecificCategory(id) {
    return fetch(`${config.API_ENDPOINT}/event/category/${id}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteCategory(id) {
    return fetch(`${config.API_ENDPOINT}/event/category/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    });
  },

  updateCategory(data, id) {
    console.log(data);
    return fetch(`${config.API_ENDPOINT}/event/category/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(data)
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};

export default CalendarApiService;
