<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  // 로컬 스토리지에서 유저 정보 가져오기
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 아이디, 비밀번호 확인
  const user = users.find(u => u.username === username.value && u.password === password.value);

  if (!user) {
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    return;
  }

  // 로그인한 사용자 정보 저장
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("로그인 성공!");
  router.push("/profile");
};
</script>

<template>
  <div>
    <h2>로그인</h2>
    <input v-model="username" placeholder="아이디" />
    <input v-model="password" type="password" placeholder="비밀번호" />
    <button @click="login">로그인</button>
  </div>
</template>
