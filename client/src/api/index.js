const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost/api'; // set default value.

export function createAccount({first_name, last_name, username, password}) {
  const CREATE_ACCOUNT_URL = `${BASE_API_URL}/accounts`;
  return window.fetch(CREATE_ACCOUNT_URL, {
    method: 'POST',
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      password,
    })
  })
}

export function login({ username, password }) {
  const LOGIN_URL = `${BASE_API_URL}/accounts/login`;
  return window.fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
}

export function checkUsername(username) {
  const CHECK_USERNAME_URL = `${BASE_API_URL}/accounts/check`;
  return window.fetch(CHECK_USERNAME_URL, {
    method: 'POST',
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      username,
    })
  })
}
