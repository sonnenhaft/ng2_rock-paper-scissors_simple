/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './starter-staff/app.state.service';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.css'],
    template: `
<main><router-outlet></router-outlet></main>
<footer>Developed by <a href="mailTo:vladimir.sonnenhaft@gmail.com">vladimir.sonnenhaft@gmail.com</a></footer>
`
})
export class AppComponent {
    constructor(public appState: AppState) {
    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }
}
