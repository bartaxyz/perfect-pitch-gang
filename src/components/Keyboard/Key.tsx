import React from "react";
import { Platform, Text, TextProps } from "react-native";
import {
  BaseButton,
  BaseButtonProperties,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

export interface KeyProps extends BaseButton {
  accidental?: boolean;
  disabled?: boolean;
  correct?: boolean;
  incorrect?: boolean;
}

export const Key: React.FC<KeyProps> = ({
  children,
  accidental = false,
  disabled = false,
  correct,
  incorrect,
  ...props
}) => {
  return (
    <Root
      {...props}
      accidental={accidental}
      disabled={disabled}
      correct={correct}
      incorrect={incorrect}
    >
      <StyledContent
        accidental={accidental}
        disabled={disabled}
        correct={correct}
        incorrect={incorrect}
      >
        <Label
          accidental={accidental}
          disabled={disabled}
          correct={correct}
          incorrect={incorrect}
        >
          {children}
        </Label>
      </StyledContent>
    </Root>
  );
};

const RootComponent: React.FC<
  Pick<KeyProps, "accidental" | "disabled"> & TextProps
> = ({ accidental, disabled, ...props }) => {
  if (Platform.OS === "web") {
    return (
      <TouchableOpacity disabled={disabled} activeOpacity={0.5} {...props} />
    );
  }

  return (
    <BaseButton
      rippleColor={accidental ? "white" : undefined}
      disabled={disabled}
      {...(props as BaseButtonProperties)}
    />
  );
};

const Root = styled(RootComponent)`
  height: 96px;
  border-radius: 4px;
  background-color: ${({ accidental, disabled, correct, incorrect }) =>
    correct
      ? "#74CD6D"
      : incorrect
      ? "#E85959"
      : accidental
      ? disabled
        ? "#555"
        : "black"
      : disabled
      ? "rgba(0, 0, 0, 0.05)"
      : "#ffffff"};
`;

const StyledContent = styled.View`
  border: ${({ accidental, disabled }) => 1}px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const LabelComponent: React.FC<Pick<KeyProps, "accidental"> & TextProps> = ({
  accidental,
  ...props
}) => <Text {...props} />;

const Label = styled(LabelComponent)`
  display: ${({ disabled }) => (disabled ? "none" : "flex")};
  text-align: center;
  font-family: Poppins_700Bold;
  font-size: ${({ accidental }) => (accidental ? "14px" : "16px")};
  margin: 12px 4px;
  color: ${({ accidental, correct, incorrect }) =>
    correct || incorrect ? "white" : accidental ? "white" : "black"};
`;
