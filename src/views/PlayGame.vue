<template>
  <div style="">
    <div class="container-fluid row mt-5">
      <div class="marks col-2 d-block m-auto p-2 mt-2">
        <h3 class="text-center">Marks : <span style="font-size: 75px">{{currentUserScore}}</span></h3>
      </div>
      <div class="col-12 game-div">
        <img style="margin: auto; display: block" :src="imageUrl" alt="">
      </div>
      <div class="col-12 d-block m-auto">
        <h6 class="text-center">Countdown</h6>
        <h2 class="text-center">{{ original.count }}</h2>
      </div>
      <div class="bot-set">
        <img src="../assets/rat.gif" style="border-radius:25px; padding-left: 10px; width: 100%" alt="">
      </div>
      <div class="col-4 mt-2 game-input d-block m-auto form-group card text-center">
        <div class="card-body">
          <h4 class="mb-4">Select the correct Answer</h4>
          <div class="row">
            <div class="text-white col-2">
              <button @click="submitAnswer(0)" class="btn-lg bg-dark text-white ">0</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(1)" class="btn-lg bg-dark text-white ">1</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(2)" class="btn-lg bg-dark text-white ">2</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(3)" class="btn-lg bg-dark text-white ">3</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(4)" class="btn-lg bg-dark text-white ">4</button>
            </div>
          </div>
          <div class="row mt-4">
            <div class="text-white col-2">
              <button @click="submitAnswer(5)" class="btn-lg bg-dark text-white ">5</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(6)" class="btn-lg bg-dark text-white ">6</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(7)" class="btn-lg bg-dark text-white ">7</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(8)" class="btn-lg bg-dark text-white ">8</button>
            </div>
            <div class="text-white col-2">
              <button @click="submitAnswer(9)" class="btn-lg bg-dark text-white ">9</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, readonly, ref, watchEffect} from "vue";
import GameService from "@/services/gameService";
import Swal from "sweetalert2";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import difficultyType from "@/models/DifficultyTypeChoice";
import DifficultyTypeChoice from "@/models/DifficultyTypeChoice";

export default {
  name: "PlayGame",

  setup() {
    const store = useStore();
    const router = useRouter();
    const {currentUser} = store.getters;
    const imageUrl = ref("");
    const correctAnswer = ref(null);
    const userAnswer = ref(null);
    const countDown = ref(0)
    const currentUserScore = ref(0)

    const difficultyLevel = computed(() => store.getters.difficultyLevel)

    const original = reactive({count: 0})

    const copy = readonly(original)

    watchEffect(() => {
      console.log(copy.count)
    })

    const saveAnswerFunc = () => {
      let score = 10;
      if (difficultyLevel.value === DifficultyTypeChoice.EASY) score = 10;
      if (difficultyLevel.value === DifficultyTypeChoice.MEDIUM) score = 20;
      if (difficultyLevel.value === DifficultyTypeChoice.HARD) score = 50;

      console.log("saveAnswerFunc : ", currentUser?.id, score)
      GameService.setPlayerScore(currentUser.id, score)
    }

    const submitAnswer = (answer) => {
      userAnswer.value = answer
      console.log("answer submitted : ", userAnswer.value);
      if (userAnswer.value === correctAnswer.value) {
        Swal.fire(
            "You won",
            "You have won the level",
            "success"
        );
        saveAnswerFunc()

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are lost!"
        });

      }

      setTimeout(function () {
        window.location.reload();
      }, 2000);

    };

    const startCountdown = seconds => {
      let counter = seconds;
      countDown.value = seconds;
      original.count = seconds;
      const interval = setInterval(() => {
        console.log(counter);
        counter--;
        original.count--
        if (counter < 1) {
          clearInterval(interval);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Time over!',
            confirmButtonText: 'Menu',
            denyButtonText: "retry",
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("menu")
            }

            else if (result.isDenied) {
              window.location.reload();
            }
          })
        }
      }, 1000);
    };

    const setCountDownOnDifficulty = () => {
      if (difficultyLevel.value === difficultyType.EASY) {
        startCountdown(45)
      } else if (difficultyLevel.value === difficultyType.MEDIUM) {
        startCountdown(30)
      } else if (difficultyLevel.value === difficultyType.HARD) {
        startCountdown(15)
      }
    }

    const getCurrentUserScore = () => {
      GameService.getPlayerScore(currentUser.id).then((resp) => {
        console.log("current score", resp.data)
        currentUserScore.value = resp.data;
      })
    }

    onMounted(async () => {
      let gameResp = await GameService.callSmileAPI();
      imageUrl.value = gameResp.data["question"];
      correctAnswer.value = gameResp.data["solution"];
      setCountDownOnDifficulty()
      getCurrentUserScore()
    });

    return {
      imageUrl,
      userAnswer,
      countDown,
      original,
      currentUserScore,
      submitAnswer
    };
  }
};


</script>

<style scoped>


.game-input {
  height: 250px;
}

.marks{
  position: absolute;
  right: 0px;
}
.bot-set{
   position: absolute;
   width: 250px;
   bottom: 0px;
 }
</style>