import axios from "axios";

const baseUrl = "https://breyyy.pythonanywhere.com/";
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use((request) => {
	console.log("Starting Request", request.method, request.url, request);
	return request;
});

axios.interceptors.response.use(
	(response) => {
		console.log("Response of", response.request.responseURL, response);
		return response;
	},
	(error) => {
		console.log(error);
		if (error.response.status === 406) {
			// invalid token
			localStorage.clear();
		}
		return Promise.reject(error);
	}
);

/**
 * Helper for API Calls
 */
const API = {
	/**
	 * check if user has an access token in local storage, navigate back to starting screen if user has no token
	 * @param {import("react-router-dom").NavigateFunction} navigate
	 * @returns true if there is an access token, false if not
	 */
	checkAuth(navigate) {
		if (localStorage.getItem("token")) {
			return true;
		} else {
			navigate("/", { replace: true });
			return false;
		}
	},

	/**
	 * create a new game and store access token
	 * @returns game data of new game if successful, false if not
	 */
	async createGame(settings) {
		return axios
			.post("/app/game/", settings)
			.then((response) => {
				localStorage.setItem("token", response.data.game.access_token);
				return response.data;
			})
			.catch((error) => {
				return false;
			});
	},

	/**
	 *
	 * @param {import("react-router-dom").NavigateFunction} navigate
	 * @returns game data of current game if successful, false if not
	 */
	async getGame(navigate) {
		if (this.checkAuth(navigate)) {
			return axios
				.get("/app/game/", {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					this.checkAuth(navigate);
					return false;
				});
		} else {
			return false;
		}
	},

	/**
	 *
	 * @param {import("react-router-dom").NavigateFunction} navigate
	 * @param {*} data game data of current round
	 * @returns game data of the next round if successful, false if not
	 */
	async endRound(navigate, data) {
		if (this.checkAuth(navigate)) {
			return axios
				.post("/app/round/", data, {
					headers: { Authorization: localStorage.getItem("token") },
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					this.checkAuth(navigate);
					return false;
				});
		} else {
			return false;
		}
	},

	/**
	 * return history of investments for a given category
	 */
	async getCategoryInvestments(navigate, category) {
		if (this.checkAuth(navigate)) {
			return axios
				.get("/app/investment/", {
					headers: { Authorization: localStorage.getItem("token")},
					params:{ "category":category }
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					this.checkAuth(navigate);
					return false;
				});

		} else {
			return false;
		}
	}
};

export default API;
