<script lang="ts" setup>
import { ref } from "vue";

const formData = ref({
  name: "",
  registrationDeadline: "",
  startDate: "",
  endDate: "",
  isPublic: true,
  maxTeamSize: "",
  image: null,
});

const errors = ref({
  name: "",
  registrationDeadline: "",
  startDate: "",
  endDate: "",
  maxTeamSize: "",
});

const validateForm = () => {
  errors.value.name = formData.value.name.trim()
    ? ""
    : "Hackathon name is required.";
  errors.value.registrationDeadline = formData.value.registrationDeadline
    ? ""
    : "Registration Deadline is required.";
  errors.value.startDate = formData.value.startDate
    ? ""
    : "Start Date is required.";
  errors.value.endDate = formData.value.endDate ? "" : "End Date is required.";
  errors.value.maxTeamSize = formData.value.maxTeamSize
    ? ""
    : "Max Team Size is required.";

  return !Object.values(errors.value).some((error) => error !== "");
};

const submit = () => {
  if (validateForm()) {
    console.log("Form Data:", formData.value);
    // Add API logic here
  } else {
    console.error("Validation Errors:", errors.value);
  }
};
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <h3 class="text-center mb-4">Create a Hackathon</h3>
    <v-form @submit.prevent="submit" lazy-validation>
      <!-- Hackathon Name -->
      <v-text-field
        label="Hackathon Name"
        v-model="formData.name"
        :error="!!errors.name"
        :error-messages="errors.name"
        required
        outlined
      ></v-text-field>

      <!-- Registration Deadline -->
      <v-text-field
        label="Registration Deadline"
        v-model="formData.registrationDeadline"
        :error="!!errors.registrationDeadline"
        :error-messages="errors.registrationDeadline"
        type="date"
        required
        outlined
      ></v-text-field>

      <!-- Start Date -->
      <v-text-field
        label="Start Date"
        v-model="formData.startDate"
        :error="!!errors.startDate"
        :error-messages="errors.startDate"
        type="date"
        required
        outlined
      ></v-text-field>

      <!-- End Date -->
      <v-text-field
        label="End Date"
        v-model="formData.endDate"
        :error="!!errors.endDate"
        :error-messages="errors.endDate"
        type="date"
        required
        outlined
      ></v-text-field>

      <!-- Max Team Size -->
      <v-text-field
        label="Max Team Size"
        v-model="formData.maxTeamSize"
        :error="!!errors.maxTeamSize"
        :error-messages="errors.maxTeamSize"
        type="number"
        min="1"
        required
        outlined
      ></v-text-field>

      <!-- Is Public -->
      <v-switch
        v-model="formData.isPublic"
        label="Make Public"
        class="mt-3"
      ></v-switch>

      <!-- Image Upload -->
      <v-file-input
        v-model="formData.image"
        label="Upload Hackathon Image"
        accept="image/*"
        outlined
      ></v-file-input>

      <!-- Submit Button -->
      <v-btn class="mt-4" block color="primary" @click="submit">
        Create Hackathon
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>
h3 {
  font-weight: bold;
}
</style>
