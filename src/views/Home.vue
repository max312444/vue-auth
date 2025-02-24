<template>
  <div class="main-container">
    <!-- 왼쪽 섹션 (회원 정보 표시) -->
    <div class="left-section">
      <div class="welcome-box">
        <h3>환영합니다, {{ user.name }} 님!</h3>
        <!-- 로그아웃 버튼 -->
        <button @click="logout">로그아웃</button>
        <!-- 회원탈퇴 버튼 -->
        <button @click="deleteAccount" class="delete-btn">회원 탈퇴</button>
      </div>
      <!-- 회원 정보 -->
      <div class="user-info">
        <h3>회원 정보</h3>
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>이메일:</strong> {{ user.email }}</p>
        <p><stong>전화번호:</stong> {{ user.phone }}</p>
        <p><strong>생년월일:</strong> {{ user.birthdate }}</p>
        <p><strong>성별:</strong> {{ user.gender }}</p>
        <p><strong>키:</strong> {{ user.height }} cm</p>
      </div>
    </div>

    <!-- 가운데 섹션 (회원 사진 & 선택한 사진) -->
    <div class="center-section">
      <!-- 회원 프로필 사진 (클릭하면 확대) -->
      <div class="photo-box" @click="openModal(user.photo)">
        <h3>초기 회원 사진</h3>
        <div v-if="user.photo">
          <img :src="user.photo" alt="회원 사진" class="profile-photo" />
        </div>
        <p v-else>🚧 아직 사진이 없습니다.</p>
      </div>

      <!-- 선택한 사진 (클릭하면 확대) -->
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
        <p>📷 클릭하면 사진이 가운데 표시됩니다.</p>
        <ul>
          <li v-for="(photo, index) in photoList" :key="index">
            <!-- 클릭하면 선택한 사진이 가운데 표시됨 -->
            <span @click="selectPhoto(photo.url)" class="photo-item">{{ photo.date }} - {{ photo.name }}</span>
            <!-- 사진 삭제 버튼 -->
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
        birthdate: "",
        gender: "",
        height: "",
        photo: "", // 프로필 사진
      },
      photoList: JSON.parse(localStorage.getItem("photoList")) || [],
      selectedPhoto: null, // 선택한 사진
      isModalOpen: false, // 모달 열림 상태
      modalImage: "", // 모달에 표시할 이미지
    };
  },
  created() {
    // 로그인된 사용자 정보를 불러옴
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login"); // 로그인 페이지로 이동
    } else {
      // 로컬스토리지에서 사용자 정보 가져오기
      const userData = JSON.parse(localStorage.getItem("user_" + loggedInUser));
      if (userData) {
        this.user = userData;
        // 저장된 프로필 사진 불러오기
        this.user.photo = localStorage.getItem("profilePhoto_" + loggedInUser) || ""; // 프로필 사진 불러오기
      }
    }
  },
  methods: {
    // 로그아웃 기능
    logout() {
      localStorage.removeItem("loggedInUser"); // 로그인 정보 삭제
      alert("로그아웃되었습니다.");
      this.$router.push("/login"); // 로그인 페이지로 이동
    },

    // 회원 탈퇴 기능
    deleteAccount() {
      if (confirm("정말 회원 탈퇴하시겠습니까?")) {
        localStorage.removeItem("user_" + this.user.email); // 사용자 데이터 삭제
        localStorage.removeItem("profilePhoto_" + this.user.email); // 프로필 사진 삭제
        localStorage.removeItem("loggedInUser"); // 로그인 정보 삭제
        localStorage.removeItem("photoList"); // 사진 목록 삭제
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push("/login"); // 로그인 페이지로 이동
      }
    },

    // 선택한 사진 변경
    selectPhoto(photoUrl) {
      this.selectedPhoto = photoUrl;
    },

    // 사진 삭제 기능
    deletePhoto(index) {
      if (confirm("이 사진을 삭제하시겠습니까?")) {
        this.photoList.splice(index, 1); // 배열에서 삭제
        localStorage.setItem("photoList", JSON.stringify(this.photoList)); // 로컬스토리지 업데이트
        alert("사진이 삭제되었습니다.");
      }
    },

    // 사진 업로드 기능
    uploadPhoto(event) {
      const file = event.target.files[0]; // 선택한 파일 가져오기
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // 파일을 Base64로 변환
        reader.onload = () => {
          const newPhoto = {
            date: new Date().toISOString().split("T")[0], // 업로드 날짜 저장
            name: file.name, // 파일 이름 저장
            url: reader.result, // Base64로 변환된 이미지 저장
          };
          this.photoList.push(newPhoto); // 사진 목록에 추가
          localStorage.setItem("photoList", JSON.stringify(this.photoList)); // 로컬스토리지 업데이트
          alert("사진이 추가되었습니다.");
        };
      }
    },

    // 파일 입력 트리거 (버튼 클릭 시 파일 선택 창 열기)
    triggerFileInput() {
      document.querySelector("input[type='file']").click();
    },

    // 모달 열기(사진 확대 보기)
    openModal(imageUrl) {
      if (imageUrl) {
        this.modalImage = imageUrl;
        this.isModalOpen = true;
      }
    },

    // 모달 닫기기
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
</style>
