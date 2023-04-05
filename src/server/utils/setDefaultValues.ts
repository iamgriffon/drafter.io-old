import { Draft } from "@/context/DraftContext";
import { GameSeries } from "@/context/MenuContext";

export const DEFAULT_GAME_TYPE: GameSeries = [{ game: 1, winner: "not" }];
export const DEFAULT_RED_SIDE_DRAFT_STATE: Draft = {
  picks: [
    { position: "R1", champion: { name: "", image: "" } },
    { position: "R2", champion: { name: "", image: "" } },
    { position: "R3", champion: { name: "", image: "" } },
    { position: "R4", champion: { name: "", image: "" } },
    { position: "LAST PICK", champion: { name: "", image: "" } },
  ],
  bans: [
    { position: "L1", champion: { name: "", image: "" } },
    { position: "L2", champion: { name: "", image: "" } },
    { position: "L3", champion: { name: "", image: "" } },
    { position: "L4", champion: { name: "", image: "" } },
    { position: "LAST BAN", champion: { name: "", image: "" } }
  ]
};

export const DEFAULT_BLUE_SIDE_DRAFT_STATE: Draft = {
  picks: [
    { position: "FIRST PICK", champion: { name: "", image: "" } },
    { position: "B2", champion: { name: "", image: "" } },
    { position: "B3", champion: { name: "", image: "" } },
    { position: "B4", champion: { name: "", image: "" } },
    { position: "B5", champion: { name: "", image: "" } },
  ],
  bans: [
    { position: "FIRST BAN", champion: { name: "", image: "" } },
    { position: "F2", champion: { name: "", image: "" } },
    { position: "F3", champion: { name: "", image: "" } },
    { position: "F4", champion: { name: "", image: "" } },
    { position: "F5", champion: { name: "", image: "" } },
  ]
};
