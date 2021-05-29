const LOCAL_STORAGE_KEY = "userState";

class UserState { }

UserState.login = (arr) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
}

UserState.check = () =>JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

UserState.logout=()=>{localStorage.removeItem(LOCAL_STORAGE_KEY)}


module.exports = UserState