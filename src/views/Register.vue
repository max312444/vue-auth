<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const register = () => {
  if (!username.value || !password.value) {
    alert("모든 필드를 입력하세요.");
    return;
  }

  // 로컬 스토리지에서 기존 유저 정보 가져오기
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 아이디 중복 확인
  const existingUser = users.find(user => user.username === username.value);
  if (existingUser) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  // 새 사용자 추가
  users.push({ username: username.value, password: password.value });
  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입 성공! 로그인 해주세요.");
  router.push("/login");
};
</script>

<template>
  <div>
    <h2>회원가입</h2>
    <input v-model="username" placeholder="아이디" />
    <input v-model="password" type="password" placeholder="비밀번호" />
    <button @click="register">가입하기</button>
  </div>
</template>
