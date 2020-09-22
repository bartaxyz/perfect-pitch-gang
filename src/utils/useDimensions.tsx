import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export const useDimensions = () => {
  const [window, setWindow] = useState(Dimensions.get("window"));
  const [screen, setScreen] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const callback = (dimensions: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setWindow(dimensions.window);
      setScreen(dimensions.screen);
    };

    Dimensions.addEventListener("change", callback);

    return () => {
      Dimensions.removeEventListener("change", callback);
    };
  }, []);

  return { window, screen };
};
