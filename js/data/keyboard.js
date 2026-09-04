const key = (id, primary, secondary, row, column, width = 4, className = '') => ({
  id, primary, secondary, row, column, width, className
});

export const physicalKeyboard = {
  deckColumns: 74,
  mainColumns: 64,
  bankGapColumns: 4,
  functionColumns: 6,
  mainKeys: [
    key('arrow-left', '←', '', 1, 1, 4, 'special'),
    key('digit-1', '1', '!', 1, 5),
    key('digit-2', '2', '"', 1, 9),
    key('digit-3', '3', '#', 1, 13),
    key('digit-4', '4', '$', 1, 17),
    key('digit-5', '5', '%', 1, 21),
    key('digit-6', '6', '&', 1, 25),
    key('digit-7', '7', "'", 1, 29),
    key('digit-8', '8', '(', 1, 33),
    key('digit-9', '9', ')', 1, 37),
    key('digit-0', '0', '', 1, 41),
    key('plus', '+', '', 1, 45),
    key('minus', '−', '', 1, 49),
    key('pound', '£', '', 1, 53, 4, 'special'),
    key('home', 'CLR\nHOME', '', 1, 57, 4, 'special'),
    key('delete', 'INST\nDEL', '', 1, 61, 4, 'special'),

    key('ctrl', 'CTRL', '', 2, 1, 7, 'special'),
    key('q', 'Q', '●', 2, 8),
    key('w', 'W', '○', 2, 12),
    key('e', 'E', '╬', 2, 16),
    key('r', 'R', '╪', 2, 20),
    key('t', 'T', '▌', 2, 24),
    key('y', 'Y', '●', 2, 28),
    key('u', 'U', '○', 2, 32),
    key('i', 'I', '▂', 2, 36),
    key('o', 'O', '▃', 2, 40),
    key('p', 'P', '▔', 2, 44),
    key('at', '@', '', 2, 48),
    key('asterisk', '*', '', 2, 52),
    key('arrow-up', '↑', 'π', 2, 56, 4, 'special'),
    key('restore', 'RESTORE', '', 2, 60, 5, 'special'),

    key('run-stop', 'RUN\nSTOP', '', 3, 1, 4, 'special'),
    key('shift-lock', 'SHIFT\nLOCK', '', 3, 5, 5, 'special'),
    key('a', 'A', '♠', 3, 10),
    key('s', 'S', '♥', 3, 14),
    key('d', 'D', '♦', 3, 18),
    key('f', 'F', '♣', 3, 22),
    key('g', 'G', '▌', 3, 26),
    key('h', 'H', '▂', 3, 30),
    key('j', 'J', '▔', 3, 34),
    key('k', 'K', '▃', 3, 38),
    key('l', 'L', '▌', 3, 42),
    key('colon', ':', '[', 3, 46),
    key('semicolon', ';', ']', 3, 50),
    key('equals', '=', '', 3, 54),
    key('return', 'RETURN', '', 3, 58, 7, 'special'),

    key('commodore', 'C=', '', 4, 1, 4, 'special'),
    key('left-shift', 'SHIFT', '', 4, 5, 6, 'special'),
    key('z', 'Z', '◆', 4, 11),
    key('x', 'X', '▚', 4, 15),
    key('c', 'C', '━', 4, 19),
    key('v', 'V', '╋', 4, 23),
    key('b', 'B', '▂', 4, 27),
    key('n', 'N', '▔', 4, 31),
    key('m', 'M', '▌', 4, 35),
    key('comma', ',', '<', 4, 39),
    key('period', '.', '>', 4, 43),
    key('slash', '/', '?', 4, 47),
    key('right-shift', 'SHIFT', '', 4, 51, 6, 'special'),
    key('cursor-ud', 'CRSR', '↑ / ↓', 4, 57, 4, 'special'),
    key('cursor-lr', 'CRSR', '← / →', 4, 61, 4, 'special')
  ],
  spaceKey: key('space', 'SPACE', '', 6, 15, 36, 'space'),
  functionBank: [
    key('f1', 'F1', 'F2', 1, 1, 6, 'function'),
    key('f3', 'F3', 'F4', 2, 1, 6, 'function'),
    key('f5', 'F5', 'F6', 3, 1, 6, 'function'),
    key('f7', 'F7', 'F8', 4, 1, 6, 'function')
  ]
};

export const allKeyIds = [
  ...physicalKeyboard.mainKeys,
  physicalKeyboard.spaceKey,
  ...physicalKeyboard.functionBank
].map(({ id }) => id);
