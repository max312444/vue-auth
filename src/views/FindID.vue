<template>
    <!-- 아이디 찾기 페이지 전체 컨테이너 -->
    <div class="find-id-container">
      <div class="find-id-box">
        <h2>아이디 찾기</h2>

        <!-- 아이디 찾기 폼 -->
        <form @submit.prevent="findID">
          <div class="form-group">
            <label>이름:</label>
            <input type="text" v-model="form.name" required />
          </div>
  
          <div class="form-group">
            <label>전화번호:</label>
            <input type="text" v-model="form.phone" required placeholder="01012345678" />
          </div>
  
          <button type="submit" class="find-btn">아이디 찾기</button>
        </form>
  
        <!-- 아이디 찾기 성공 시 표시되는 팝업 -->
        <div v-if="foundID" class="popup">
          <p>회원님의 이메일(아이디)은 <strong>{{ foundID }}</strong> 입니다.</p>
          <button @click="goToLogin" class="confirm-btn">확인</button>
        </div>
  
        <!-- 아이디 찾기 실패 시 에러 메시지 표시 -->
        <div v-if="errorMessage" class="error-message">
          <p>{{ errorMessage }}</p>
        </div>
  
        <!-- 로그인 페이지로 이동하는 링크 -->
        <div class="links">
          <p><router-link to="/">로그인으로 돌아가기</router-link></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 입력 폼 데이터 (이름, 전화번호)
        form: {
          name: "",
          phone: "",
        },
        foundID: null, // 찾은 아이디를 저장하는 변수
        errorMessage: "", // 오류 메시지를 저장하는 변수
      };
    },
    methods: {
        // 아이디 찾기 기능
      findID() {
        let foundUser = null; // 일치하는 유저를 저장할 변수
  
        // localStorage에 저장된 모든 유저 데이터 검색
        for (let key in localStorage) {
          if (key.startsWith("user_")) { // "user_"로 시작하는 키만 검색 (회원 데이터)
            const userData = JSON.parse(localStorage.getItem(key)); // JSON을 객체로 변환
  
            // 입력한 이름과 전화번호가 일치하는 경우 찾기
            if (userData && userData.name === this.form.name && userData.phone === this.form.phone) {
              foundUser = userData;
              break; // 찾으면 반복문 종료
            }
          }
        }
  
        // 유저가 존재하면 이메일(아이디) 표시, 없으면 오류 메시지 출력
        if (foundUser) {
          this.foundID = foundUser.email; // 찾은 이메일 저장
          this.errorMessage = ""; // 오류 메시지 초기화
        } else {
          this.foundID = null;
          this.errorMessage = "입력하신 정보와 일치하는 아이디가 없습니다.";
        }
      },
      // 로그인 페이지로 이동하는 함수
      goToLogin() {
        this.$router.push("/"); // "/login' 페이지로 이동동
      },
    },
  };
  </script>
  
  <style scoped>
  /* 아이디 찾기 페이지 컨테이너 */
  .find-id-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  /* 아이디 찾기 박스 */
  .find-id-box {
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
  
  /* 아이디 찾기 버튼 */
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
  
  /* 팝업 스타일 */
  .popup {
    margin-top: 15px;
    padding: 15px;
    background-color: #e9f7ef;
    border: 1px solid #2ecc71;
    border-radius: 5px;
    font-size: 16px;
  }
  
  /* 확인 버튼 */
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
  