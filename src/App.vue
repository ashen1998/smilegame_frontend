<template>
  <div :style="cssProps" class="height-set">
    <nav class="navbar navbar-expand navbar-dark bg-dark shadow-lg ">
      <router-link class="navbar-brand ms-1" to="/">
        <h1 style="margin-left:20px; color: #e8ede9; font-weight: bold"> Smile.<span style="color: #d4ad00">Rat</span>
        </h1>
      </router-link>

      <div class="navbar-nav ms-auto" v-if="!currentUser" style="margin-right:100px;font-weight: bold">
        <li class="nav-item">
          <router-link class="nav-link text-white-50" to="/register" active-class="active">
            Sign Up
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link text-white-50" to="/" active-class="active">
            Sign In
          </router-link>
        </li>
      </div>
      <div class="navbar-nav ms-auto" v-if="currentUser" style="margin-right:100px;font-weight: bold">
        <li class="nav-item ">
          <router-link class="nav-link text-white-50" to="/home" active-class="active">
            {{ currentUser.name }}
          </router-link>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link text-white-50" @click="handleLogOut">
            Sign Out
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>

import vuex from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      cssProps: {

        backgroundImage: 'linear-gradient(to right, #ffffff , #ffffff)'
      }
    }
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),

  },

  methods: {
    ...vuex.mapActions(["clearUser"]),

    handleLogOut() {
      this.clearUser();
      router.push("/");
    }
  }
};
</script>

<style>
.height-set {
  height: 960px;
}
</style>
