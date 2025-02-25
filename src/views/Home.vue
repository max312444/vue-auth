<template>
  <div class="main-container">
    <!-- 왼쪽 섹션 (회원 정보 표시) -->
    <div class="left-section">
      <div class="welcome-box">
        <h3>환영합니다, {{ user.name }} 님!</h3>
        <button @click="logout">로그아웃</button>
        <button @click="deleteAccount" class="delete-btn">회원 탈퇴</button>
      </div>

      <!-- 회원 정보 (수정 가능) -->
      <div class="user-info">
        <h3>회원 정보</h3>

        <div v-if="!isEditing">
          <p><strong>이름:</strong> {{ user.name }}</p>
          <p><strong>이메일:</strong> {{ user.email }}</p>
          <p><strong>전화번호:</strong> {{ user.phone }}</p>
          <p><strong>생년월일:</strong> {{ user.birthdate }}</p>
          <p><strong>성별:</strong> {{ user.gender }}</p>
          <p><strong>키:</strong> {{ user.height }} cm</p>
          <button @click="enableEditing" class="edit-btn">회원 정보 수정</button>
        </div>

        <!-- 수정 폼 -->
        <div v-else>
          <label>이름:</label>
          <input type="text" v-model="editUser.name" />
          <br />

          <label>전화번호:</label>
          <input type="text" v-model="editUser.phone" />
          <br />

          <label>생년월일:</label>
          <input type="date" v-model="editUser.birthdate" />
          <br />

          <label>성별:</label>
          <select v-model="editUser.gender">
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="기타">기타</option>
          </select>
          <br />

          <label>키 (cm):</label>
          <input type="number" v-model="editUser.height" />

          <button @click="saveChanges" class="save-btn">완료</button>
          <button @click="cancelEditing" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>

    <!-- 가운데 섹션 (회원 사진 & 선택한 사진) -->
    <div class="center-section">
      <div class="photo-box" @click="openModal(user.photo)">
        <h3>초기 회원 사진</h3>
        <div v-if="user.photo">
          <img :src="user.photo" alt="회원 사진" class="profile-photo" />
        </div>
      </div>

      <div class="selected-photo-box" @click="openModal(selectedPhoto)">
        <h3>선택한 사진</h3>
        <div v-if="selectedPhoto">
          <img :src="selectedPhoto" alt="선택한 사진" class="selected-photo" />
        </div>
        <p v-else>사진 목록에서 사진을 선택하세요.</p>
      </div>
    </div>

    <!-- 오른쪽 섹션 (사진 목록 & 삭제 & 업로드) -->
    <div class="right-section">
      <div class="photo-list">
        <h3>사진 목록</h3>
        <p>클릭하면 사진이 가운데 표시됩니다.</p>
        <ul>
          <li v-for="(photo, index) in photoList" :key="index">
            <span @click="selectPhoto(photo.url)" class="photo-item">{{ photo.date }} - {{ photo.name }}</span>
            <button @click="deletePhoto(index)" class="delete-photo-btn">삭제</button>
          </li>
        </ul>

        <!-- 사진 삽입 버튼 -->
        <div class="photo-upload">
          <input type="file" @change="uploadPhoto" accept="image/*" />
          <button @click="triggerFileInput" class="upload-btn">사진 삽입</button>
        </div>
      </div>
    </div>

    <!-- 모달 (사진 확대 보기) -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">X</button>
        <img :src="modalImage" class="modal-image" />
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
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        height: "",
        photo: "",
      },
      editUser: {}, // 수정할 데이터를 저장할 객체
      isEditing: false, // 수정 모드 활성화 여부
      photoList: [],
      selectedPhoto: null,
      isModalOpen: false,
      modalImage: "",
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/");
    } else {
      const userData = JSON.parse(localStorage.getItem("user_" + loggedInUser));
      if (userData) {
        this.user = userData;
        this.user.photo = localStorage.getItem("profilePhoto_" + loggedInUser) || "";
        this.photoList = JSON.parse(localStorage.getItem(`photoList_${this.user.email}`)) || [];
      }
    }
  },
  methods: {
    enableEditing() {
      this.editUser = { ...this.user };
      this.isEditing = true;
    },

    // 회원 정보 수정 함수
    saveChanges() {
      this.user = { ...this.editUser };
      localStorage.setItem("user_" + this.user.email, JSON.stringify(this.user));
      alert("회원 정보가 수정되었습니다.");
      this.isEditing = false;
    },

    // 수정 취소 함수
    cancelEditing() {
      this.isEditing = false;
    },

    // 로그아웃 함수
    logout() {
      localStorage.removeItem("loggedInUser");
      alert("로그아웃되었습니다.");
      this.$router.push("/");
    },

    // 회원 탈퇴 함수
    deleteAccount() {
      if (confirm("정말 회원 탈퇴하시겠습니까?")) {
        localStorage.removeItem("user_" + this.user.email);
        localStorage.removeItem("profilePhoto_" + this.user.email);
        localStorage.removeItem(`photoList_${this.user.email}`);
        localStorage.removeItem("loggedInUser");
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push("/");
      }
    },

    // 사진 선택 함수
    selectPhoto(photoUrl) {
      this.selectedPhoto = photoUrl;
    },

    // 사진 삭제 함수
    deletePhoto(index) {
      if (confirm("이 사진을 삭제하시겠습니까?")) {
        this.photoList.splice(index, 1);
        localStorage.setItem(`photoList_${this.user.email}`, JSON.stringify(this.photoList));
        alert("사진이 삭제되었습니다.");
      }
    },

    // 사진 업로드 함수
    uploadPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const newPhoto = {
            date: new Date().toISOString().split("T")[0],
            name: file.name,
            url: reader.result,
          };
          this.photoList.push(newPhoto);
          localStorage.setItem(`photoList_${this.user.email}`, JSON.stringify(this.photoList));
          alert("사진이 추가되었습니다.");
        };
      }
    },
    
    // HTML 요소를 프로그래밍적으로 클릭하는 함수
    triggerFileInput() {
      document.querySelector("input[type='file']").click();
    },

    // 모달 여는 함수
    openModal(imageUrl) {
      if (imageUrl) {
        this.modalImage = imageUrl;
        this.isModalOpen = true;
      }
    },

    // 모달 닫는 함수
    closeModal() {
      this.isModalOpen = false;
      this.modalImage = "";
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

/* 왼쪽 회원 정보 스타일 */
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

/* 사진 블록 가로 배치 */
.center-section {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  justify-content: center;
  align-items: flex-start;
  gap: 20px; /* 사진 블록 간격 */
}

/* 개별 사진 박스 스타일 */
.photo-box, .selected-photo-box {
  width: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer; /* 클릭 가능하도록 변경 */
}

/* 사진 스타일 */
.profile-photo, .selected-photo {
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

/* 오른쪽 사진 목록 스타일 */
.photo-list {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.photo-item {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
  margin-right: 10px;
}

.photo-item:hover {
  color: #0056b3;
}

/* 삭제 및 업로드 버튼 */
.delete-photo-btn, .upload-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.delete-photo-btn:hover, .upload-btn:hover {
  background: #0056b3;
}

/* 사진 업로드 입력 숨김 */
input[type="file"] {
  display: none;
}

/* ✅ 모달(팝업) 스타일 추가 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-image {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

/* 회원정보 수정 폼 스타일 */
.user-info input, 
.user-info select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 12px; /* 입력 필드 간 여백 추가 */
}

/* 수정 버튼 스타일 */
.edit-btn, .save-btn, .cancel-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.save-btn {
  background-color: #28a745; /* 초록색 (저장 버튼) */
}

.cancel-btn {
  background-color: #dc3545; /* 빨간색 (취소 버튼) */
}

.edit-btn:hover, .save-btn:hover, .cancel-btn:hover {
  opacity: 0.8;
}

/* 회원정보 수정 칸 간격 조절 */
.user-info label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

/* 버튼 간격 */
.save-btn, .cancel-btn {
  margin-right: 5px;
}

</style>
