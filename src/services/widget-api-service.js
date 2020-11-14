import config from '../config';

const WidgetApiService = {
  getWidgets() {
    return fetch(`${config.API_ENDPOINT}/widget`).then((res) => {
      return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  getWidget(id) {
    return fetch(`${config.API_ENDPOINT}/widget/single/${id}`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateWidget(data, id) {
    return fetch(`${config.API_ENDPOINT}/widget/single/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: data.name })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  newWidget(data) {
    return fetch(`${config.API_ENDPOINT}/widget`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: data.name })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteWidget(id) {
    return fetch(`${config.API_ENDPOINT}/widget/single/${id}`, {
      method: 'DELETE'
    });
  }
};

export default WidgetApiService;
