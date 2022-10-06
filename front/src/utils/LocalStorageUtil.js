export function getLoginData() {
  return JSON.parse(localStorage.getItem("loginData"));
}

export function setLoginData(key, jsonData) {
  localStorage.setItem(key, JSON.stringify(jsonData));
}

export function removeLoginData() {
  localStorage.removeItem("loginData");
}
