const SERVER_API = "http://31.128.39.41:3000";
// const SERVER_API = "http://127.0.0.1:3000";
// const SERVER_API = "http://31.128.39.41:3000";
const AUTH_API = `${SERVER_API}/auth`;
const SINGUP_API = `${AUTH_API}/registration`;
const SINGIN_API = `${AUTH_API}/login`;

// const USER_API = `${SERVER_API}/user`;
const GPT_API = `${SERVER_API}/gpt-api`;
const USER_HISTORY_API = `${GPT_API}/history`;

// const GPT_REQUEST_API = `${SERVER_API}/request/chatgpt-3.5`;
const GPT_REQUEST_API = `${GPT_API}/sentMessage`;

export { SINGIN_API, SINGUP_API, USER_HISTORY_API, GPT_REQUEST_API };
