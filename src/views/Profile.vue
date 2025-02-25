<template>
  <div>
    <h2>프로필</h2>
    <!-- 로그인한 사용자의 정보가 존재하면 표시 -->
    <div v-if="user">
      <p><strong>이름:</strong> {{ user.name }}</p>
      <p><strong>이메일:</strong> {{ user.email }}</p>
      <p><strong>전화번호:</strong> {{ user.phone }}</p>
      <p><strong>생년월일:</strong> {{ user.birthdate }}</p>
      <p><strong>성별:</strong> {{ user.gender }}</p>
      <p><strong>키:</strong> {{ user.height }} cm</p>

      <!-- 로그아웃 버튼 -->
      <button @click="logout">로그아웃</button>
      <!-- 회원 탈퇴 버튼 (삭제 확인 메시지 포함) -->
      <button @click="deleteAccount" style="color: red; margin-left: 10px;">회원 탈퇴</button>
    </div>
    <!-- 로그인 상태가 아닐 경우 로그인 링크 표시 -->
    <div v-else>
      <p>로그인 상태가 아닙니다.</p>
      <router-link to="/">로그인하기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // 로그인한 사용자의 데이터를 저장할 변수
    };
  },
  created() {
    // localstorage에서 로그인한 사용자 정보 가져오기
    const loggedInUser = localStorage.getItem("loggedInUser");

    // 로그인한 사용자가 있다면 해당 정보 가져와서 user에 저장
    if (loggedInUser) {
      this.user = JSON.parse(localStorage.getItem("user_" + loggedInUser));
    }
  },
  methods: {
    // 로그아웃 기능
    logout() {
      localStorage.removeItem("loggedInUser"); // 로그인 상태 삭제
      alert("로그아웃되었습니다.");
      this.$router.push("/"); // 로그인 페이지로 이동
    },

    // 회원 탈퇴 기능
    deleteAccount() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        localStorage.removeItem("user_" + this.user.email); // 해당 유저 정보 삭제
        localStorage.removeItem("loggedInUser"); // 로그인 상태 삭제
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push("/"); // 로그인으로 이동
      }
    },
  },
};
</script>
