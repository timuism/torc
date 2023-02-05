<script setup lang="ts">
import type { Exercise } from '@/classes/exercise';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { useQuery } from '@urql/vue'

const {fetching, data, error} = useQuery({
  query:
  `{
    workouts {
      wname
      wdate
      notes
    }
  }`
})

console.log({fetching, data, error})

const { workouts } = storeToRefs(useAppStore())
</script>

<template>
  <div class="px-12 py-6">
    <h2 class="my-4 text-2xl text-purple-600 font-display">Workouts</h2>

    <ul class="pb-12 space-y-8">
      <li
        v-for="(workout, index) in workouts"
        :key="index"
      >
        <button type="button" class="w-full">
          <div class="flex justify-start py-2 space-x-4 text-purple-500 font-display">
            <span class="font-bold">{{ workout.wdate }}</span>
            <span class="inline-block mr-2">{{ workout.wtitle }}</span> 
          </div>

          <p class="w-full font-mono text-left capitalize">
            {{ 
              workout.exercises.map((exercise) => exercise.name).join(', ') 
            }}
          </p>

          <div>
            <!-- action buttons here: (share, edit, remove) -->
          </div>
        </button>
      </li>
    </ul>

    <RouterLink to="/">
      <button
        type="button"
        @click=""
        class="px-4 py-4 text-purple-600 duration-150 bg-transparent border-2 border-purple-600 rounded-md hover:border-transparent hover:bg-green-600 hover:text-green-50 font-display"
      >
        Start New Workout
      </button>
    </RouterLink>
  </div>
</template>