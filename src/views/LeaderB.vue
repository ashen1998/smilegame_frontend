<template class="">
  <section class="main-content">
    <div class="container">
      <h2 class="text-center mt-2">Top Players</h2>
      <br>
      <br>
      <table class="table">
        <thead>
        <tr>
          <th>Place</th>
          <th>UserName</th>
          <th>Full Name</th>
          <th>Points</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(player, index) in players">
          <td>
            <img :src="loadAwardImg(index)" style="width: 50px" class="circle-img circle-img--small mr-2" alt="">
          </td>
          <td>
            <div class="user-info__basic">
              <h5 class="mb-0">{{ player.username }}</h5>
            </div>
          </td>
          <td>{{ player.name }}</td>
          <td>
            <h3 class="fw-bold">{{ player.score }}</h3>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import {onMounted, ref} from "vue";
import GameService from "@/services/gameService";

export default {
  name: "LeaderB",
  setup() {
    const players = ref([]);
    const firstPlace = "https://i.ibb.co/dPZNWqs/first.png"
    const secondPlace = "https://i.ibb.co/t2WXDp4/2nd.jpg"
    const thirdPlace = "https://i.ibb.co/VQQxC6Z/3rd.jpg"
    const otherPlaces = "https://i.ibb.co/hBbwW8p/top10.png"

    const loadAwardImg = (index) => {
      if (index === 0) return firstPlace;
      else if (index === 1) return secondPlace;
      if (index === 2) return thirdPlace;
      if (index >= 3) return otherPlaces;
    }

    onMounted(async () => {
      let {data} = await GameService.getAllTopScorePlayers();
      players.value = data;
    })

    return {
      players,
      loadAwardImg
    }
  }
};

</script>
