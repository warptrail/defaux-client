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
    console.log('updating an event');
  },

  newEvent(data) {
    console.log('new event');
  },

  deleteEvent(id) {
    console.log('deleting an event');
  }
};

export default CalendarApiService;
