<template>
  <!-- 로그인 페이지 전체 컨테이너 -->
  <div class="login-container">
    <div class="login-box">
      <h2>로그인</h2>

      <!-- 로그인 폼 -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label>이메일:</label>
          <input type="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label>비밀번호:</label>
          <input type="password" v-model="form.password" required />
        </div>

        <button type="submit" class="login-btn">로그인</button>
      </form>

      <!-- 회원가입, 아이디 찾기, 비밀번호 찾기 링크 -->
      <div class="links">
        <p>계정이 없으신가요? <router-link to="/register">회원가입</router-link></p>
        <p><router-link to="/find-id">아이디 찾기</router-link></p>
        <p><router-link to="/find-password">비밀번호 찾기</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 입력 폼 데이터 (이메일 & 비밀번호)
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    // 로그인 기능
    login() {
      // localStorage에서 해당 이메일로 저장된 사용자 데이터 가져오기
      const storedUser = JSON.parse(localStorage.getItem("user_" + this.form.email));

      // 사용자가 존재하지 않는 경우
      if (!storedUser) {
        alert("등록되지 않은 이메일입니다.");
        return;
      }

      // 입력한 비밀번호가 저장된 비밀번호와 일치하지 않는 경우
      if (storedUser.password !== this.form.password) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }

      // 로그인 성공 시 localStorage에 로그인 상태 저장
      localStorage.setItem("loggedInUser", this.form.email);
      alert("로그인 성공!");
      this.$router.push("/home"); // 로그인 성공 후 메인 페이지('/')로 이동
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
  height: 100vh;
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

/* 제목 스타일 */
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