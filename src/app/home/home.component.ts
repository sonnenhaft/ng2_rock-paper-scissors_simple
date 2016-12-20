import {Component} from '@angular/core';
import {Component} from '@angular/core';
import {AppState} from '../app.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    time = 0;
    interval = null;
    isGameStarted = false;
    userSelection = null;
    status = null;
    aiSelection = null;
    TYPES = ['rock', 'paper', 'scissors']

    WONS_MAP = {
        rock: {paper: false, scissors: true },
        paper: {rock: true, scissors: false },
        scissors: {rock: false, paper: true },
    }

    constructor(public appState: AppState) {
    }

    clearInterval() {
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null
        }
    }

    getClass(className) {
        return {[className]: true}
    }

    play() {
        this.time = 1;
        this.status = null;
        this.userSelection = null;
        this.aiSelection = null;
        this.isGameStarted = true;
        this.interval = setInterval(() => {
            this.time -= 1;
            if (!this.time) {
                this.stopGame();
            }
        }, 1000);
    }

    selectClass(type){
        this.userSelection = type
    }

    stopGame() {
        this.clearInterval();
        if (!this.userSelection) {
            this.userSelection = this.TYPES[Math.floor(Math.random() * this.TYPES.length)]
        }
        this.aiSelection = this.TYPES[Math.floor(Math.random() * this.TYPES.length)]

        if (this.userSelection === this.aiSelection) {
            this.status = 'nobody won'
        } else if(this.WONS_MAP[this.userSelection][this.aiSelection]) {
            this.status = `you've won!`
        } else {
            this.status = `you've loosed(`
        }
    }

    ngOnDestroy() { // TODO extend from onDestory from core
        this.clearInterval();
    }
}
