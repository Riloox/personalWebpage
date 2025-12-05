# Personal Portfolio
  
Terminal-inspired React + Vite portfolio that ships a bilingual, DOS-shell themed resume builder with Vim-style editing, easy-mode command buttons, and live GitHub project data.

## Key Features

- **Retro UI & copy** modeled after a DOS shell, including status/message bar, ANSI-inspired typography, and a command hint strip.
- **Vim-inspired editing**: press `i` to go into insert mode on the rendered portfolio, make edits, hit `Esc` to return to normal mode, and use `:w`/`:wq` to save the current buffer as a downloadable JSON export.
- **Command palette** – type `:` to run shortcuts like `:load` (imports a previously exported JSON), `:esp`/`:en` (switch languages), `cls` (reset to defaults), or toggle easy mode to reveal clickable buttons for those actions.
- **Live GitHub feed** powered by `src/hooks/useGithubProjects.ts`; it fetches the most starred, non-forked repos for the configured username and displays them inside the projects section.
- **Bilingual & data-driven** sections for hero, skills, experience, projects, and contact info, all sourced from `src/data/profile.ts`.

## Keyboard shortcuts & commands

- `i`: enter insert mode on the portfolio shell (focuses the editable frame).
- `Esc`: exit insert mode and keep changes or cancel command entry.
- `:`: open command mode (type commands, `Enter` to run, `Esc` to cancel).
- `:w` / `:wq`: export the current buffer to `portfolio-export-<timestamp>.json`.
- `:load`: open the JSON selector and overwrite the shell buffer with a previous export.
- `:esp` / `:en`: switch the text between Spanish and English content.
- `cls`: clear the buffer and fall back to the default rendered sections.
- Easy mode button: toggle between manual typing and a button-based command palette.

## Getting started

```bash
npm install
npm run dev    # start the Vite dev server with fast HMR
npm run build  # run TypeScript type checks and build for production
npm run preview # preview the production build locally
```

## Customization

- Update `src/data/profile.ts` to change hero copy, experience bullets, skill groups, project blurbs, and contact/social info for both supported languages.
- If you want the GitHub project list to track a different account, adjust the username passed to `useGithubProjects` inside `src/sections/ProjectsSection.tsx`.
- Modify `src/index.css` to restyle the retro shell, tweak spacing, or swap fonts while keeping the DOS layout intact.
- Additional sections can be added under `src/sections/`, each receiving the current `language` prop to keep the bilingual behavior consistent.

Deploy the resulting build wherever static sites are supported—Vite outputs the final bundle to `dist/`.

## GitHub Pages

- Vite already uses `base`/`publicPath` pointing to `/personalWebpage/` when `NODE_ENV=production`, so the build references the right URLs on `https://<your-user>.github.io/personalWebpage/`.
- Run `npm run deploy` to let `gh-pages` publish the `dist/` output to the `gh-pages` branch automatically (the `predeploy` script makes sure the app is built first).
- In your repository settings, configure GitHub Pages to serve from the `gh-pages` branch and leave the site path as `/personalWebpage/`. This prevents the browser from loading the raw `src/main.tsx` file with the wrong MIME type.
