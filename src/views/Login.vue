<template>
  <div class="login-container">
    <div class="login-box">
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>아이디:</label>
          <input type="text" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label>비밀번호:</label>
          <input type="password" v-model="form.password" required />
        </div>

        <button type="submit" class="login-btn">로그인</button>
      </form>

      <div class="links">
        <p>계정이 없으신가요? <router-link to="/register">회원가입</router-link></p>
        <p><router-link to="/find-password">비밀번호 찾기</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const userData = JSON.parse(localStorage.getItem("user_" + this.form.name));

      if (!userData) {
        alert("등록된 사용자가 아닙니다.");
        return;
      }

      if (userData.password !== this.form.password) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }

      localStorage.setItem("loggedInUser", this.form.name);
      alert("로그인 성공!");
      this.$router.push("/"); // 로그인 성공 후 메인 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 로그인 페이지 컨테이너 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 */
  background-color: #f4f4f4;
}

/* 로그인 박스 */
.login-box {
  width: 350px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 제목 */
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* 폼 그룹 (입력 필드) */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* 로그인 버튼 */
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* 링크 스타일 */
.links {
  margin-top: 15px;
}

.links p {
  margin: 5px 0;
  font-size: 14px;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
