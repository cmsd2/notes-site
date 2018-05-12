import axios from "axios";
import config from "./config";

export class Notes {
  constructor(auth) {
    if (!auth) {
      throw new Error("no auth provided");
    }
    this.auth = auth;
  }

  token() {
    return this.auth.id_token();
  }

  call(method, path, props) {
    props = props || {};
    props['url'] = path;
    props['method'] = method;
    props['headers'] = props['headers'] || {};
    props['baseURL'] = config.apiBaseUrl;
    props.headers['Authorization'] = this.token();
    return axios(props);
  }

  get(id) {
    return this.call('get', '/notes/' + encodeURIComponent(id));
  }

  list() {
    return this.call('get', '/notes');
  }

  post(note) {
    return this.call('post', '/notes', {
      data: note
    });
  }

  put(note) {
    return this.call('put', '/notes/' + encodeURIComponent(note.noteId), {
      data: note
    });
  }

  remove(id) {
    return this.call('delete', '/notes/' + encodeURIComponent(id));
  }
}
