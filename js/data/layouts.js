const letterCodes = {
  us: Object.fromEntries([...'abcdefghijklmnopqrstuvwxyz'].map(c => [c, `Key${c.toUpperCase()}`])),
  it: Object.fromEntries([...'abcdefghijklmnopqrstuvwxyz'].map(c => [c, `Key${c.toUpperCase()}`])),
  de: Object.fromEntries([...'abcdefghijklmnopqrstuvwxyz'].map(c => [c, `Key${(c === 'y' ? 'Z' : c === 'z' ? 'Y' : c).toUpperCase()}`])),
  fr: {
    a: 'KeyQ', b: 'KeyB', c: 'KeyC', d: 'KeyD', e: 'KeyE', f: 'KeyF', g: 'KeyG', h: 'KeyH',
    i: 'KeyI', j: 'KeyJ', k: 'KeyK', l: 'KeyL', m: 'Semicolon', n: 'KeyN', o: 'KeyO', p: 'KeyP',
    q: 'KeyA', r: 'KeyR', s: 'KeyS', t: 'KeyT', u: 'KeyU', v: 'KeyV', w: 'KeyZ', x: 'KeyX', y: 'KeyY', z: 'KeyW'
  }
};

const symbols = {
  us: {
    '+': ['Equal', true, false, 'Shift + ='], '-': ['Minus', false, false, '−'], '£': ['Backslash', false, false, '\\'],
    '@': ['Digit2', true, false, 'Shift + 2'], '*': ['Digit8', true, false, 'Shift + 8'], ':': ['Semicolon', true, false, 'Shift + ;'],
    ';': ['Semicolon', false, false, ';'], '=': ['Equal', false, false, '='], ',': ['Comma', false, false, ','],
    '.': ['Period', false, false, '.'], '/': ['Slash', false, false, '/'], '←': ['End', false, false, 'End'], '↑': ['PageDown', false, false, 'Page Down']
  },
  it: {
    '+': ['BracketRight', false, false, '+'], '-': ['Minus', false, false, '−'], '£': ['Digit3', true, false, 'Shift + 3'],
    '@': ['Semicolon', false, true, 'AltGr + ò'], '*': ['BracketRight', true, false, 'Shift + +'], ':': ['Period', true, false, 'Shift + .'],
    ';': ['Comma', true, false, 'Shift + ,'], '=': ['Digit0', true, false, 'Shift + 0'], ',': ['Comma', false, false, ','],
    '.': ['Period', false, false, '.'], '/': ['Digit7', true, false, 'Shift + 7'], '←': ['Backquote', false, false, '\\'], '↑': ['Equal', true, false, 'Shift + ì']
  },
  de: {
    '+': ['BracketRight', false, false, '+'], '-': ['Slash', false, false, '−'], '£': ['Equal', false, false, '´'],
    '@': ['KeyQ', false, true, 'AltGr + Q'], '*': ['BracketRight', true, false, 'Shift + +'], ':': ['Period', true, false, 'Shift + .'],
    ';': ['Comma', true, false, 'Shift + ,'], '=': ['Digit0', true, false, 'Shift + 0'], ',': ['Comma', false, false, ','],
    '.': ['Period', false, false, '.'], '/': ['Digit7', true, false, 'Shift + 7'], '←': ['End', false, false, 'End'], '↑': ['Backquote', false, false, '^']
  },
  fr: {
    '+': ['Equal', true, false, 'Shift + ='], '-': ['Digit6', false, false, '−'], '£': [null, false, false, '£ (host layout input)'],
    '@': ['Digit0', false, true, 'AltGr + à'], '*': ['Backslash', false, false, '*'], ':': ['Period', false, false, ':'],
    ';': ['Comma', false, false, ';'], '=': ['Equal', false, false, '='], ',': ['KeyM', false, false, ','],
    '.': ['Semicolon', true, false, 'Shift + ;'], '/': ['Period', true, false, 'Shift + :'], '←': ['Digit8', false, false, '_'], '↑': ['BracketLeft', false, false, '^']
  }
};

export const layouts = {
  us: { name: 'US / English', digitNeedsShift: false },
  it: { name: 'Italian', digitNeedsShift: false },
  de: { name: 'German', digitNeedsShift: false },
  fr: { name: 'French', digitNeedsShift: true }
};

export function resolveCharacter(layoutId, character) {
  if (/^[a-z]$/.test(character)) {
    return { code: letterCodes[layoutId][character], shift: false, allowShift: true, altGraph: false, label: character.toUpperCase(), verification: 'verified' };
  }
  if (/^[0-9]$/.test(character)) {
    const shift = layouts[layoutId].digitNeedsShift;
    return { code: `Digit${character}`, shift, altGraph: false, label: shift ? `Shift + ${character}` : character, verification: 'verified' };
  }
  const entry = symbols[layoutId][character];
  if (!entry) return { code: null, shift: false, altGraph: false, label: 'See VICE keymap', verification: 'review' };
  const [code, shift, altGraph, label] = entry;
  return { code, shift, altGraph, label, verification: layoutId === 'us' ? 'verified' : 'review' };
}
