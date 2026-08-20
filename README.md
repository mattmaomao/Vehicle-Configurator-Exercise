# Vehicle Configurator — ShearComfort Take-Home Exercise

A small, responsive React + TypeScript configurator built with local dummy data. It walks the user through three steps — vehicle, seat coverage, optional upgrades — with a final review/complete screen.

## Setup

```bash
npm install
npm run dev
```

Runs locally on Vite's default dev server port. No environment variables, backend, or API are required.

## Architecture

- **`App.tsx`** owns the single source of truth: a `UserSelections` object (`vehicle`, `coverage`, `upgrades`), lifted to the top and passed down via `UserSelection` / `onSelectionChange` props.
- Each step is its own route (`react-router-dom`). This keeps each step's component boundaries clean and gives the browser back/forward navigation correct.
- Steps read their initial local state from the shared `UserSelection` prop and only commit back to the shared state `onSelectionChange` when the user continues — so navigating back never discards a valid prior selection.
- `BottomNavBar` is a single reusable component shared by all three following steps, handling Back / Continue and the simulated loading spinner before redirecting to the `Summary` page.

## Component used (Radix / shadcn)

- **Select** (`VehicleSelector`) — cascading Year → Make → Model uses shadcn's Select rather than native one, for consistent styling and built-in keyboard/focus handling across browsers.
- **Collapsible** (`SeatCoverage`, `OptionalUpgrade`) — each row group (First Row / Second Row, and Upgrades) is a Collapsible section showing a live selection preview in its header, so users can see their current choice without expanding it. 
- **Popover** (`KeyboardLegend`) — a small "Keyboard use" trigger in the header opens a Popover listing the available keyboard shortcuts.
- **Button / Spinner** — shared shadcn primitives used for the simulated loading indicator.

## Improvements over the current ShearComfort configurator

- In `SeatCoverage`, I decided to keep the selection group and the other choices expanded after a selection so that the user can see and change their mind without unselecting. I also show the selection in the header so that user can view their selected choice after hiding the others.
- In `SeatCoverage`, currently, if the "continue" button is clicked without any selection, the invalid input indicator stays on until the user select ALL rows. As users only have to select one of the row, I deceided to turn the indicator off after the user selected any of them, so that they know they can proceed.
- In `VehicleSelector`, I would modify the current behavior that changing a previous field will clear the choice after to only clear when the choice after is NOT available. As many "Make" appears in many "Year" there's very high chance that it stays valid when then "Year" option is changed. This allow user to change the previous option due to misclick without clearing all inputs.

## What I'd improve with more time

As I'm not familiar with Tailwind CSS and Shadcn, I have spent more time than expected to complete the basic components. Also, as I do not have any prior experience with behavior testing, I did not use AI to just generate one. Hence, I didn't complete all the requirements sadly. Here're what I would improve with more time.
- Persist `UserSelection` state so that refreshing the page doesn't lose selections.
- Display error messaging for invalid input and promopt the user what is missing.
- Extract more reusable components instead of duplicating the markup.
- Design a more responsive UI layout for small devices, such as making the `VehicleSelector` vertical and change the "select" button in `SeatCoverage` to simple circle radio button to save horizontal spaces.
- Manually setup and check the keyboard interactions and add more accessibility friendly settings shuold as HMTL tagging.
- Make a well designed interaction testing, for `VehicleSelector` and `Summary` to check if the data and dependent fields works correctly. 
- Generate car data and read as needed to simulate database fetching instead of using static options in all the pages. The options can then be fetched, filtered and sorted before displaying. For example, the avaliable "Make" and "Model" can be set filtering with the previous field. 

- Comment the codes to increase future readability.
## AI tool disclosure

- GitHub Copilot: code auto-complete and inline suggestions
- Cluade Chatbot: research on shadcn ui setup & tailwind styling, error debugging, generating of README file
