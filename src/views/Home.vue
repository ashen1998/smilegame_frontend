<template class="">
  <div class="container-fluid">
    <div class="row container-fluid">
      <div class="col-6 pt-5">
        <h4 class="mb-4" style="font-weight: bold">Play the game ...!</h4>
        <div class="row">
          <div class="col-4">
            <div class="card height-340"

                 @click="selectDifficulty(DifficultyType.EASY)">
              <div class="card"
                   :style="difficultyLevel === DifficultyType.EASY ? 'background-color: darkolivegreen' : ''">
                <img class="card-img-top" src="../assets/easy.png" alt="Card image cap">
                <div class="card-body">
                  <h4 style="font-weight: 600">Easy</h4>
                  <h6 class="card-subtitle mb-2 ">Earn 10 points</h6>
                  <p class="card-text">You have 1 minute to give the answer. . . . . . </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card height-340"
                 :style="difficultyLevel === DifficultyType.MEDIUM ? 'background-color: darkolivegreen' : ''"
                 @click="selectDifficulty(DifficultyType.MEDIUM)">
              <img class="card-img-top" src="../assets/normal.png" alt="Card image cap">
              <div class="card-body">
                <h4 style="font-weight: 600">Normal</h4>
                <h6 class="card-subtitle mb-2 ">Earn 20 points</h6>
                <p class="card-text">You have 30 Seconds to give the answer</p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card"
                 @click="selectDifficulty(DifficultyType.HARD)">
              <div class="card height-340"
                   :style="difficultyLevel === DifficultyType.HARD ? 'background-color: darkolivegreen' : ''">
                <img class="card-img-top" src="../assets/difficult.png" alt="Card image cap">
                <div class="card-body">
                  <h4 style="font-weight: 600">Hard</h4>
                  <h6 class="card-subtitle mb-2 ">Earn 50 points</h6>
                  <p class="card-text">You have 15 seconds to give the answer</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 d-block m-auto pt-5">
            <div class="card shadow">
              <router-link style="background-color:#d4ad00" to="/leaderb">
                <button class="btn text-white d-block m-auto"> Leader Board</button>
              </router-link>

            </div>
          </div>
        </div>
      </div>
      <div class="col-6 container-fluid">
        <div class="row pt-5 text-black">
          <h4 class="m-0 mb-3" style="margin-left:20px; color: #202020; font-weight: bold">Smile Game <br></h4>

          <p class="font-monospace">

            Smile Game is a fun and challenging quiz game that revolves around maths-related questions. The game is
            designed to help players enhance their maths skills while having fun.
            <br><br>
            Each correct answer earns the player points, and the more questions they answer correctly, the higher their
            score. The game is designed to be both fun and educational, providing players with an opportunity to improve
            their maths skills in a fun and engaging way.
            <br><br>
            As players progress through the game, they will encounter more difficult questions that will challenge their
            maths abilities. The game is designed to be challenging, but not frustrating, ensuring that players remain
            engaged and motivated to keep playing.
            <br><br>
            Overall, Smile Game is a great way to improve your maths skills while having fun. Whether you're a student
            looking to enhance your maths abilities or just someone who enjoys challenging quiz games, Smile Game is the
            perfect choice. So put on your thinking cap and get ready to test your maths skills with Smile Game!
          </p>

          <div class="row">
            <div class="col-6">
              <router-link to="play-game">
                <button class="btn bg-danger text-white"> Start Game</button>
              </router-link>
            </div>
          </div>
        </div>
        <h5 class="mt-4 mb-4 text-black"></h5>
      </div>

    </div>
  </div>

</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import DifficultyTypeChoice from "@/models/DifficultyTypeChoice";

export default {
  name: "Home",
  computed: {
    DifficultyType() {
      return DifficultyTypeChoice
    }
  },
  setup() {
    const store = useStore();
    const {currentUser} = store.getters;
    const difficultyStyle1 = ref("background-color: darkolivegreen")
    const difficultyStyle2 = ref("background-color: darkolivegreen")
    const difficultyStyle3 = ref("background-color: darkolivegreen")
    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const selectDifficulty = (difficultyLvl) => {
      console.log("difficulty level : ", difficultyLvl, difficultyLevel.value)
      store.dispatch("updateDifficultyLevel", difficultyLvl);
    }

    onMounted(() => {
      console.log("difficulty Level onMounted ", difficultyLevel.value)
      if (difficultyLevel.value === null) {
        store.dispatch("updateDifficultyLevel", DifficultyTypeChoice.EASY);
      }
    })

    return {
      currentUser,
      difficultyLevel,
      difficultyStyle1,
      difficultyStyle2,
      difficultyStyle3,
      selectDifficulty
    }
  }

};

</script>

<style scoped>
.height-340 {
  height: 340px;
}
</style>