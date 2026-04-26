# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal portfolio website for Martin Koller, served at **kollermartin.com** via **GitHub Pages** (custom domain configured in `CNAME`). Deployment is "push to `master` and GitHub Pages serves the working tree" — there is no CI build step, so whatever is committed is what ships.

## Build / dev workflow

The site is plain static HTML + JS + compiled CSS. A small `package.json` exists **only to provide a SCSS toolchain** (`sass`) and a dev server (`live-server`) for local work — the deploy is still "push to `master`, GitHub Pages serves the working tree."

After cloning: `npm install`. Then:

- `npm run dev` — watches `sass/` and serves the site at `http://localhost:4173` with auto-reload. Use this while editing.
- `npm run build` — one-shot SCSS compile. **Run this before committing any `.scss` change**, because `css/main.css` is committed and Pages serves it directly. If you forget, your style change won't ship.
- `npm run watch` / `npm run serve` — the two halves of `dev`, in case you want them in separate terminals.

`sass/main.scss` is the entry point. It uses `@use 'partial-name'`, and each partial that needs design tokens does `@use './variables' as *;` at the top — so adding a new partial means importing it from `main.scss` *and* `@use`-ing variables inside the partial itself.

`js/script.js` is plain vanilla JS, no transpile step.

There are no tests and no linter configured. `node_modules/` is gitignored.

## Architecture notes

**Single-page, anchor-scrolled layout.** `index.html` contains five `<section>`s with ids `c-home`, `c-about`, `c-skills`, `c-projects`, `c-contact`. The header `<ul class="navigation">` mirrors these: each `<li>` carries a `name` attribute equal to the target section's `id`, and `js/script.js` uses that `name` ↔ `id` mapping to (a) smooth-scroll on click and (b) compute which section is currently in view to apply the `underscore` active-state class. If you add a new section, you must update both the section markup *and* `js/script.js` — the file holds explicit `querySelector` references per nav item rather than iterating generically.

**Header behavior is scroll-driven, class-toggled.** On scroll, `script.js` toggles `header__scroll` on the header and swaps `navigation__item--not-scrolled` ↔ `navigation__item--scrolled` on each nav `<li>`. All visual differences live in SCSS keyed off those modifier classes — don't put style logic in JS.

**SCSS is partial-per-section.** `sass/main.scss` is just an import list; each section of the page has its own partial (`_landscape.scss` = home/hero, `_about.scss`, `_journey.scss` = work-experience timeline, `_skills.scss`, `_project.scss`, `_contact.scss`, `_footer.scss`, `_header.scss`). Cross-cutting concerns are split into `_base.scss` (reset + responsive root font-size), `_variables.scss` (colors, font, breakpoints `$bp-min` … `$bp-xbig`), and `_utility.scss` (spacing/text helpers like `mb-s`, `ta-c`, heading sizes `heading--s/m/l`).

**Naming is BEM-ish.** Block (`journey`), element with `__` (`journey__item__heading`), modifier with `--` (`navigation__item--scrolled`, `heading--l`). Stick with this when adding markup so the existing partials keep matching.

**Responsive scaling uses root-em.** `_base.scss` shrinks `html { font-size }` at each `$bp-*` breakpoint instead of restyling each component. Component sizes use `rem`, so most responsive adjustments come "for free" — only reach for component-specific media queries when layout (not just scale) needs to change.
