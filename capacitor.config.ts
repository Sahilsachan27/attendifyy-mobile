import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.attendifyy.app',
  appName: 'Attendify',
  webDir: 'dist',
  bundledWebRuntime: false,
  
  android: {
    allowMixedContent: true,
    backgroundColor: "#ffffff"
  },
  
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: "#6366f1",
      style: "LIGHT"
    }
  }
};

export default config;
