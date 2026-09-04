/*
 * VICE GTK3 symbolic profile.
 * Source reviewed: VICE-Team/svn-mirror, vice/data/C64/gtk3_sym*.vkm (2026-09-04).
 * Locale-independent mappings below are kept separate from host layout geometry.
 */

const fixed = (code, label, options = {}) => ({ code, label, shift: false, altGraph: false, verification: 'verified', ...options });
const character = value => ({ character: value });

export const viceProfile = {
  id: 'vice-gtk3-symbolic',
  name: 'VICE GTK3 symbolic mapping',
  source: 'https://github.com/VICE-Team/svn-mirror/tree/main/vice/data/C64',
  mappings: {
    'arrow-left': character('←'),
    plus: character('+'), minus: character('-'), pound: character('£'),
    home: fixed('Home', 'Home', { allowShift: true }),
    delete: fixed('Backspace', 'Backspace / Delete', { alternatives: ['Delete'], allowShift: true, note: 'Insert selects the shifted INST function.' }),
    ctrl: fixed('ControlLeft', 'Left Ctrl', { allowShift: true }),
    at: character('@'), asterisk: character('*'), 'arrow-up': character('↑'),
    restore: fixed('PageUp', 'Page Up', {
      byLayout: {
        it: fixed('F12', 'F12'),
        de: fixed('F12', 'F12 or Page Up', { alternatives: ['PageUp'] })
      }
    }),
    'run-stop': fixed('Escape', 'Escape'),
    'shift-lock': fixed('CapsLock', 'Caps Lock'),
    colon: character(':'), semicolon: character(';'), equals: character('='),
    return: fixed('Enter', 'Enter / Return'),
    commodore: fixed('Tab', 'Tab', { allowShift: true }),
    'left-shift': fixed('ShiftLeft', 'Left Shift'),
    'right-shift': fixed('ShiftRight', 'Right Shift'),
    comma: character(','), period: character('.'), slash: character('/'),
    'cursor-ud': fixed('ArrowDown', 'Arrow Down / Arrow Up', { alternatives: ['ArrowUp'], note: 'Arrow Up invokes the virtually shifted direction.' }),
    'cursor-lr': fixed('ArrowRight', 'Arrow Right / Arrow Left', { alternatives: ['ArrowLeft'], note: 'Arrow Left invokes the virtually shifted direction.' }),
    space: fixed('Space', 'Space')
  }
};

for (const letter of 'abcdefghijklmnopqrstuvwxyz') viceProfile.mappings[letter] = character(letter);
for (const digit of '0123456789') viceProfile.mappings[`digit-${digit}`] = character(digit);
for (const odd of [1, 3, 5, 7]) {
  viceProfile.mappings[`f${odd}`] = fixed(`F${odd}`, `F${odd} / F${odd + 1}`, {
    alternatives: [`F${odd + 1}`],
    note: `Host F${odd + 1} is mapped to C64 SHIFT + F${odd}.`
  });
}

export function mappingFor(keyId, layoutId, resolveCharacter) {
  const base = viceProfile.mappings[keyId];
  if (!base) return { code: null, label: 'Not mapped', verification: 'review', shift: false, altGraph: false };
  const resolved = base.byLayout?.[layoutId] || base;
  if (resolved.character) return resolveCharacter(layoutId, resolved.character);
  return resolved;
}
