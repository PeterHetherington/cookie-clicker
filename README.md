# cookie-clicker

## Overview

A clone of cookie clicker, fetching game data through a provided API, includes click & time-based currency generation, purchasing upgrades and dynamic UI updates.

<h3>Color Palette</h3>
<div style="display: flex; gap: 18px;">
  <div style="width: 40px; height: 40px; background-color: #7c6152;"></div>
  <div style="width: 40px; height: 40px; background-color: #f8f3ed;"></div>
  <div style="width: 40px; height: 40px; background-color: #93877e;"></div>
  <div style="width: 40px; height: 40px; background-color: #b79f91;"></div>
  <div style="width: 40px; height: 40px; background-color: #b4895c;"></div>
  <div style="width: 40px; height: 40px; background-color: #2d2d2b;"></div>
</div>
#7c6152
#f8f3ed
#93877e
#b79f91
#b4895c
#2d2d2b

### Current features:

- Click & time based currency generation
- Upgrades store
- Upgrade display
- Stat viewing
- Responsive UI with modern design

### Planned features:

- General store for multipliers
- Selling upgrades
- More upgrades
- Upgrade balancing
- Mobile display support

### Tech Stack

Frontend:
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)

Deployment:
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github&logoColor=white)

## Set-up

### Pre-requisites

- Node.js
- npm

### Installation

1. Clone the repo

```
git clone git@github.com:PeterHetherington/cookie-clicker.git
cd cookie-clicker
```

2. Install dependencies

```
npm install
```

3. Run the game

```
Use Live server extension to run the game
```

## Reflection

Requirements met:

🎯 Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.

🎯 Ensure that functions are used effectively to keep code organised and reusable.

🎯 Implement event listeners to handle user interactions.

🎯 Use local storage to save and restore the cookie count and relevant game information.

🎯 Use setInterval to increment the cookie count and manage the game state each second.
Managing the game state includes saving progress and updating the DOM.

Stretch Requirements met:

🏹 Consolidate upgrade management by managing all upgrades in a single function.

🏹 Improve UX with animations, sound effects, or other visual effects.

🏹 Implement error handling using try/catch

- I would have like to include more features such as with store items but due to time contraints I have left this blank with a nod to anyone that has played Call of duty Zombies. Possibly something I will revisit in the future to have a play with abilities & multipliers.
- Animations are a bit lacking & is something I need to read up on. Especially with a game project there should definitely be more interactivity/motion.
- Gerneral layout is fairly solid but there will be a breakdown in display on smaller screens due to lack of media queries. I would have also liked to allow users to adjust the display through both layout & colour theme changes.
- I created a error page to redirect user to upon errors with fetch.
- I have implemented a stats popup displaying info to the user - this could have been fleshed out more with more tracking.

Bugs

- One minor "bug" is the "Owned assets" will always display in the order ther are bought in. Probably because I've structured it in a way that assets are only stored/initalised in state on purchase rather than being declared beforehand. Possible future fix would be to itterate over the upgrades data from the API then matching against assets in state for ordering.
