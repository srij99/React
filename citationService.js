import {
  apiUrl,
  herokuUrl
} from "./config.json";
import httpService from "./httpService.js";
let apiEndpoint = "http://localhost:4000";
if (process.env.NODE_ENV !== "production") {
  apiEndpoint = `${apiUrl}/citations`;
} else {
  apiEndpoint = `${herokuUrl}/citations`;
}
// apiEndpoint = `https://www.professionaleditingtool.com/api/citations`;

export async function insertCites() {
  const data = await httpService.post(`${apiEndpoint}/insertCite`);
  console.log(data)
  return data;
}
/////////

export async function getCheckCitation(text) {
  const data = await httpService.post(`${apiEndpoint}/checkCitations`,{
    text
  });
  return data;
}


export async function getStyle(styleDetails) {
  const data = await httpService.post(`${apiEndpoint}/getStyle`, {
    "data": styleDetails
  });
  return data;
}

export async function savecitations(styleDetails, id) {
  const data = await httpService.post(`${apiEndpoint}/savecitations`, {
    "data": styleDetails,
    projectId: id
  });
  return data;
}

export async function getMyCitations(projectId) {
  const data = await httpService.get(`${apiEndpoint}/getCitationsByUser/${projectId}`);
  return data;
}
export async function changeCitationStyle(data) {
  const response = await httpService.post(`${apiEndpoint}/changeStyle`, data);
  return response;
}

export async function updateCitations(data) {
  const response = await httpService.post(`${apiEndpoint}/updateCitations`, data);
  return response;
}

export async function deleteMyCitations(value, projectId) {
  console.log(value)
  const response = await httpService.post(`${apiEndpoint}/deleteCitations`, {
    id: value,
    projectId: projectId
  });
  return response;
}

export async function createProject(data) {
  const response = await httpService.post(`${apiEndpoint}/createProject`, data);
  return response;
}

export async function getAllProjects() {
  const response = await httpService.get(`${apiEndpoint}/getAllProjects`);
  return response;
}

export default {
  getCheckCitation,
  getStyle,
  savecitations,
  insertCites,
  getMyCitations,
  changeCitationStyle,
  updateCitations,
  deleteMyCitations,
  createProject,
  getAllProjects
}