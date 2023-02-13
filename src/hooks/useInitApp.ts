import { useEffect, useState } from "react";
import { decode, encode } from "base-64";
import * as SplashScreen from "expo-splash-screen";

// Polyfill for BigInt
if (!global.BigInt) global.BigInt = require("big-integer");
console.log("BigInt", BigInt(5))

// Polyfill for base64
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;


export default function useInitApp() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
