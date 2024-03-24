const SERVER_API = "http://127.0.0.1:8080";
const AUTH_API = `${SERVER_API}/auth`;
const SINGUP_API = `${AUTH_API}/signup`;
const SINGIN_API = `${AUTH_API}/signin`;

const USER_API = `${SERVER_API}/user`;
const USER_HISTORY_API = `${USER_API}/history`;

const GPT_REQUEST_API = `${SERVER_API}/request/chatgpt-3.5`;

export { SINGIN_API, SINGUP_API, USER_HISTORY_API, GPT_REQUEST_API };
