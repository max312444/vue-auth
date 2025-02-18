<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/login">로그인</RouterLink>
      <RouterLink to="/register">회원가입</RouterLink>
      <RouterLink to="/profile">프로필</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #ddd;
}
</style>
