import config from '../config';
import TokenService from '../services/token-service';

const CalendarApiService = {
  getEvents() {
    return fetch(`${config.API_ENDPOINT}/event`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },

  getEvent() {
    console.log('getting a single event');
  },

  updateEvent(data, id) {
    return fetch(`${config.API_ENDPOINT}/event/single/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: data.name })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  newEvent(data) {
    return fetch(`${config.API_ENDPOINT}/event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        date: data.date,
        start_timestamp: data.start_timestamp,
        end_timestamp: data.end_timestamp,
        info: data.info,
        category: data.category
      })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteEvent(id) {
    return fetch(`${config.API_ENDPOINT}/event/single/${id}`, {
      method: 'DELETE'
    });
  }
};

export default CalendarApiService;
