import { Draft } from "@/context/DraftContext";
import { GameSeries } from "@/context/MenuContext";

export const DEFAULT_GAME_TYPE: GameSeries = [{ game: 1, winner: "not" }];
export const DEFAULT_RED_SIDE_DRAFT_STATE: Draft = {
  picks: [
    { position: "R1", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "R2", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "R3", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "R4", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "LAST PICK", champion: { name: "", image: "" , id: "", draftable: true} },
  ],
  bans: [
    { position: "L1", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "L2", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "L3", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "L4", champion: { name: "", image: "" , id: "", draftable: true} },
    { position: "LAST BAN", champion: { name: "", image: "" , id: "", draftable: true} },
  ],
};

export const DEFAULT_BLUE_SIDE_DRAFT_STATE: Draft = {
  picks: [
    {
      position: "FIRST PICK",
      champion: { name: "", image: "", id: "", draftable: true},
    },
    {
      position: "B2",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "B3",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "B4",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "B5",
      champion: { name: "", image: "", id: "", draftable: true },
    },
  ],
  bans: [
    {
      position: "FIRST BAN",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "F2",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "F3",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "F4",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "F5",
      champion: { name: "", image: "", id: "", draftable: true },
    },
  ],
};
