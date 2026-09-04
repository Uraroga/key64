export const keyboardRows = [
  [
    ['arrow-left', '←', '', 'special'], ['digit-1', '1', '!', ''], ['digit-2', '2', '"', ''],
    ['digit-3', '3', '#', ''], ['digit-4', '4', '$', ''], ['digit-5', '5', '%', ''],
    ['digit-6', '6', '&', ''], ['digit-7', '7', "'", ''], ['digit-8', '8', '(', ''],
    ['digit-9', '9', ')', ''], ['digit-0', '0', '', ''], ['plus', '+', '', ''],
    ['minus', '−', '', ''], ['pound', '£', '', 'special'], ['home', 'CLR\nHOME', '', 'special wide-125'],
    ['delete', 'INST\nDEL', '', 'special wide-125'], ['f1', 'F1', 'F2', 'function']
  ],
  [
    ['ctrl', 'CTRL', '', 'special wide-125'], ['q', 'Q', '●', ''], ['w', 'W', '○', ''], ['e', 'E', '╬', ''],
    ['r', 'R', '╪', ''], ['t', 'T', '▌', ''], ['y', 'Y', '●', ''], ['u', 'U', '○', ''],
    ['i', 'I', '▂', ''], ['o', 'O', '▃', ''], ['p', 'P', '▔', ''], ['at', '@', '', ''],
    ['asterisk', '*', '', ''], ['arrow-up', '↑', 'π', 'special'], ['restore', 'RESTORE', '', 'function wide-125'],
    ['f3', 'F3', 'F4', 'function']
  ],
  [
    ['run-stop', 'RUN\nSTOP', '', 'special wide-125'], ['shift-lock', 'SHIFT\nLOCK', '', 'special wide-125'],
    ['a', 'A', '♠', ''], ['s', 'S', '♥', ''], ['d', 'D', '♦', ''], ['f', 'F', '♣', ''],
    ['g', 'G', '▌', ''], ['h', 'H', '▂', ''], ['j', 'J', '▔', ''], ['k', 'K', '▃', ''],
    ['l', 'L', '▌', ''], ['colon', ':', '[', ''], ['semicolon', ';', ']', ''], ['equals', '=', '', ''],
    ['return', 'RETURN', '', 'special wide-175'], ['f5', 'F5', 'F6', 'function']
  ],
  [
    ['commodore', 'C=', '', 'special wide-125'], ['left-shift', 'SHIFT', '', 'special wide-150'],
    ['z', 'Z', '◆', ''], ['x', 'X', '▚', ''], ['c', 'C', '━', ''], ['v', 'V', '╋', ''],
    ['b', 'B', '▂', ''], ['n', 'N', '▔', ''], ['m', 'M', '▌', ''], ['comma', ',', '<', ''],
    ['period', '.', '>', ''], ['slash', '/', '?', ''], ['right-shift', 'SHIFT', '', 'special wide-150'],
    ['cursor-ud', 'CRSR', '↑ / ↓', 'special wide-125'], ['cursor-lr', 'CRSR', '← / →', 'special wide-125'],
    ['f7', 'F7', 'F8', 'function']
  ],
  [['space', 'SPACE', '', 'space']]
];

export const allKeyIds = keyboardRows.flat().map(([id]) => id);
