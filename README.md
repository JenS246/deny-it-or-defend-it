# Deny It or Defend It?

A short educational game for beginning paralegal students learning the difference between a denial and an affirmative defense in Pennsylvania civil litigation.

## How it works

The game presents 10 plaintiff allegations and defendant responses. Students choose **Deny It** when the defendant disputes the allegation or **Defend It** when the response raises an affirmative defense. Each answer receives immediate feedback, and the final screen displays the score out of 10.

The legal examples are limited to payment, release, statute of limitations, and waiver. These defenses appear in [Pennsylvania Rule of Civil Procedure 1030](https://www.pacodeandbulletin.gov/secure/pacode/data/231/chapter1000/s1030.html), which generally requires affirmative defenses to be pleaded as New Matter.

## Run locally

No build step or dependencies are required.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

Run the game data and scoring tests with:

```bash
node tests/game.test.js
```

## Files

- `index.html` contains the accessible game screens.
- `styles.css` contains the responsive visual design and dark-mode tokens.
- `game.js` contains the approved questions, scoring, feedback, keyboard controls, and restart logic.
- `.github/workflows/pages.yml` deploys the static files to GitHub Pages after a push to `main`.

## Live site

- Game: https://jens246.github.io/deny-it-or-defend-it/
- Repository: https://github.com/jens246/deny-it-or-defend-it

## Accessibility

The game supports keyboard controls (`1`, `2`, and `Enter`), visible focus styles, live feedback announcements, responsive layouts, and reduced-motion preferences.
