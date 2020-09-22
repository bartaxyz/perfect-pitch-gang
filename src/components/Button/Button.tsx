import React from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import styled from "styled-components/native";

export interface ButtonProps extends RectButtonProperties {
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <Root {...props} enabled={!disabled}>
      <StyledContent>
        <Label>{children}</Label>
      </StyledContent>
    </Root>
  );
};

const Root = styled(RectButton)`
  position: relative;
  border-radius: 4px;
  min-height: 48px;
`;

const StyledContent = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Label = styled(Text)`
  font-family: Poppins_600SemiBold;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
`;
