export type BlueSidePickPosition = "FIRST PICK" | "B2" | "B3" | "B4" | "B5";
export type RedSidePickPosition = "R1" | "R2" | "R3" | "R4" | "LAST PICK";
export type BlueSideBanPosition = "FIRST BAN" | "F2" | "F3" | "F4" | "F5";
export type RedSideBanPosition = "L1" | "L2" | "L3" | "L4" | "LAST BAN";

export type MatchWinner = "red" | "blue" |  null;

export type Champion = {
  id: string;
  name: string;
  image: string;
  draftable: boolean | null;
};

export type DraftPick = {
  position: BlueSidePickPosition | RedSidePickPosition;
  champion: Champion;
};

export type DraftBan = {
  position: BlueSideBanPosition | RedSideBanPosition;
  champion: Champion;
};

export type DraftPositions =
  | RedSidePickPosition
  | BlueSidePickPosition
  | RedSideBanPosition
  | BlueSideBanPosition
  | null;

export type Draft = {
  picks: DraftPick[];
  bans: DraftBan[];
};

export type Game = {
  game: number;
  winner: MatchWinner;
  blueSide: Draft;
  redSide: Draft;
};

export type GameSeries = {
  series: Series;
  winner: MatchWinner;
  games: Game[];
};

export type Series = "BO1" | "BO3" | "BO5";
