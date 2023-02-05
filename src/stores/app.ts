import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const workouts = ref([])
  const newWorkout = ref()

  function updateNewWorkout (workout: any) {
    newWorkout.value = workout
  }

  function addWorkout(workout: any) {
    workouts.value.push(workout)
  }

  return { workouts, newWorkout, updateNewWorkout, addWorkout };
});
