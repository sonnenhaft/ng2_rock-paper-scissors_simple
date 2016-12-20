import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../starter-staff/app.state.service';
import { GameComponent } from './game.component';
import { Title } from './title';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      AppState,
      Title,
      GameComponent
    ]
  }));

  it('should have default data', inject([ GameComponent ], (home: GameComponent) => {
    expect(home.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ GameComponent ], (home: GameComponent) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ GameComponent ], (home: GameComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
