export function generateToken(email) {
    const payload = { email, exp: Date.now() + 1000 * 60 * 60 }; // 1시간 만료
    return btoa(JSON.stringify(payload)); // Base64 인코딩
}

export function validateToken(token) {
    try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
            return decoded.email;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export function saveToken(token) {
    localStorage.setItem("auth_token", token);
}

export function getToken() {
    return localStorage.getItem("auth_token");
}

export function removeToken() {
    localStorage.removeItem("auth_token");
}
