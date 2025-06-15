# cookie-clicker

Project description
This project is a remake of CookieClicker, using game data from a provided API.

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


colour pallet : cookie dough theme
#7c6152
#f8f3ed
#93877e
#b79f91
#b4895c
#2d2d2b

Reflection
- I would have like to include more features such as with store items but due to time contraints I have left this blank with a nod to anyone that has played Call of duty Zombies. Possibly something I will revisit in the future to have a play with abilities & multipliers.
- Animations are a bit lacking & is something I need to read up on. Especially with a game project there should definitely be more interactivity/motion.
- Gerneral layout is fairly solid but there will be a breakdown in display on smaller screens due to lack of media queries. I would have also liked to allow users to adjust the display through both layout & colour theme changes.
- I created a error page to redirect user to upon errors with fetch.
- I have implemented a stats popup displaying info to the user - this could have been fleshed out more with more tracking.

Bugs
- one minor "bug" is the "Owned assets" will always display in the order ther are bought in. Probably because I've structured it in a way that assets are only stored/initalised in state on purchase rather than being declared beforehand. Possible future fix would be to itterate over the upgrades data from the API then matching against assets in state for ordering.
