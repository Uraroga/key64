const genericLetter = letter => ({
  name: letter.toUpperCase(),
  action: `Types the letter ${letter.toUpperCase()}. With Commodore or CTRL it can also produce C64 graphics or control functions.`,
  note: 'The small front legend hints at a PETSCII graphics character available with a modifier.'
});

const genericDigit = digit => ({
  name: digit,
  action: `Types ${digit}. The upper legend shows the character associated with the C64 SHIFT combination.`,
  note: 'VICE symbolic mode tries to produce the printed character, so the host modifier may differ from the physical C64 combination.'
});

export const descriptions = {
  'arrow-left': { name: 'Left Arrow', action: 'Types the C64 left-arrow character. This is a printable character, not the cursor-left key.', note: 'Often confused with cursor movement. It is also used by some BASIC and machine-language tools.' },
  plus: { name: 'Plus', action: 'Types the plus sign.', note: 'In symbolic mode, use the host key combination that produces +.' },
  minus: { name: 'Minus', action: 'Types the minus sign.', note: 'This is also commonly used as the subtraction operator in BASIC.' },
  pound: { name: 'Pound', action: 'Types the C64 pound sterling character.', note: 'This key has no direct equivalent on every host layout; VICE keymaps handle it differently by locale.' },
  home: { name: 'CLR / HOME', action: 'HOME moves the cursor to the top-left. SHIFT + HOME clears the screen.', note: 'The physical Home key is the usual default symbolic VICE mapping.' },
  delete: { name: 'INST / DEL', action: 'DEL removes the character to the left. SHIFT + DEL inserts a character position.', note: 'VICE accepts Backspace or Delete for DEL and Insert for the shifted function in the reviewed GTK3 keymaps.' },
  ctrl: { name: 'CTRL', action: 'C64 control modifier, used for colour codes and control combinations.', note: 'Current VICE GTK3 symbolic keymaps map the host left Control key to C64 CTRL.' },
  at: { name: 'At Sign', action: 'Types @.', note: 'VICE symbolic mode maps the host combination that produces @ to this C64 key.' },
  asterisk: { name: 'Asterisk', action: 'Types *.', note: 'Used as the multiplication operator in Commodore BASIC.' },
  'arrow-up': { name: 'Up Arrow / Pi', action: 'Types the C64 up-arrow character. SHIFT produces π.', note: 'This is a printable key, separate from cursor-up.' },
  restore: { name: 'RESTORE', action: 'Triggers the C64 RESTORE line, commonly combined with RUN/STOP to interrupt a program.', note: 'RESTORE is electrically different from ordinary matrix keys. Its VICE host mapping varies between layout files.' },
  'run-stop': { name: 'RUN/STOP', action: 'Stops or pauses many BASIC operations. SHIFT + RUN/STOP performs the RUN shortcut.', note: 'Default VICE symbolic keymaps map Escape to RUN/STOP.' },
  'shift-lock': { name: 'SHIFT LOCK', action: 'Mechanically holds the C64 left SHIFT state.', note: 'VICE maps Caps Lock to SHIFT LOCK, but host operating systems may handle locking keys differently.' },
  colon: { name: 'Colon / Left Bracket', action: 'Types :; with SHIFT, this physical C64 key produces the [ character.', note: 'In symbolic mode, VICE may automatically add or remove emulated SHIFT to produce the requested symbol.' },
  semicolon: { name: 'Semicolon / Right Bracket', action: 'Types ;; with SHIFT, this physical C64 key produces the ] character.', note: 'The modern host combination depends on the selected layout.' },
  equals: { name: 'Equals', action: 'Types the equals sign.', note: 'Used for assignment and comparisons in BASIC.' },
  return: { name: 'RETURN', action: 'Confirms a command or starts a new BASIC line.', note: 'Mapped to Enter/Return in VICE.' },
  commodore: { name: 'Commodore', action: 'The C= modifier selects graphics characters, keyboard shortcuts and alternate functions.', note: 'Current VICE GTK3 symbolic keymaps map Tab to the Commodore key.' },
  'left-shift': { name: 'Left SHIFT', action: 'Selects the upper legend or shifted function of another C64 key.', note: 'VICE keeps left and right C64 SHIFT keys distinct in its keyboard matrix.' },
  'right-shift': { name: 'Right SHIFT', action: 'Selects the upper legend or shifted function of another C64 key.', note: 'Use the corresponding physical right Shift key when software depends on the distinction.' },
  comma: { name: 'Comma / Less Than', action: 'Types comma; with SHIFT, produces <.', note: 'VICE symbolic mode follows the symbol printed on the host layout.' },
  period: { name: 'Period / Greater Than', action: 'Types period; with SHIFT, produces >.', note: 'VICE symbolic mode follows the symbol printed on the host layout.' },
  slash: { name: 'Slash / Question Mark', action: 'Types /; with SHIFT, produces ?.', note: 'The physical host combination depends on the selected keyboard layout.' },
  'cursor-ud': { name: 'Cursor Up / Down', action: 'Moves down unshifted and up with SHIFT on real C64 hardware.', note: 'VICE also maps host Arrow Down and Arrow Up symbolically. For hardware-faithful behaviour, use SHIFT + Arrow Down for up.' },
  'cursor-lr': { name: 'Cursor Left / Right', action: 'Moves right unshifted and left with SHIFT on real C64 hardware.', note: 'VICE also maps host Arrow Right and Arrow Left symbolically. For hardware-faithful behaviour, use SHIFT + Arrow Right for left.' },
  space: { name: 'SPACE', action: 'Types a space.', note: 'Mapped directly to the host Space bar.' }
};

for (const letter of 'abcdefghijklmnopqrstuvwxyz') descriptions[letter] = genericLetter(letter);
for (const digit of '0123456789') descriptions[`digit-${digit}`] = genericDigit(digit);
for (const odd of [1, 3, 5, 7]) {
  descriptions[`f${odd}`] = {
    name: `F${odd} / F${odd + 1}`,
    action: `C64 function key F${odd}; SHIFT selects F${odd + 1}.`,
    note: `VICE maps host F${odd} directly and host F${odd + 1} to the shifted C64 function.`
  };
}

export const specialCards = [
  ['commodore', 'Commodore', 'C64 graphics and shortcut modifier. Current GTK3 VICE mapping: Tab.'],
  ['run-stop', 'RUN/STOP', 'Stops BASIC operations; with SHIFT, invokes the familiar RUN shortcut.'],
  ['restore', 'RESTORE', 'A special interrupt key. Its default host key varies by VICE layout.'],
  ['cursor-ud', 'Cursor keys', 'The C64 has two cursor keys; SHIFT selects the opposite directions.'],
  ['home', 'HOME / CLR', 'HOME moves to the top-left; SHIFT + HOME clears the screen.'],
  ['delete', 'INST / DEL', 'DEL erases; the shifted function inserts room for a character.'],
  ['f1', 'Function keys', 'Four physical keys provide F1–F8, using SHIFT for the even numbers.'],
  ['shift-lock', 'SHIFT LOCK', 'A mechanical lock on the original machine, represented by Caps Lock in VICE.']
];
