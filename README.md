# ROCK-PAPER-SCISSORS

Accordingly to task I wrote simple game, basing on ng2 framework.
I've took as base angular2-webpack-starter repo.
All that should interest you lays in "src/app/game.component". 
I decided not to make any decomposition, because it would increase complexity of reading the code.
Generally don't see any reason to use ng2 in here, except thinking about it as about "test task", requirement.
Have not applied any css preprocessor, did not investigated how to optimize templates loading.
Brought images that I liked from the google search, nor leaving any copyrights as because it is private repo.
Did not touched any ui-router configs - just removed the page, accordingly to the task - it is not required.

Not tested part related to starter repo itself. Just wrote simple unit tests for my "game.component.ts".
Not applied state to game component for hmr.


## before start working with code run

### install the repo with npm
```
npm install
```

### start the server
```
npm start
```

### run tests
```
npm run-script test
```

### build (output in /dist folder)
```
npm run-script build
```

### Demo (output in /dist folder)
http://rock-paper-scissors-20-dec-2016.bitballoon.com/ password: gamesys 