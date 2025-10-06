<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type Poll } from '../data/Poll';
import {getPolls, createPoll, vote} from '../api/PollService';
// Define reactive state
const polls = ref<Poll[]>([]);
const formData = ref<Poll>({ id: Number.NaN, question: '', options: [] });

// Fetch polls on component mount
async function fetchData(): Promise<void> {
  try {
    const response = await getPolls();
    polls.value = response.data;
  } catch (error) {
    console.error('Error fetching polls:', error);
  }
}

// Create a new poll
async function create(): Promise<void> {
  try {
    // Validate formData before sending
    if (!formData.value.question || formData.value.options.length === 0) {
      console.error('Question and at least one option are required');
      return;
    }
    await createPoll(formData.value);
    // Reset form after successful creation
    formData.value = { id: Number.NaN, question: '', options: [] };
    // Refresh polls list
    await fetchData();
  } catch (error) {
    console.error('Error creating poll:', error);
  }
}
async function voteOptionPoll(pollId: number, optionIndex: number): Promise<void> {
  try {
    if (pollId === null) {
      console.error('Poll ID is null');
      return;
    }
    await vote({ pollId: pollId, optionIndex: optionIndex });
    // Refresh polls list
    await fetchData();
  } catch (error) {
    console.error('Error voting option:', error);
  }
}
// Initialize data on mount
onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Create Poll</h2>
    <div class="mb-3">
      <input
          type="text"
          class="form-control"
          placeholder="Poll Question"
          v-model="formData.question"
          required
      />
    </div>
    <div class="mb-3 option-container">
      <div v-for="(option, index) in formData.options" :key="index" class="input-group mb-2">
        <input
            type="text"
            class="form-control"
            placeholder="Option"
            v-model="option.voteOption"
            required
        />
        <button class="btn btn-danger" @click="formData.options.splice(index, 1)">Delete</button>
      </div>
    </div>
    <button
        class="btn btn-primary me-2"
        @click="formData.options.push({ voteOption: '', voteCount: 0 })"
    >
      Add Option
    </button>
    <button class="btn btn-primary" @click="create">Create Poll</button>

    <h2 class="mt-4 text-center">Available Polls</h2>
    <div class="polls-list">
      <div v-for="poll in polls" class="border rounded p-3 mb-3">
        <h3>{{ poll.question }}</h3>
        <div class="option-list">
          <div v-for="(option, index) in poll.options" :key="index">
            <button
                type="button"
                class="btn btn-outline-primary me-2 mt-2"
                @click="voteOptionPoll(poll.id, index)"
            >
              {{ option.voteOption }} ({{ option.voteCount }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any necessary styles */
</style>