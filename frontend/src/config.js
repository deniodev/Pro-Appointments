let token = null;

// Check if localStorage is available before accessing it
if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem("token");
}

export const BASE_URL = "http://localhost:5000/api/v1";
export { token };
