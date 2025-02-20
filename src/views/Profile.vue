<template>
  <div>
    <h2>프로필</h2>
    <div v-if="user">
      <p><strong>이름:</strong> {{ user.name }}</p>
      <p><strong>전화번호:</strong> {{ user.phone }}</p>
      <p><strong>생년월일:</strong> {{ user.birthdate }}</p>
      <p><strong>성별:</strong> {{ user.gender }}</p>
      <p><strong>키:</strong> {{ user.height }} cm</p>
      <button @click="logout">로그아웃</button>
      <button @click="deleteAccount" style="color: red; margin-left: 10px;">회원 탈퇴</button>
    </div>
    <div v-else>
      <p>로그인 상태가 아닙니다.</p>
      <router-link to="/login">로그인하기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      this.user = JSON.parse(localStorage.getItem("user_" + loggedInUser));
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedInUser");
      alert("로그아웃되었습니다.");
      this.$router.push("/");
    },
    deleteAccount() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        localStorage.removeItem("user_" + this.user.name); // 회원 정보 삭제
        localStorage.removeItem("loggedInUser"); // 로그인 상태 삭제
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push("/"); // 홈페이지로 이동
      }
    },
  },
};
</script>
