<template>
  <!-- 회원가입 컨테이너 -->
  <div class="register-container">
    <h2>회원가입</h2>
    <!-- 사용자가 폼을 제출하면 'register()' 함수 실행 -->
    <form @submit.prevent="register">
      
      <!-- 이름 입력 필드 -->
      <div class="form-group">
        <label>이름:</label>
        <!-- v-model을 사용하여 form.name에 입력값 바인딩 -->
        <input type="text" v-model="form.name" required />
      </div>

      <!-- 이메일 입력 필드 -->
      <div class="form-group">
        <label>이메일:</label>
        <!-- v-model을 사용하여 form.email에 입력값 바인딩 -->
         <!-- @blur 이벤트로 입력이 끝났을 때 validateEmail() 실행 -->
        <input type="email" v-model="form.email" @blur="validateEmail" required />
        <!-- 이메일 중복 확인 버튼 -->
        <button type="button" @click="checkDuplicateEmail">중복 확인</button>
        <!-- 이메일 오류 메시지 표시 -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>

      <!-- 비밀번호 입력 필드 -->
      <div class="form-group">
        <label>비밀번호:</label>
        <!-- 비밀번호 입력, 6자 이상 필수 -->
        <input type="password" v-model="form.password" required minlength="6" />
      </div>

      <!-- 전화번호 입력 필드 -->
      <div class="form-group">
        <label>전화번호:</label>
        <!-- 숫자만 입력 가능하도록 validatePhone() 실행 -->
        <input type="text" v-model="form.phone" @input="validatePhone" required />
        <!-- 전화번호 오류 메시지 표시 -->
        <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
      </div>

      <!-- 생년월일 입력 필드 -->
      <div class="form-group">
        <label>생년월일:</label>
        <!-- 날짜 입력 필드 -->
        <input type="date" v-model="form.birthdate" required />
      </div>

      <!-- 성별 선택 필드 -->
      <div class="form-group">
        <label>성별:</label>
        <!-- 드롭다운에서 선택 가능 -->
        <select v-model="form.gender" required>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <!-- 키 입력 필드 -->
      <div class="form-group">
        <label>키 (cm):</label>
        <!-- 숫자 입력 필드 -->
        <input type="number" v-model="form.height" required />
      </div>

      <!-- 프로필 사진 업로드 -->
      <div class="form-group">
        <label>프로필 사진 업로드:</label>
        <input type="file" @change="uploadImage" accept="image/*" />
        <!-- 업로드된 사진 미리보기 -->
        <div v-if="form.photo">
          <img :src="form.photo" alt="업로드된 사진" class="preview-img" />
        </div>
      </div>

      <!-- 버튼 정렬 (가입하기 & 취소 버튼) -->
      <div class="button-group">
        <button type="submit">가입하기</button>
        <button type="button" class="cancel-btn" @click="cancelRegister">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 사용자 입력 데이터 저장 객체
      form: {
        name: "",
        email: "",
        password: "",
        phone: "",
        birthdate: "",
        gender: "",
        height: "",
        photo: null, // Base64로 변환된 프로필 사진 데이터 저장
      },
      errorMessage: "", // 이메일 오류 메시지
      phoneError: "", // 전화번호 오류 메시지
      storedEmails: JSON.parse(localStorage.getItem("registeredEmails")) || [] // 저장된 이메일 목록 불러우기
    };
  },
  methods: {
    // 이메일 형식 및 허용된 도메인 확인
    validateEmail() {
      const allowedDomains = ["daum.net", "naver.com", "gmail.com", "g.yju.ac.kr"]; // 허용된 도메인 목록
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 형식 검사 정규식
      const domain = this.form.email.split("@")[1]; // 이메일에서 도메인 부분 추출

      // 이메일 형식이 맞지 않는 경우
      if (!emailRegex.test(this.form.email)) {
        this.errorMessage = "올바른 이메일 형식이 아닙니다.";
        return false;
      }
      // 허용된 도메인 목록에 없을 경우
      if (!allowedDomains.includes(domain)) {
        this.errorMessage = "허용되지 않은 이메일 도메인입니다.";
        return false;
      }

      this.errorMessage = ""; // 오류 없으면 초기화
      return true;
    },

    // 이메일 중복 검사
    checkDuplicateEmail() {
      if (!this.validateEmail()) return;

      if (this.storedEmails.includes(this.form.email)) {
        this.errorMessage = "이미 사용 중인 이메일입니다.";
      } else {
        alert("사용 가능한 이메일입니다.");
      }
    },

    // 전화번호 유효성 검사 (숫자만 입력)
    validatePhone() {
      const phoneRegex = /^[0-9]{10,11}$/; // 10~11자리 숫자 형식 확인인
      if (!phoneRegex.test(this.form.phone)) {
        this.phoneError = "전화번호는 숫자만 입력해야 하며, 10~11자리여야 합니다.";
      } else {
        this.phoneError = "";
      }
    },

    // 이미지 업로드 및 Base64 변환
    uploadImage(event) {
      const file = event.target.files[0]; // 업로드된 파일 가져오기
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // 파일을 Base64 형식으로 변환
        reader.onload = () => {
          this.form.photo = reader.result; // 변환된 데이터를 form.photo에 저장
        };
      }
    },

    // 회원가입 처리
    register() {
      if (!this.validateEmail()) return;
      if (this.storedEmails.includes(this.form.email)) {
        this.errorMessage = "이미 등록된 이메일입니다.";
        return;
      }
      if (this.form.password.length < 6) {
        this.errorMessage = "비밀번호는 최소 6자리 이상이어야 합니다.";
        return;
      }
      if (!this.form.photo) {
        this.errorMessage = "프로필 사진을 업로드해주세요.";
        return;
      }

      // 사용자 정보 로컬스토리지에 저장
      const userData = { ...this.form };
      localStorage.setItem("user_" + this.form.email, JSON.stringify(userData));

      localStorage.setItem("profilePhoto_" + this.form.email, this.form.photo);

      alert("회원가입 완료!");
      this.$router.push("/login"); // 로그인 페이지로 이동
    },

    // 취소 버튼 클릭 시 로그인 페이지로 이동
    cancelRegister() {
      if (confirm("회원가입을 취소하시겠습니까?")) {
        this.$router.push("/login"); 
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 🔹 버튼 그룹 스타일 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

/* 가입하기 버튼 */
button {
  flex: 1;
  padding: 10px;
  margin: 5px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #4cae4c;
}

/* 🔹 취소 버튼 스타일 */
.cancel-btn {
  background-color: #d9534f;
}

.cancel-btn:hover {
  background-color: #c9302c;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.preview-img {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
