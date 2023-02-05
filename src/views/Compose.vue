<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { parse } from '@/parse'
import moment from 'moment'
import type { Ref } from "vue"
import { useRouter } from "vue-router";

const defaultText = `
*Chest and Back* 2/4/2023

deadlifts:
12 @135kgs
10 @185lbs
8 @225lbs
6 @275lbs
6 @275lbs
--

dips:
10
10
8
--

shoulder press:
12 @95lbs
12 @kgs
10 @115lbs
--
`

const router = useRouter()
const defaultUnit = ('lbs')
const textarea = ref(defaultText)
const { newWorkout } = storeToRefs(useAppStore())
const { updateNewWorkout, addWorkout } = useAppStore()

const $workout = computed(() => {
  return parse(textarea.value)
})

const today = computed(() => {
  const date = moment()
  return `${date.format('M/D/YY')}`
})

function handleCompleteWorkoutEntry() {
  // updateNewWorkout($workout.value)
  addWorkout($workout.value)
  router.push('/workouts')
  console.log($workout.value)
}
</script>

<template>
  <form>
      <textarea 
        v-model="textarea" 
        style="resize: none"
        class="block w-full py-6 px-12 m-0 font-mono text-lg text-purple-500 outline-none bg-purple-50 h-[300px]"
      />

      <div class="px-12 pt-12 font-sans border-t-2 border-purple-200">
        <dl class="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-12">
          <div>
            <dt class="text-[10px] font-bold tracking-widest text-purple-300 uppercase mb-2">Workout</dt>
            <dd class="pl-2 text-lg text-purple-700 border-l-4 border-purple-100 border-dotted font-display">{{ $workout.wtitle ? $workout.wtitle : 'Untitled' }}</dd>
          </div>

          <div>
            <dt class="text-[10px] font-bold tracking-widest text-purple-300 uppercase mb-2">Date</dt>
            <dd class="pl-2 text-lg text-purple-700 border-l-4 border-purple-100 border-dotted font-display">
              {{ $workout.wdate === '' ? today : $workout.wdate }}
            </dd>
          </div>
        </dl>

        <div v-if="$workout.exercises.length > 0" class="mt-12">
          <p class="text-[10px] font-bold tracking-widest text-purple-300 uppercase mb-2">Exercises</p>
          <div class="pl-4 border-l-4 border-purple-100 border-dotted">
            <div v-for="(exercise, index) in $workout.exercises" :key="index" class="mb-6">
              <div class="mb-2 mr-6 text-xl font-normal text-left text-purple-700 capitalize font-display">
                <p>{{ exercise.name }}</p>
              </div>
              <div class="-ml-1.5">
                <p v-for="(set, index) in exercise.sets" :key="index" class="inline-flex mx-1.5 my-1 text-gray-800 bg-yellow-50 border border-yellow-300 rounded-sm">
                  <span class="p-1 font-mono text-xs text-yellow-700"><strong class="mr-0.5">{{ set.reps }}</strong>Reps</span>  
                  <span 
                    v-if="set.weight"
                    class="p-1 font-mono text-xs text-yellow-700 bg-yellow-100"
                  >
                    <strong class="mr-0.5">{{ set.weight[0] }}</strong>{{ set.weight[1] ?? defaultUnit }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="px-12 pt-6 pb-12">
        <button
          type="button"
          v-if="$workout.exercises.length > 0"
          @click="handleCompleteWorkoutEntry"
          class="px-4 py-4 text-purple-600 duration-150 bg-transparent border-2 border-purple-600 rounded-md hover:border-transparent hover:bg-green-600 hover:text-green-50 font-display"
        >
          Complete Workout Entry
        </button>
      </div>
    </form>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
