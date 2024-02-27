import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.artisticmk.xdictionary',
  appName: 'xDictionary',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  /*"plugins": {
    "SplashScreen": {
      "launchShowDuration": 1500,
      "launchAutoHide": true,
      "androidScaleType": "CENTER_CROP",
      "splashImmersive": true,
    }
  }*/
}

export default config
