<template>
  <!-- 비밀번호 찾기 페이지 전체 컨테이너 -->
  <div class="find-password-container">
    <div class="find-password-box">
      <h2>비밀번호 찾기</h2>

      <!-- 비밀번호 찾기 폼 -->
      <form @submit.prevent="findPassword">
        <div class="form-group">
          <label>이름:</label>
          <input type="text" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label>이메일:</label>
          <input type="email" v-model="form.email" required />
        </div>

        <button type="submit" class="find-btn">비밀번호 찾기</button>
      </form>

      <!-- 비밀번호 찾기 성공 시 팝업 -->
      <div v-if="foundPassword" class="popup">
        <p>회원님의 비밀번호는 <strong>{{ foundPassword }}</strong> 입니다.</p>
        <button @click="goToLogin" class="confirm-btn">확인</button>
      </div>

      <!-- 비밀번호 찾기 실패 시 에러 메시지 표시 -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- 로그인 페이지로 돌아가는 링크 -->
      <div class="links">
        <p><router-link to="/login">로그인으로 돌아가기</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 입력 폼 데이터 (이름 & 이메일)
      form: {
        name: "",
        email: "",
      },
      foundPassword: null, // 찾은 비밀번호 저장하는 변수
      errorMessage: "", // 오류 메시지를 저장하는 변수
    };
  },
  methods: {
    // 비밀번호 찾기 기능
    findPassword() {
      //  localStorage에서 해당 이메일로 저장된 사용자 데이터 가져오기
      const userData = JSON.parse(localStorage.getItem("user_" + this.form.email));

      // 사용자가 존재하지 않는 경우
      if (!userData) {
        this.foundPassword = null;
        this.errorMessage = "등록된 사용자가 아닙니다.";
        return;
      }

      // 입력한 이름과 저장된 사용자 이름이 일치하지 않는 경우
      if (userData.name !== this.form.name) {
        this.foundPassword = null;
        this.errorMessage = "이름이 일치하지 않습니다.";
        return;
      }

      // ✅ 비밀번호 찾기 성공 시 팝업에 표시
      this.foundPassword = userData.password; // 찾은 비밀번호 변수에 저장
      this.errorMessage = ""; // 오류 메시지 초기화
    },
    goToLogin() {
      this.$router.push("/login"); // "/login" 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 비밀번호 찾기 페이지 컨테이너 */
.find-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* 비밀번호 찾기 박스 */
.find-password-box {
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

/* 비밀번호 찾기 버튼 */
.find-btn {
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

.find-btn:hover {
  background-color: #0056b3;
}

/* 팝업 스타일 (비밀번호 찾기 성공 시 표시) */
.popup {
  margin-top: 15px;
  padding: 15px;
  background-color: #e9f7ef;
  border: 1px solid #2ecc71;
  border-radius: 5px;
  font-size: 16px;
}

/* 팝업 확인 버튼 */
.confirm-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #218838;
}

/* 에러 메시지 */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
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
