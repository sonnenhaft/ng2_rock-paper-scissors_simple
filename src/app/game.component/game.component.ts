import {Component} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'home',
    styleUrls: ['game.component.css'],
    templateUrl: 'game.component.html'
})
export default class GameComponent {
    static GAME_DURATION: number = 4
    static TIMER_TICK_DURATON: number = 500
    static WINS_MAP = {
        rock: {paper: false, scissors: true},
        paper: {rock: true, scissors: false},
        scissors: {rock: false, paper: true},
    }
    static STATUSES = {
        initial: 'ROCK-PAPER-SCISSORS',
        nobodyWin: 'nobody won',
        win: `you've won!`,
        lose: `you've loosed(`
    }

    stats = {nobodyWin: 0, win:0, lose: 0}

    protected isGameStarted: boolean = false;
    protected intervalSubscriber;

    status: string;
    gameTime: number;
    userSelection: string;
    aiSelection: string;
    TYPES = ['rock', 'paper', 'scissors']

    constructor() {
        this.status = GameComponent.STATUSES['initial'];
    }

    isStarted(): boolean {
        return this.isGameStarted
    }

    isRunning(): boolean {
        return !!this.intervalSubscriber
    }

    safelyClearInterval() {
        if (this.isRunning()) {
            this.intervalSubscriber.unsubscribe()
            this.intervalSubscriber = null
        }
    }

    getCardClass(className: string) {
        return {[className]: true}
    }

    play() {
        this.isGameStarted = true;

        this.status = null;
        this.userSelection = null;
        this.aiSelection = null;

        this.gameTime = GameComponent.GAME_DURATION;

        // yep, decided decrease second to half of a second
        this.intervalSubscriber = Observable
            .interval(GameComponent.TIMER_TICK_DURATON)
            .timeInterval().take(GameComponent.GAME_DURATION)
            .subscribe(
                x => this.gameTime = GameComponent.GAME_DURATION - x.value - 1,
                null,
                () => this.stopGame()
            );
    }

    selectHand(type: string) {
        if (this.isRunning()) {
            this.userSelection = type
        }
    }

    stopGame() {
        this.safelyClearInterval();
        if (!this.userSelection) {
            this.userSelection = this.getRandomCard();
        }
        if (!this.aiSelection) {
            this.aiSelection = this.getRandomCard();
        }

        if (this.userSelection === this.aiSelection) {
            this.status = GameComponent.STATUSES['nobodyWin']
            this.stats['nobodyWin']++;
        } else if (GameComponent.WINS_MAP[this.userSelection][this.aiSelection]) {
            this.status = GameComponent.STATUSES['win'];
            this.stats['win']++;
        } else {
            this.status = GameComponent.STATUSES['lose']
            this.stats['lose']++;
        }
    }

    protected getRandomCard(): string {
        return this.TYPES[Math.floor(Math.random() * this.TYPES.length)];
    }

    ngOnDestroy() { // TODO extend from onDestory from core
        this.safelyClearInterval();
    }
}
