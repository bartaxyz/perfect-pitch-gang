import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Key } from "./Key";
import {
  getNoteWithoutOctave,
  Note,
  NoteWithoutOctave,
  useNotes,
} from "../../utils/useNotes";

export interface KeyboardProps {
  width: number;
  gap?: 4 | 8;
  onKeyPress(key: NoteWithoutOctave): void;
  correctNotes: NoteWithoutOctave[];
  incorrectNotes: NoteWithoutOctave[];
}

export const Keyboard: React.FC<KeyboardProps> = ({
  width,
  gap = 8,
  onKeyPress,
  correctNotes,
  incorrectNotes,
}) => {
  const { loading, playNote } = useNotes([
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
  ]);

  const keyWidth = Math.min.apply({}, [(width - gap * 6) / 7, 48]);

  const styles = StyleSheet.create({
    key: {
      marginRight: gap,
      width: keyWidth,
    },
    firstAccidental: {
      marginLeft: keyWidth / 2 + gap / 2,
    },
    invisibleAccidental: {
      opacity: 0,
    },
    lastKey: {
      marginRight: 0,
    },
  });

  const playKey = (note: Note) => {
    if (!loading) {
      // playNote(note || "C4");

      onKeyPress(getNoteWithoutOctave(note));
    }
  };

  return (
    <Root>
      <Accidentals>
        {(["Db", "Eb", "", "Gb", "Ab", "Bb"] as NoteWithoutOctave[]).map(
          (note, index, array) =>
            note ? (
              <Key
                key={note}
                accidental={true}
                style={[styles.key, styles.lastKey, styles.firstAccidental]
                  .filter(
                    (style, styleIndex) => styleIndex !== 2 || index === 0
                  )
                  .filter(
                    (style, styleIndex) =>
                      styleIndex !== 1 || index === array.length - 1
                  )}
                onPress={playKey.bind(null, `${note}4`)}
                correct={correctNotes.includes(note)}
                incorrect={incorrectNotes.includes(note)}
              >
                {note}
              </Key>
            ) : (
              <Key style={[styles.key, styles.invisibleAccidental]} />
            )
        )}
      </Accidentals>

      <Naturals>
        {(["C", "D", "E", "F", "G", "A", "B"] as NoteWithoutOctave[]).map(
          (note, index, array) => (
            <Key
              key={note}
              style={[styles.key, styles.lastKey].filter(
                (style, styleIndex) =>
                  styleIndex !== 1 || index === array.length - 1
              )}
              onPress={playKey.bind(null, `${note}4` as Note)}
              correct={correctNotes.includes(note)}
              incorrect={incorrectNotes.includes(note)}
            >
              {note}
            </Key>
          )
        )}
      </Naturals>
    </Root>
  );
};

const Root = styled.View`
  flex-direction: column;
`;

const Accidentals = styled.View`
  position: relative;
  margin-bottom: -32px;
  flex-direction: row;
  z-index: 2;
`;

const Naturals = styled.View`
  position: relative;
  flex-direction: row;
  z-index: -1;
`;
