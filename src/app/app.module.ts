import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {ENV_PROVIDERS} from './starter-staff/environment';
import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './starter-staff/app.resolver';
import {AppState, InternalStateType} from './starter-staff/app.state.service';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import GameComponent from './game.component/game.component';
import { NoContentComponent } from './no-content.component';

const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

export const ROUTES: Routes = [
    { path: '',      component: GameComponent },
    { path: '**',    component: NoContentComponent },
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        GameComponent,
        NoContentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
    ],
    providers: [
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        this.appState._state = store.state;
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.state = this.appState._state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

