import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.endpoints.dictionary',
  appName: 'Endpoints Dictionary',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
