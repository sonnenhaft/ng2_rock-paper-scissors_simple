import {Component} from '@angular/core';

@Component({
    selector: 'home',
    styleUrls: ['game.component.css'],
    templateUrl: 'game.component.html'
})
export default class GameComponent {
    static GAME_DURATION: number = 4
    static WINS_MAP: Map<string, Object> = {
        rock: {paper: false, scissors: true},
        paper: {rock: true, scissors: false},
        scissors: {rock: false, paper: true},
    }
    static STATUSES: Map<string, string> = {
        initial: 'ROCK-PAPER SCISSORS',
        nobodyWin: 'nobody won',
        win: `you've won!`,
        lose: `you've loosed(`
    }

    protected isGameStarted: boolean = false;
    protected interval: number;

    public status: string;
    public time: number;
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
        return !!this.interval
    }

    protected safelyClearInterval() {
        if (this.isRunning()) {
            window.clearInterval(this.interval);
            this.interval = null
        }
    }

    getCardClass(className: string): Map<string, boolean> {
        return {[className]: true}
    }

    play() {
        this.isGameStarted = true;

        this.status = null;
        this.userSelection = null;
        this.aiSelection = null;

        this.time = GameComponent.GAME_DURATION;
        this.interval = setInterval(() => {
            this.time -= 1;
            if (!this.time) {
                this.stopGame();
            }
        }, 1000);
    }

    selectHand(type: string) {
        if (this.isRunning()) {
            this.userSelection = type
        }
    }

    protected stopGame() {
        this.safelyClearInterval();
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
        this.safelyClearInterval();
    }
}
