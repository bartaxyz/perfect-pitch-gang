import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { RootNavigationProp } from "../../App";
import { Button } from "../components/Button/Button";
import { NoteIcon } from "../icons/NoteIcon";

export const Intro: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp<"Intro">>();

  const onPress = () => {
    navigation.navigate("Home");
  };

  return (
    <Root>
      <RootContent>
        <NoteIcon />
        <Title>Greetings, musician!</Title>

        <Paragraph>
          This is an early version of this app. So far the functionality
          includes only basic music hearing training.
        </Paragraph>
        <Paragraph>Stay tuned for more!</Paragraph>
      </RootContent>
      <Button onPress={onPress}>Start Training</Button>
    </Root>
  );
};

const Root = styled.View`
  padding: 32px;
  flex: 1;
  max-height: 800px;
  max-width: 640px;
  width: 100%;
  margin: auto;
`;

const RootContent = styled.View`
  flex: 1;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-family: Poppins_700Bold;
  font-size: 32px;
  text-align: center;
  margin: 32px 0 24px;
`;

const Paragraph = styled.Text`
  font-family: Poppins_400Regular;
  font-size: 16px;
  text-align: center;
  margin: 0 0 16px 0;
  max-width: 360px;
  width: 100%;
  opacity: 0.5;
`;
