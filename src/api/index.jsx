import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } };

// PUBLIC API
export function login(data) {
	return axios.post(`${apiUrl}/login`, data);
}

// PTIVATE API
export function getAllCompanies() {
	return axios.get(`${apiUrl}/companies`, config);
}

export function getOneCompany(id) {
	return axios.get(`${apiUrl}/companies/${id}`, config);
}

export function createCompany(data) {
	return axios.post(`${apiUrl}/createCompany`, data, config);
}

export function uploadCompanyLogo(file) {
	return axios.post(`${apiUrl}/upload`, file, config);
}

export function editCompany(id, data) {
	return axios.put(`${apiUrl}/companies/${id}`, data, config);
}

export function deleteOneCompany(id) {
	return axios.delete(`${apiUrl}/companies/${id}`, config);
}
