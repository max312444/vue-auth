<template>
  <div class="register-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register">
      
      <div class="form-group">
        <label>이름:</label>
        <input type="text" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label>전화번호:</label>
        <input type="text" v-model="form.phone" required placeholder="01012345678" />
      </div>

      <div class="form-group">
        <label>생년월일:</label>
        <input type="date" v-model="form.birthdate" required />
      </div>

      <div class="form-group">
        <label>성별:</label>
        <select v-model="form.gender" required>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타타</option>
        </select>
      </div>

      <div class="form-group">
        <label>키 (cm):</label>
        <input type="number" v-model="form.height" required />
      </div>

      <button type="submit">가입하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        birthdate: "",
        gender: "",
        height: "",
      },
    };
  },
  methods: {
    register() {
      if (this.form.phone.length < 4) {
        alert("전화번호를 올바르게 입력하세요.");
        return;
      }

      // 비밀번호는 전화번호의 마지막 4자리
      const password = this.form.phone.slice(-4);

      // 사용자 정보 저장 (임시 데이터 저장)
      const userData = {
        name: this.form.name,
        phone: this.form.phone,
        password: password, // 전화번호의 마지막 4자리
        birthdate: this.form.birthdate,
        gender: this.form.gender,
        height: this.form.height,
      };

      localStorage.setItem("user_" + this.form.name, JSON.stringify(userData));
      alert("회원가입 완료!");
      this.$router.push("/login");
    },
  },
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
  margin-bottom: 15px; /* 각 입력칸 간격 조정 */
}

label {
  display: block; /* 줄바꿈 적용 */
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
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
</style>
