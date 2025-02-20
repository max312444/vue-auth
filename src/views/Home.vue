<template>
  <div class="main-container">
    <!-- 왼쪽 섹션 (환영 메시지 + 로그아웃 & 회원 탈퇴 버튼 + 프로필) -->
    <div class="left-section">
      <div class="welcome-box">
        <h3>환영합니다, {{ user.name }} 님!</h3>
        <button @click="logout">로그아웃</button>
        <button @click="deleteAccount" class="delete-btn">회원 탈퇴</button>
      </div>
      <div class="user-info">
        <h3>회원 정보</h3>
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>전화번호:</strong> {{ user.phone }}</p>
        <p><strong>생년월일:</strong> {{ user.birthdate }}</p>
        <p><strong>성별:</strong> {{ user.gender }}</p>
        <p><strong>키:</strong> {{ user.height }} cm</p>

        <!-- 회원 정보 수정 버튼 -->
        <button @click="isEditing = true" class="edit-btn">회원 정보 수정</button>

        <!-- 회원 정보 수정 폼 -->
        <div v-if="isEditing" class="edit-form">
          <h3>회원 정보 수정</h3>
          <label>이름:</label>
          <input type="text" v-model="editUser.name" />

          <label>전화번호:</label>
          <input type="text" v-model="editUser.phone" />

          <label>생년월일:</label>
          <input type="date" v-model="editUser.birthdate" />

          <label>성별:</label>
          <select v-model="editUser.gender">
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>

          <label>키 (cm):</label>
          <input type="number" v-model="editUser.height" />

          <button @click="saveChanges" class="save-btn">저장</button>
          <button @click="isEditing = false" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>

    <!-- 가운데 섹션 (회원 사진 영역 - 미구현) -->
    <div class="center-section">
      <div class="photo-box">
        <h3>회원 사진</h3>
        <p>🚧 이 영역에 사진이 들어갈 예정입니다.</p>
      </div>
    </div>

    <!-- 오른쪽 섹션 (사진 및 사진 목록) -->
    <div class="right-section">
      <div class="photo-list">
        <h3>사진 목록</h3>
        <p>📷 날짜별 사진 정렬</p>
        <ul>
          <li v-for="(photo, index) in photoList" :key="index">
            {{ photo.date }} - {{ photo.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        phone: "",
        birthdate: "",
        gender: "",
        height: "",
      },
      editUser: {}, // 수정할 데이터를 저장할 객체
      isEditing: false, // 수정 모드 활성화 여부
      photoList: [
        { date: "2025-02-19", name: "운동 사진" },
        { date: "2025-02-18", name: "외출 사진" },
        { date: "2025-02-17", name: "가족 사진" },
      ],
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
    } else {
      const userData = JSON.parse(localStorage.getItem("user_" + loggedInUser));
      if (userData) {
        this.user = userData;
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedInUser");
      alert("로그아웃되었습니다.");
      this.$router.push("/login");
    },
    deleteAccount() {
      if (confirm("정말 회원 탈퇴하시겠습니까?")) {
        localStorage.removeItem("user_" + this.user.name);
        localStorage.removeItem("loggedInUser");
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push("/login");
      }
    },
    editProfile() {
      this.editUser = { ...this.user }; // 기존 데이터를 수정할 데이터에 복사
      this.isEditing = true;
    },
    saveChanges() {
      // 변경 사항 저장
      this.user = { ...this.editUser };
      localStorage.setItem("user_" + this.user.name, JSON.stringify(this.user));

      alert("회원 정보가 수정되었습니다.");
      this.isEditing = false; // 수정 모드 종료
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.left-section, .center-section, .right-section {
  flex: 1;
  padding: 10px;
}

.welcome-box {
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 10px;
}

.welcome-box button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.delete-btn {
  background-color: red;
  color: white;
}

.user-info {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* 회원 정보 수정 버튼 */
.edit-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 수정 폼 */
.edit-form {
  margin-top: 15px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.edit-form input,
.edit-form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 저장 및 취소 버튼 */
.save-btn {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: gray;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
