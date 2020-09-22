import React, { useEffect, useRef } from "react";
import {
  TouchableWithoutFeedbackProps,
  Animated,
  Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Svg, { Circle, RadialGradient, Stop } from "react-native-svg";
import styled from "styled-components/native";

import { NoteIcon } from "../../icons/NoteIcon";
import { Note } from "../../utils/useNotes";

export interface TouchableNoteProps extends TouchableWithoutFeedbackProps {
  note?: Note;
}

export const TouchableNote: React.FC<TouchableNoteProps> = ({
  onPress = () => {},
  note,
  ...props
}) => {
  const backgroundCircleAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (note) {
      playNote();
    }
  }, [note]);

  const playNote = async () => {
    backgroundCircleAnimatedValue.setValue(0);

    Animated.timing(backgroundCircleAnimatedValue, {
      toValue: 1,
      duration: 5000,
      easing: (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -20 * x);
      },
      useNativeDriver: true,
    }).start();
  };

  const onPressHandler: TouchableNoteProps["onPress"] = async (event) => {
    onPress(event);
    playNote();
  };

  return (
    <Root>
      <BackgroundCircle>
        <Animated.View
          style={{
            transform: [
              {
                scale: backgroundCircleAnimatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 6],
                }),
              },
            ],
            opacity: backgroundCircleAnimatedValue.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [0.6, 0, 0],
            }),
          }}
        >
          <Svg width={40} height={40}>
            <RadialGradient id="gradient">
              <Stop stopColor="#8EBFED" stopOpacity={0.02} offset="20%" />
              <Stop stopColor="#8EBFED" stopOpacity={0.2} offset="100%" />
            </RadialGradient>
            <Circle cx="20" cy="20" r="20" fill="url(#gradient)" />
          </Svg>
        </Animated.View>
      </BackgroundCircle>

      <TouchableRoot onPress={onPressHandler} {...props}>
        <Animated.View
          style={{
            transform: [
              {
                scale: backgroundCircleAnimatedValue.interpolate({
                  inputRange: [0, 0.1, 1],
                  outputRange: [1, 1.5, 1],
                }),
              },
            ],
          }}
        >
          <NoteIcon color="black" size={40} />
        </Animated.View>
      </TouchableRoot>
    </Root>
  );
};

const Root = styled.View`
  position: relative;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const TouchableRoot = styled(TouchableWithoutFeedback)`
  position: relative;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const BackgroundCircle = styled(Animated.View)`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: -1;
  transform: scale(4);
`;
