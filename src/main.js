import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const initializeMockData = () => {
  const mockUsers = [
    { username: "admin", password: "1234" },
    { username: "testuser", password: "test123" },
    { username: "guest", password: "guestpass" },
  ];

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 기존 유저 데이터에 중복되지 않게 기본 유저 추가
  mockUsers.forEach(mockUser => {
    if (!users.some(user => user.username === mockUser.username)) {
      users.push(mockUser);
    }
  });

  // 수정된 users 데이터를 다시 저장
  localStorage.setItem("users", JSON.stringify(users));
  console.log("✅ Mock Data가 강제로 추가되었습니다!", users);
};

// Mock Data 초기화 실행
initializeMockData();

const app = createApp(App);
app.use(router);
app.mount("#app");
