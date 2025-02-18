<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedInUser = ref(JSON.parse(localStorage.getItem("loggedInUser")));

const logout = () => {
  localStorage.removeItem("loggedInUser");
  alert("로그아웃 되었습니다.");
  router.push("/login");
};

const deleteAccount = () => {
  if (!confirm("정말 탈퇴하시겠습니까?")) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.filter(user => user.username !== loggedInUser.value.username);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  localStorage.removeItem("loggedInUser");
  alert("회원 탈퇴 완료!");
  router.push("/register");
};
</script>

<template>
  <div v-if="loggedInUser">
    <h2>프로필</h2>
    <p>아이디: {{ loggedInUser.username }}</p>
    <button @click="logout">로그아웃</button>
    <button @click="deleteAccount">회원 탈퇴</button>
  </div>
  <div v-else>
    <p>로그인이 필요합니다.</p>
    <router-link to="/login">로그인</router-link>
  </div>
</template>
