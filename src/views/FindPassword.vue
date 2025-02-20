<template>
    <div class="find-password-container">
      <div class="find-password-box">
        <h2>비밀번호 찾기</h2>
        <form @submit.prevent="findPassword">
          <div class="form-group">
            <label>이름 (아이디):</label>
            <input type="text" v-model="form.name" required />
          </div>
  
          <div class="form-group">
            <label>전화번호:</label>
            <input type="text" v-model="form.phone" required placeholder="01012345678" />
          </div>
  
          <button type="submit" class="find-btn">비밀번호 찾기</button>
        </form>
  
        <p v-if="foundPassword" class="result-text">
          비밀번호는 <strong>{{ foundPassword }}</strong> 입니다.
        </p>
  
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
        form: {
          name: "",
          phone: "",
        },
        foundPassword: null,
      };
    },
    methods: {
      findPassword() {
        const userData = JSON.parse(localStorage.getItem("user_" + this.form.name));
  
        if (!userData) {
          alert("등록된 사용자가 아닙니다.");
          return;
        }
  
        if (userData.phone !== this.form.phone) {
          alert("전화번호가 일치하지 않습니다.");
          return;
        }
  
        this.foundPassword = userData.password;
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
    width: 95%; /* 입력 필드 크기 조정 */
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
  
  /* 결과 텍스트 */
  .result-text {
    margin-top: 15px;
    font-size: 16px;
    color: #333;
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
  