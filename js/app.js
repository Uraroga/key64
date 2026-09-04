import { physicalKeyboard, allKeyIds } from './data/keyboard.js';
import { descriptions, specialCards } from './data/descriptions.js';
import { layouts, resolveCharacter } from './data/layouts.js';
import { mappingFor } from './emulators/vice.js';

const keysRoot = document.querySelector('#keyboard-keys');
const layoutSelect = document.querySelector('#layout-select');
const tooltip = document.querySelector('#tooltip');
const liveInput = document.querySelector('#live-input');
const specialRoot = document.querySelector('#special-cards');
const details = {
  name: document.querySelector('#detail-name'),
  action: document.querySelector('#detail-action'),
  mapping: document.querySelector('#detail-mapping'),
  modifier: document.querySelector('#detail-modifier'),
  status: document.querySelector('#detail-status'),
  note: document.querySelector('#detail-note')
};

let selectedKey = 'run-stop';
let layoutId = localStorage.getItem('key64-layout') || 'us';
if (!layouts[layoutId]) layoutId = 'us';
layoutSelect.value = layoutId;

const alphabeticKeyIds = new Set('qwertyuiopasdfghjklzxcvbnm'.split(''));

function createKey({ id, primary, secondary, row, column, width, className }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `c64-key ${className}`.trim();
  button.dataset.keyId = id;
  button.style.setProperty('--key-row', row);
  button.style.setProperty('--key-column', column);
  button.style.setProperty('--key-span', width);
  button.setAttribute('aria-label', `${descriptions[id]?.name || primary} — show modern keyboard mapping`);
  button.innerHTML = `<span class="primary"></span><span class="secondary"></span>`;
  button.querySelector('.primary').textContent = primary;
  button.querySelector('.secondary').textContent = alphabeticKeyIds.has(id) ? '' : secondary;
  return button;
}

const mainKeyboard = document.createElement('div');
mainKeyboard.className = 'main-keyboard';
mainKeyboard.setAttribute('role', 'group');
mainKeyboard.setAttribute('aria-label', 'C64 main keyboard');

physicalKeyboard.mainKeys.forEach(key => mainKeyboard.append(createKey(key)));
mainKeyboard.append(createKey(physicalKeyboard.spaceKey));

const functionBank = document.createElement('div');
functionBank.className = 'function-bank';
functionBank.setAttribute('role', 'group');
functionBank.setAttribute('aria-label', 'C64 function keys');
physicalKeyboard.functionBank.forEach(key => functionBank.append(createKey(key)));
keysRoot.append(mainKeyboard, functionBank);

specialCards.forEach(([id, title, copy]) => {
  const card = document.createElement('article');
  card.className = 'special-card';
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.selectKey = id;
  button.textContent = title;
  const paragraph = document.createElement('p');
  paragraph.textContent = copy;
  card.append(button, paragraph);
  specialRoot.append(card);
});

function getMapping(keyId) {
  return mappingFor(keyId, layoutId, resolveCharacter);
}

function modifierText(mapping) {
  const modifiers = [];
  if (mapping.shift) modifiers.push('Shift');
  if (mapping.altGraph) modifiers.push('AltGr');
  return modifiers.length ? modifiers.join(' + ') : 'None';
}

function showDetails(keyId) {
  const description = descriptions[keyId];
  const mapping = getMapping(keyId);
  details.name.textContent = description.name;
  details.action.textContent = description.action;
  details.mapping.textContent = mapping.label;
  details.modifier.textContent = modifierText(mapping);
  details.status.innerHTML = mapping.verification === 'verified'
    ? '<span class="status-badge status-verified">Verified in VICE source</span>'
    : '<span class="status-badge status-review">Layout chord needs review</span>';
  details.note.textContent = [description.note, mapping.note].filter(Boolean).join(' ');
}

function selectKey(keyId, focus = false) {
  if (!allKeyIds.includes(keyId)) return;
  document.querySelector('.c64-key.is-selected')?.classList.remove('is-selected');
  const key = document.querySelector(`[data-key-id="${keyId}"]`);
  key.classList.add('is-selected');
  selectedKey = keyId;
  showDetails(keyId);
  if (focus) {
    key.focus({ preventScroll: true });
    document.querySelector('#details').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function showTooltip(key, event) {
  const keyId = key.dataset.keyId;
  const mapping = getMapping(keyId);
  tooltip.innerHTML = `<strong>${descriptions[keyId].name}</strong><span>${mapping.label}</span>`;
  tooltip.hidden = false;
  const margin = 14;
  const x = Math.min(event.clientX + margin, window.innerWidth - tooltip.offsetWidth - margin);
  const y = Math.max(margin, event.clientY - tooltip.offsetHeight - margin);
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

keysRoot.addEventListener('pointermove', event => {
  const key = event.target.closest('.c64-key');
  if (key) showTooltip(key, event);
  else tooltip.hidden = true;
});
keysRoot.addEventListener('pointerleave', () => { tooltip.hidden = true; });
keysRoot.addEventListener('click', event => {
  const key = event.target.closest('.c64-key');
  if (key) selectKey(key.dataset.keyId);
});
keysRoot.addEventListener('focusin', event => {
  const key = event.target.closest('.c64-key');
  if (key) selectKey(key.dataset.keyId);
});

specialRoot.addEventListener('click', event => {
  const button = event.target.closest('[data-select-key]');
  if (button) selectKey(button.dataset.selectKey, true);
});

layoutSelect.addEventListener('change', () => {
  layoutId = layoutSelect.value;
  localStorage.setItem('key64-layout', layoutId);
  showDetails(selectedKey);
  liveInput.innerHTML = `<span class="pulse" aria-hidden="true"></span>${layouts[layoutId].name} layout selected. Physical-key detection now follows this layout.`;
});

function bindingMatches(event, mapping) {
  const codes = [mapping.code, ...(mapping.alternatives || [])].filter(Boolean);
  if (!codes.includes(event.code)) return false;
  const hasAltGraph = Boolean(event.getModifierState?.('AltGraph') || (event.altKey && event.ctrlKey));
  if (!mapping.allowShift && Boolean(mapping.shift) !== event.shiftKey) return false;
  if (Boolean(mapping.altGraph) !== hasAltGraph) return false;
  return true;
}

function matchingKeyIds(event) {
  if (event.code === 'ShiftLeft') return ['left-shift'];
  if (event.code === 'ShiftRight') return ['right-shift'];
  return allKeyIds.filter(id => bindingMatches(event, getMapping(id)));
}

window.addEventListener('keydown', event => {
  if (event.target?.matches?.('select')) return;
  const matches = matchingKeyIds(event);
  if (!matches.length) {
    liveInput.innerHTML = `<span class="pulse" aria-hidden="true"></span>${event.code} has no confirmed Key64 mapping in ${layouts[layoutId].name}.`;
    return;
  }
  matches.forEach(id => document.querySelector(`[data-key-id="${id}"]`)?.classList.add('is-pressed'));
  if (event.shiftKey && !matches.includes('left-shift') && !matches.includes('right-shift')) {
    document.querySelector('[data-key-id="left-shift"]')?.classList.add('is-pressed');
  }
  const names = matches.map(id => descriptions[id].name).join(' / ');
  liveInput.innerHTML = `<span class="pulse" aria-hidden="true"></span>${event.code} → C64 ${names}`;
});

window.addEventListener('keyup', () => {
  document.querySelectorAll('.c64-key.is-pressed').forEach(key => key.classList.remove('is-pressed'));
});
window.addEventListener('blur', () => {
  document.querySelectorAll('.c64-key.is-pressed').forEach(key => key.classList.remove('is-pressed'));
});

selectKey(selectedKey);
