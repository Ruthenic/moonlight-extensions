import { Patch } from "@moonlight-mod/types";

let disableAutoPause = moonlight.getConfigOption<boolean>(
  "freeSpotify",
  "disableAutoPause",
) ?? true;
let premiumSpoof = moonlight.getConfigOption<boolean>(
  "freeSpotify",
  "premiumSpoof",
) ?? true;

export const patches: Patch[] = [
  {
    find: '.displayName="SpotifyStore"',
    replace: {
      match:
        /function (.{1,2})\(\)\{.+AnalyticEvents.SPOTIFY_AUTO_PAUSED\).+\}/,
      replacement: (_, funcName) => `function ${funcName}(){return;}`,
    },
    prerequisite: () => disableAutoPause,
  },
  {
    find: ".displayName='SpotifyStore'",
    replace: {
      match: /(?<=isPremium=)/,
      replacement: "true,",
    },
    prerequisite: () => premiumSpoof,
  },
];
