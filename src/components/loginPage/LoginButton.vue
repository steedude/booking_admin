<template>
  <div>
    <GoogleLogin
      :callback="callback"
      prompt
    />
    <p>
      {{ data }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { decodeCredential } from 'vue3-google-login';
const data = ref();
const callback = (response: any) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);
  const userData = decodeCredential(response.credential);
  console.log('Handle the userData', userData);
  data.value = userData;
};
</script>
