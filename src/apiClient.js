import axios from "axios";
const url = "http://localhost:3001/";
// const url = "https://stannington-carnival-backend.onrender.com/";

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

	getUserFromToken(token) {
		return this.apiCall("get", `${url}token/${token}`, token).catch((error) => {
			throw error;
		});
	}

	login(username, password) {
		return this.apiCall("post", `${url}auth`, {
			username,
			password,
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
		return this.apiCall("delete", `${url}${id}`);
	}

	updateUser(id, username, email, password) {
		return this.apiCall("put", `${url}${id}`, { username, email, password });
	}

	// Add booking

	addBooking(booking) {
		return this.apiCall("post", `${url}bookings`, {
			...booking,
		}).catch((error) => {
			throw error;
		});
	}
}
