
export default {
    baseUrl: "https://ihh-core-latest.onrender.com"
}

export function getToken() {
    return window.localStorage.getItem("token");
}

export function setToken(token) {
    window.localStorage.setItem("token", token);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function isLogin() {
    return !isNull(getToken());
}

export function isNull(token) {
    return token == null || token == '' || token == 'undefined';
}

export function isSuccess(result) {
    return result.code == '0';
}

export function getData(result) {
    if (isSuccess(result)) {
        return result.result;
    }
}

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}