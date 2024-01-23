import vue3GoogleLogin from 'vue3-google-login';

export const vue3GooglePlugin = vue3GoogleLogin;

export const vue3GoogleInstallOptions = {
  clientId: import.meta.env.VITE_GOOGLE_APP_ID || process.env.GOOGLE_APP_ID,
};
