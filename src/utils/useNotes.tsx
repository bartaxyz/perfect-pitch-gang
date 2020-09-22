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
  A0: require("../../assets/notes/A0.m4a"),
  A1: require("../../assets/notes/A1.m4a"),
  A2: require("../../assets/notes/A2.m4a"),
  A3: require("../../assets/notes/A3.m4a"),
  A4: require("../../assets/notes/A4.m4a"),
  A5: require("../../assets/notes/A5.m4a"),
  A6: require("../../assets/notes/A6.m4a"),
  A7: require("../../assets/notes/A7.m4a"),
  Ab1: require("../../assets/notes/Ab1.m4a"),
  Ab2: require("../../assets/notes/Ab2.m4a"),
  Ab3: require("../../assets/notes/Ab3.m4a"),
  Ab4: require("../../assets/notes/Ab4.m4a"),
  Ab5: require("../../assets/notes/Ab5.m4a"),
  Ab6: require("../../assets/notes/Ab6.m4a"),
  Ab7: require("../../assets/notes/Ab7.m4a"),
  B0: require("../../assets/notes/B0.m4a"),
  B1: require("../../assets/notes/B1.m4a"),
  B2: require("../../assets/notes/B2.m4a"),
  B3: require("../../assets/notes/B3.m4a"),
  B4: require("../../assets/notes/B4.m4a"),
  B5: require("../../assets/notes/B5.m4a"),
  B6: require("../../assets/notes/B6.m4a"),
  B7: require("../../assets/notes/B7.m4a"),
  Bb0: require("../../assets/notes/Bb0.m4a"),
  Bb1: require("../../assets/notes/Bb1.m4a"),
  Bb2: require("../../assets/notes/Bb2.m4a"),
  Bb3: require("../../assets/notes/Bb3.m4a"),
  Bb4: require("../../assets/notes/Bb4.m4a"),
  Bb5: require("../../assets/notes/Bb5.m4a"),
  Bb6: require("../../assets/notes/Bb6.m4a"),
  Bb7: require("../../assets/notes/Bb7.m4a"),
  C1: require("../../assets/notes/C1.m4a"),
  C2: require("../../assets/notes/C2.m4a"),
  C3: require("../../assets/notes/C3.m4a"),
  C4: require("../../assets/notes/C4.m4a"),
  C5: require("../../assets/notes/C5.m4a"),
  C6: require("../../assets/notes/C6.m4a"),
  C7: require("../../assets/notes/C7.m4a"),
  C8: require("../../assets/notes/C8.m4a"),
  D1: require("../../assets/notes/D1.m4a"),
  D2: require("../../assets/notes/D2.m4a"),
  D3: require("../../assets/notes/D3.m4a"),
  D4: require("../../assets/notes/D4.m4a"),
  D5: require("../../assets/notes/D5.m4a"),
  D6: require("../../assets/notes/D6.m4a"),
  D7: require("../../assets/notes/D7.m4a"),
  Db1: require("../../assets/notes/Db1.m4a"),
  Db2: require("../../assets/notes/Db2.m4a"),
  Db3: require("../../assets/notes/Db3.m4a"),
  Db4: require("../../assets/notes/Db4.m4a"),
  Db5: require("../../assets/notes/Db5.m4a"),
  Db6: require("../../assets/notes/Db6.m4a"),
  Db7: require("../../assets/notes/Db7.m4a"),
  E1: require("../../assets/notes/E1.m4a"),
  E2: require("../../assets/notes/E2.m4a"),
  E3: require("../../assets/notes/E3.m4a"),
  E4: require("../../assets/notes/E4.m4a"),
  E5: require("../../assets/notes/E5.m4a"),
  E6: require("../../assets/notes/E6.m4a"),
  E7: require("../../assets/notes/E7.m4a"),
  Eb1: require("../../assets/notes/Eb1.m4a"),
  Eb2: require("../../assets/notes/Eb2.m4a"),
  Eb3: require("../../assets/notes/Eb3.m4a"),
  Eb4: require("../../assets/notes/Eb4.m4a"),
  Eb5: require("../../assets/notes/Eb5.m4a"),
  Eb6: require("../../assets/notes/Eb6.m4a"),
  Eb7: require("../../assets/notes/Eb7.m4a"),
  F1: require("../../assets/notes/F1.m4a"),
  F2: require("../../assets/notes/F2.m4a"),
  F3: require("../../assets/notes/F3.m4a"),
  F4: require("../../assets/notes/F4.m4a"),
  F5: require("../../assets/notes/F5.m4a"),
  F6: require("../../assets/notes/F6.m4a"),
  F7: require("../../assets/notes/F7.m4a"),
  G1: require("../../assets/notes/G1.m4a"),
  G2: require("../../assets/notes/G2.m4a"),
  G3: require("../../assets/notes/G3.m4a"),
  G4: require("../../assets/notes/G4.m4a"),
  G5: require("../../assets/notes/G5.m4a"),
  G6: require("../../assets/notes/G6.m4a"),
  G7: require("../../assets/notes/G7.m4a"),
  Gb1: require("../../assets/notes/Gb1.m4a"),
  Gb2: require("../../assets/notes/Gb2.m4a"),
  Gb3: require("../../assets/notes/Gb3.m4a"),
  Gb4: require("../../assets/notes/Gb4.m4a"),
  Gb5: require("../../assets/notes/Gb5.m4a"),
  Gb6: require("../../assets/notes/Gb6.m4a"),
  Gb7: require("../../assets/notes/Gb7.m4a"),
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
