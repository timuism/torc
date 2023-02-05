<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';



</script>

<template>
  <main>
    <h2>Start Workout</h2>
    <h3>Excersizes</h3>
    <ul>
      <li>
        <table>
          <th>Exercise</th>
          <th>Weight: Sets x Reps</th>
          <th>Actual Sets x Reps</th>
          <th>Notes</th>

          <tr>
            <td>Deadlifts</td>
            <td>3x5</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </li>
    </ul>

    <form>
      <input ref="addWorkoutInput" type="text" name="add-workout" />
      <button type="button" @click="">Add New Exercise</button>
    </form>
  </main>
</template>
