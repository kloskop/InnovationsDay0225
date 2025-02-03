import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.innovationsday.pushme',
  appName: 'PushMe',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    hostname: 'com.innovationsday.pushme.local',
    allowNavigation: ['com.innovationsday.pushme.local/*'],
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
