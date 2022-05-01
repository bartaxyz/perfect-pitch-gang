import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

import { NoteIcon } from "../icons/NoteIcon";
import { Keyboard, KeyboardProps } from "../components/Keyboard/Keyboard";
import { TouchableNote } from "../components/TouchableNote/TouchableNote";
import { useDimensions } from "../utils/useDimensions";
import {
  getNoteWithoutOctave,
  Note,
  NoteWithoutOctave,
  useNotes,
} from "../utils/useNotes";
import { ActivityIndicator, Platform, StatusBar } from "react-native";
import { Button } from "../components/Button/Button";

const availableNotes: Note[] = [
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
  "C5",
  "Db5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "Ab5",
  "A5",
  "Bb5",
  "B5",
];

const getRandomAvailableNote = () =>
  availableNotes[Math.floor(Math.random() * availableNotes.length)];

export const Home = () => {
  const { window } = useDimensions();
  const { width } = window;
  const { loading, playNote } = useNotes(availableNotes);

  const [currentNote, setCurrentNote] = useState<Note>(
    getRandomAvailableNote()
  );

  const [correctNotes, setCorrectNotes] = useState<NoteWithoutOctave[]>([]);
  const [incorrectNotes, setIncorrectNotes] = useState<NoteWithoutOctave[]>([]);

  const onNotePress = () => {
    playNote(currentNote);
  };

  const onKeyPress: KeyboardProps["onKeyPress"] = (key) => {
    if (
      getNoteWithoutOctave(currentNote) === key &&
      !correctNotes.includes(key)
    ) {
      setCorrectNotes([...correctNotes, key]);
    } else if (!incorrectNotes.includes(key)) {
      setIncorrectNotes([...incorrectNotes, key]);
    }
  };

  useEffect(() => {
    if (!loading) {
      playNote(currentNote);
    }
  }, [loading]);

  const onNextPress = () => {
    setCorrectNotes([]);
    setIncorrectNotes([]);

    const newNote = getRandomAvailableNote();

    setCurrentNote(newNote);
    playNote(newNote);
  };

  return (
    <Root>
      {!loading ? (
        <Asdf>
          <TouchableNote note={currentNote} onPress={onNotePress} />

          <NoteTitle>What note do you hear?</NoteTitle>

          <NoteHelper>
            <NoteHelperLabel>(Tap</NoteHelperLabel>
            <NoteHelperIcon>
              <NoteIcon color="#F1B929" size={16} />
            </NoteHelperIcon>
            <NoteHelperLabel>to hear it again)</NoteHelperLabel>
          </NoteHelper>
        </Asdf>
      ) : (
        <ActivityIndicator />
      )}

      {!loading && (
        <Keyboard
          width={width - 2 * (width < 380 ? 4 : 12)}
          gap={width < 380 ? 4 : 8}
          onKeyPress={onKeyPress}
          correctNotes={correctNotes}
          incorrectNotes={incorrectNotes}
        />
      )}

      <NextButton show={correctNotes.length === 1}>
        <Button onPress={onNextPress} disabled={correctNotes.length !== 1}>
          Next Note
        </Button>
      </NextButton>
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 80px 0 0;
  max-height: 800px;
  margin-top: ${StatusBar.currentHeight}px;
  border-top-width: ${Platform.OS === "android" ? 1 : 0}px;
  border-top-color: rgba(0, 0, 0, 0.05);
  border-bottom-width: ${Platform.OS === "android" ? 1 : 0}px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

const Asdf = styled.View`
  align-items: center;
  justify-content: center;
  margin: auto;
  padding-bottom: 40px;
`;

const NoteTitle = styled.Text`
  font-family: Poppins_700Bold;
  font-size: 24px;
  margin-top: 16px;
`;

const NoteHelper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const NoteHelperLabel = styled.Text`
  font-family: Poppins_400Regular;
  font-size: 12px;
  color: #F1B929;
`;
const NoteHelperIcon = styled.View`
  margin: 0 4px;
`;

const NextButton = styled.View`
  opacity: ${({ show }) => (show ? 1 : 0)};
  margin: 16px;
`;
