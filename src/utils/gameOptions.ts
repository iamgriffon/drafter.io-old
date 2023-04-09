import { DEFAULT_BO3_STATE, DEFAULT_BO5_STATE, DEFAULT_MATCH_STATE } from "@/server/utils/setDefaultValues";

export const OPTIONS = [
  {
    type: "Best of 1",
    id: '1',
    value: DEFAULT_MATCH_STATE
  },
  {
    type: "Best of 3",
    id: '3',
    value: DEFAULT_BO3_STATE
  },
  {
    type: "Best of 5",
    id: '5',
    value: DEFAULT_BO5_STATE
  },
];
