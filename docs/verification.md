# VICE mapping verification

Key64 version 1 targets the GTK3 symbolic keymaps in the official VICE source mirror.

Sources reviewed on 2026-09-04:

- `vice/data/C64/gtk3_sym.vkm` (US/default)
- `vice/data/C64/gtk3_sym_it.vkm`
- `vice/data/C64/gtk3_sym_de.vkm`
- `vice/data/C64/gtk3_sym_fr.vkm`
- VICE manual sections 1.2 (keyboard emulation) and 3.2 (keymap files)

Official source directory:

https://github.com/VICE-Team/svn-mirror/tree/main/vice/data/C64

## Verified directly in the VICE keymap files

- Letters A–Z and digits 0–9 target the correct C64 matrix positions.
- Left and right Shift are distinct.
- Caps Lock maps to C64 SHIFT LOCK.
- Left Control maps to C64 CTRL in the current GTK3 symbolic keymaps.
- Tab maps to the Commodore key in the current GTK3 symbolic keymaps.
- Escape maps to RUN/STOP.
- Home maps to CLR/HOME.
- Backspace and Delete map to DEL; Insert maps to shifted INST.
- Enter/Return maps to RETURN.
- Host F1–F8 map to C64 F1–F8, with even functions generated as shifted odd function keys.
- Arrow Right/Left map to the C64 horizontal cursor key; Arrow Down/Up map to the vertical cursor key.
- RESTORE: Page Up in US and French; F12 in Italian; F12 and Page Up are present in German.
- Symbolic keysyms for `+ - £ @ * : ; = , . /` and the printable arrow keys were checked against their C64 matrix targets.

## Still requiring hands-on verification

The modern physical chord shown for several punctuation and symbol keysyms on Italian, German and French layouts is a curated translation from the standard host layout. These should be tested on real operating-system layouts with a current GTK3 VICE build. They are marked **Layout chord needs review** in the interface.

French `£` intentionally has no physical-key binding in the prototype because the standard way of entering that keysym varies by platform. The UI reports the symbolic requirement without inventing a scancode.

VICE has different UI backends, versions, operating systems and user-configurable keymaps. Key64 must therefore continue to identify its reference profile precisely rather than claiming one universal mapping.
