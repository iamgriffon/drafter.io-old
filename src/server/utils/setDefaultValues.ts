import { Champion, Draft, Game, GameSeries } from "@/types/draft";

export const DEFAULT_RED_SIDE_DRAFT_STATE: Draft = {
  picks: [
    {
      position: "R1",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "R2",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "R3",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "R4",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "LAST PICK",
      champion: { name: "", image: "", id: "", draftable: true },
    },
  ],
  bans: [
    {
      position: "L1",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "L2",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "L3",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "L4",
      champion: { name: "", image: "", id: "", draftable: true },
    },
    {
      position: "LAST BAN",
      champion: { name: "", image: "", id: "", draftable: true },
    },
  ],
};

export const DEFAULT_BLUE_SIDE_DRAFT_STATE: Draft = {
  picks: [
    {
      position: "FIRST PICK",
      champion: { name: "", image: "", id: "", draftable: true },
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

export const DEFAULT_CHAMPION_STATE: Champion = {
  id: "99999",
  draftable: null,
  image: "",
  name: "",
};

export const DEFAULT_CHAMPIONS_STATE: Champion[] = [
  {
    id: "1",
    draftable: null,
    image: "",
    name: "",
  },
  {
    id: "2",
    draftable: null,
    image: "",
    name: "",
  },
  {
    id: "3",
    draftable: null,
    image: "",
    name: "",
  },
];

export const DEFAULT_GAME_STATE: Game = {
  game: 1,
  blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
  redSide: DEFAULT_RED_SIDE_DRAFT_STATE,
  winner: null
}

export const DEFAULT_MATCH_STATE: GameSeries = {
  series: "BO1",
  winner: null,
  games: [
    {
      game: 1,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
  ],
};

export const DEFAULT_BO3_STATE: GameSeries = {
  series: "BO3",
  winner: null,
  games: [
    {
      game: 1,
      winner: null,
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 2,
      winner: null,
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 3,
      winner: null,
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
  ],
}

export const DEFAULT_BO5_STATE: GameSeries = {
  series: 'BO5',
  winner: null,
  games: [
    {
      game: 1,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 2,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 3,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 4,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
    {
      game: 5,
      winner: 'not',
      blueSide: DEFAULT_BLUE_SIDE_DRAFT_STATE,
      redSide: DEFAULT_RED_SIDE_DRAFT_STATE
    },
  ],
}