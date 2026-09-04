import assert from 'node:assert/strict';
import { keyboardRows, allKeyIds } from '../js/data/keyboard.js';
import { descriptions } from '../js/data/descriptions.js';
import { layouts, resolveCharacter } from '../js/data/layouts.js';
import { mappingFor, viceProfile } from '../js/emulators/vice.js';

assert.equal(new Set(allKeyIds).size, allKeyIds.length, 'keyboard IDs must be unique');
assert.equal(keyboardRows.length, 5, 'expected five C64 keyboard rows');

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
