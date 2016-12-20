import {inject, TestBed} from '@angular/core/testing';

import {AppState} from '../starter-staff/app.state.service';
import GameComponent from './game.component';

describe('Home', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [AppState, GameComponent]
    }));

    it('should be running and starter after play clicked', inject([GameComponent], (game: GameComponent) => {
        expect(game.isStarted()).toEqual(false);
        expect(game.isRunning()).toEqual(false);
        game.play()
        expect(game.isStarted()).toEqual(true);
        expect(game.isRunning()).toEqual(true)
    }));

    it('should be stopped when stop was called after play', inject([GameComponent], (game: GameComponent) => {
        game.play()
        game.stopGame()
        expect(game.isStarted()).toEqual(true);
        expect(game.isRunning()).toEqual(false);
    }));

    it('should create class {x: true} where x was a string argument', inject([GameComponent], (game: GameComponent) => {
        expect(game.getCardClass('x')).toEqual({x: true});
    }));

    describe('testing game rules', ()=> {
        let testThatChecksIfCombinationIsProper = (userCard, aiCard, result) => {
            it(`${result} when "${userCard}" vs "${aiCard}`, inject([GameComponent], (game: GameComponent) => {
                game.play()
                game.selectHand(userCard)
                game.aiSelection = aiCard
                game.stopGame()
                expect(game.status).toEqual(GameComponent.STATUSES[result])
            }));
        }

        testThatChecksIfCombinationIsProper('paper', 'rock', 'win')
        testThatChecksIfCombinationIsProper('rock', 'scissors', 'win')
        testThatChecksIfCombinationIsProper('scissors', 'paper', 'win')

        testThatChecksIfCombinationIsProper('paper', 'scissors', 'lose')
        testThatChecksIfCombinationIsProper('rock', 'paper', 'lose')
        testThatChecksIfCombinationIsProper('scissors', 'rock', 'lose');

        ['paper', 'rock', 'scissors'].forEach(item=> {
            testThatChecksIfCombinationIsProper(item, item, 'nobodyWin')
        })
    })
});
