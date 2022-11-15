import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
	apiCall(method, url, data) {
		return axios({
			method,
			url,
			data,
		}).catch((error) => {
			throw error;
		});
	}

	getUsers() {
		return this.apiCall("get", url);
	}

	addUser(username, email, password) {
		return this.apiCall("post", url, { username, email, password });
	}

	removeUser(id) {
		return this.apiCall("delete", `${url}/${id}`);
	}

	updateUser(id, username, email, password) {
		return this.apiCall("put", `${url}/${id}`, { username, email, password });
	}
}
