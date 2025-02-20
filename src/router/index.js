import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import FindPassword from '../views/FindPassword.vue'; // ✅ 추가

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
  { path: '/find-password', component: FindPassword }, // ✅ 추가
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
