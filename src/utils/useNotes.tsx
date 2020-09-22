import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

export type NoteWithoutOctave =
  | "C"
  | "Db"
  | "D"
  | "Eb"
  | "E"
  | "F"
  | "Gb"
  | "G"
  | "Ab"
  | "A"
  | "Bb"
  | "B";

const noteSoundMap = {
  A0: require("../../assets/notes/A0.mp3"),
  A1: require("../../assets/notes/A1.mp3"),
  A2: require("../../assets/notes/A2.mp3"),
  A3: require("../../assets/notes/A3.mp3"),
  A4: require("../../assets/notes/A4.mp3"),
  A5: require("../../assets/notes/A5.mp3"),
  A6: require("../../assets/notes/A6.mp3"),
  A7: require("../../assets/notes/A7.mp3"),
  Ab1: require("../../assets/notes/Ab1.mp3"),
  Ab2: require("../../assets/notes/Ab2.mp3"),
  Ab3: require("../../assets/notes/Ab3.mp3"),
  Ab4: require("../../assets/notes/Ab4.mp3"),
  Ab5: require("../../assets/notes/Ab5.mp3"),
  Ab6: require("../../assets/notes/Ab6.mp3"),
  Ab7: require("../../assets/notes/Ab7.mp3"),
  B0: require("../../assets/notes/B0.mp3"),
  B1: require("../../assets/notes/B1.mp3"),
  B2: require("../../assets/notes/B2.mp3"),
  B3: require("../../assets/notes/B3.mp3"),
  B4: require("../../assets/notes/B4.mp3"),
  B5: require("../../assets/notes/B5.mp3"),
  B6: require("../../assets/notes/B6.mp3"),
  B7: require("../../assets/notes/B7.mp3"),
  Bb0: require("../../assets/notes/Bb0.mp3"),
  Bb1: require("../../assets/notes/Bb1.mp3"),
  Bb2: require("../../assets/notes/Bb2.mp3"),
  Bb3: require("../../assets/notes/Bb3.mp3"),
  Bb4: require("../../assets/notes/Bb4.mp3"),
  Bb5: require("../../assets/notes/Bb5.mp3"),
  Bb6: require("../../assets/notes/Bb6.mp3"),
  Bb7: require("../../assets/notes/Bb7.mp3"),
  C1: require("../../assets/notes/C1.mp3"),
  C2: require("../../assets/notes/C2.mp3"),
  C3: require("../../assets/notes/C3.mp3"),
  C4: require("../../assets/notes/C4.mp3"),
  C5: require("../../assets/notes/C5.mp3"),
  C6: require("../../assets/notes/C6.mp3"),
  C7: require("../../assets/notes/C7.mp3"),
  C8: require("../../assets/notes/C8.mp3"),
  D1: require("../../assets/notes/D1.mp3"),
  D2: require("../../assets/notes/D2.mp3"),
  D3: require("../../assets/notes/D3.mp3"),
  D4: require("../../assets/notes/D4.mp3"),
  D5: require("../../assets/notes/D5.mp3"),
  D6: require("../../assets/notes/D6.mp3"),
  D7: require("../../assets/notes/D7.mp3"),
  Db1: require("../../assets/notes/Db1.mp3"),
  Db2: require("../../assets/notes/Db2.mp3"),
  Db3: require("../../assets/notes/Db3.mp3"),
  Db4: require("../../assets/notes/Db4.mp3"),
  Db5: require("../../assets/notes/Db5.mp3"),
  Db6: require("../../assets/notes/Db6.mp3"),
  Db7: require("../../assets/notes/Db7.mp3"),
  E1: require("../../assets/notes/E1.mp3"),
  E2: require("../../assets/notes/E2.mp3"),
  E3: require("../../assets/notes/E3.mp3"),
  E4: require("../../assets/notes/E4.mp3"),
  E5: require("../../assets/notes/E5.mp3"),
  E6: require("../../assets/notes/E6.mp3"),
  E7: require("../../assets/notes/E7.mp3"),
  Eb1: require("../../assets/notes/Eb1.mp3"),
  Eb2: require("../../assets/notes/Eb2.mp3"),
  Eb3: require("../../assets/notes/Eb3.mp3"),
  Eb4: require("../../assets/notes/Eb4.mp3"),
  Eb5: require("../../assets/notes/Eb5.mp3"),
  Eb6: require("../../assets/notes/Eb6.mp3"),
  Eb7: require("../../assets/notes/Eb7.mp3"),
  F1: require("../../assets/notes/F1.mp3"),
  F2: require("../../assets/notes/F2.mp3"),
  F3: require("../../assets/notes/F3.mp3"),
  F4: require("../../assets/notes/F4.mp3"),
  F5: require("../../assets/notes/F5.mp3"),
  F6: require("../../assets/notes/F6.mp3"),
  F7: require("../../assets/notes/F7.mp3"),
  G1: require("../../assets/notes/G1.mp3"),
  G2: require("../../assets/notes/G2.mp3"),
  G3: require("../../assets/notes/G3.mp3"),
  G4: require("../../assets/notes/G4.mp3"),
  G5: require("../../assets/notes/G5.mp3"),
  G6: require("../../assets/notes/G6.mp3"),
  G7: require("../../assets/notes/G7.mp3"),
  Gb1: require("../../assets/notes/Gb1.mp3"),
  Gb2: require("../../assets/notes/Gb2.mp3"),
  Gb3: require("../../assets/notes/Gb3.mp3"),
  Gb4: require("../../assets/notes/Gb4.mp3"),
  Gb5: require("../../assets/notes/Gb5.mp3"),
  Gb6: require("../../assets/notes/Gb6.mp3"),
  Gb7: require("../../assets/notes/Gb7.mp3"),
};

export type Note = keyof typeof noteSoundMap;

export const getNoteWithoutOctave = (note: Note): NoteWithoutOctave =>
  note.replace(/[0-9]/g, "") as NoteWithoutOctave;

export const useNotes = (
  notesToPreload: Note[] = Object.keys(noteSoundMap) as Note[]
) => {
  const notes = useRef(notesToPreload).current;
  const [loading, setLoading] = useState(true);
  const noteSoundObjects = useRef<Audio.Sound[]>(
    new Array(notes.length).fill(undefined).map(() => new Audio.Sound())
  ).current;

  const loadNoteSoundObjects = async () => {
    for (let i = 0; i < notes.length; ++i) {
      const soundObject = noteSoundObjects[i];
      const status = await soundObject.getStatusAsync();
      if (!status.isLoaded) {
        await noteSoundObjects[i].loadAsync(noteSoundMap[notes[i]]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await loadNoteSoundObjects();

        setLoading(false);
      } catch (error) {
        console.log("ERR", error);
      }
    })();

    return () => {
      noteSoundObjects.forEach((noteSoundObject) => {
        noteSoundObject.unloadAsync();
      });
    };
  }, []);

  const playNote = async (note: Note | number) => {
    if (loading) {
      throw new Error("Sound object is still loading");
    }

    const soundObjectIndex =
      typeof note === "number"
        ? note
        : notes.findIndex((value) => value === note);

    await noteSoundObjects[soundObjectIndex].replayAsync();
  };

  return { playNote, loading };
};
