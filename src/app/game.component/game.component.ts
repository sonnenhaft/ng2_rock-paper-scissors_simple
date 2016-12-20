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

    protected isGameStarted: boolean = false;
    protected intervalSubscriber;

    public status: string;
    public gameTime: number;
    public userSelection: string;
    public aiSelection: string;
    public TYPES = ['rock', 'paper', 'scissors']

    constructor() {
        this.status = GameComponent.STATUSES['initial'];
    }

    isStarted(): boolean {
        return this.isGameStarted
    }

    isRunning(): boolean {
        return !!this.intervalSubscriber
    }

    protected safelyUnsubscribeFromInterval() {
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

    protected stopGame() {
        this.safelyUnsubscribeFromInterval();
        if (!this.userSelection) {
            this.userSelection = this.getRandomCard();
        }
        this.aiSelection = this.getRandomCard();

        if (this.userSelection === this.aiSelection) {
            this.status = GameComponent.STATUSES['nobodyWin']
        } else if (GameComponent.WINS_MAP[this.userSelection][this.aiSelection]) {
            this.status = GameComponent.STATUSES['win'];
        } else {
            this.status = GameComponent.STATUSES['lose']
        }
    }

    protected getRandomCard(): string {
        return this.TYPES[Math.floor(Math.random() * this.TYPES.length)];
    }

    ngOnDestroy() { // TODO extend from onDestory from core
        this.safelyUnsubscribeFromInterval();
    }
}
