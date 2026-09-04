import assert from 'node:assert/strict';
import { physicalKeyboard, allKeyIds } from '../js/data/keyboard.js';
import { descriptions } from '../js/data/descriptions.js';
import { layouts, resolveCharacter } from '../js/data/layouts.js';
import { mappingFor, viceProfile } from '../js/emulators/vice.js';

assert.equal(new Set(allKeyIds).size, allKeyIds.length, 'keyboard IDs must be unique');
assert.equal(allKeyIds.length, 66, 'expected 66 interactive C64 keys');
assert.equal(physicalKeyboard.mainKeys.length, 61, 'expected 61 keys in the four main rows');
assert.equal(physicalKeyboard.functionBank.length, 4, 'expected four keys in the function bank');
assert.deepEqual([...new Set(physicalKeyboard.mainKeys.map(({ row }) => row))], [1, 2, 3, 4]);
assert.deepEqual(physicalKeyboard.functionBank.map(({ row }) => row), [1, 2, 3, 4]);
assert.equal(physicalKeyboard.spaceKey.column, 15, 'space bar must start at 3.5 key units');
assert.equal(physicalKeyboard.spaceKey.width, 36, 'space bar must span nine key units');

for (const row of [1, 2, 3, 4]) {
  const rowKeys = physicalKeyboard.mainKeys.filter(key => key.row === row);
  assert.equal(Math.min(...rowKeys.map(key => key.column)), 1, `row ${row} must begin at column 1`);
  assert.equal(Math.max(...rowKeys.map(key => key.column + key.width - 1)), 64, `row ${row} must end at column 64`);
}

for (const id of allKeyIds) {
  assert.ok(descriptions[id], `missing description for ${id}`);
  assert.ok(viceProfile.mappings[id], `missing VICE mapping for ${id}`);
  for (const layoutId of Object.keys(layouts)) {
    const mapping = mappingFor(id, layoutId, resolveCharacter);
    assert.ok(mapping.label, `missing ${layoutId} mapping label for ${id}`);
    assert.ok(['verified', 'review'].includes(mapping.verification), `invalid verification state for ${layoutId}/${id}`);
  }
}

assert.equal(mappingFor('commodore', 'us', resolveCharacter).code, 'Tab');
assert.equal(mappingFor('ctrl', 'us', resolveCharacter).code, 'ControlLeft');
assert.equal(mappingFor('run-stop', 'us', resolveCharacter).code, 'Escape');
assert.equal(mappingFor('restore', 'it', resolveCharacter).code, 'F12');
assert.equal(mappingFor('restore', 'us', resolveCharacter).code, 'PageUp');
assert.equal(resolveCharacter('fr', 'a').code, 'KeyQ');
assert.equal(resolveCharacter('de', 'z').code, 'KeyY');

console.log(`Key64 data checks passed: ${allKeyIds.length} interactive keys × ${Object.keys(layouts).length} layouts.`);
