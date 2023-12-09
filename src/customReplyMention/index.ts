import { ExtensionWebpackModule, Patch } from "@moonlight-mod/types";

let defaultPing = moonlight.getConfigOption<boolean>(
  "customReplyMention",
  "shouldPing",
) ?? true;
let shouldInvertOnShift = moonlight.getConfigOption<boolean>(
  "customReplyMention",
  "shouldInvertOnShift",
) ?? true;

export const patches: Patch[] = [
  {
    find: ',"Message")}function',
    replace: {
      // FIXME: terrible find. simply terrible. what the hell
      match: /(.{1,}),shouldMention:!(.{1,2})\.shiftKey/,
      replacement: (_, prevVal, keyboard) =>
        `${prevVal},shouldMention:require("customReplyMention_utils").shouldPing(${keyboard}.shiftKey)`,
    },
  },
];

export const webpackModules: Record<string, ExtensionWebpackModule> = {
  utils: {
    entrypoint: true,
    run: (module, _, __) => {
      module.exports = {
        shouldPing: (isShiftPressed: boolean) =>
          shouldInvertOnShift && isShiftPressed ? !defaultPing : defaultPing,
      };
    },
  },
};
