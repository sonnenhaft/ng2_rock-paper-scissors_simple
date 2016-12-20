import { inject, TestBed } from '@angular/core/testing';

import { AppState } from '../starter-staff/app.state.service';
import GameComponent from './game.component';

describe('Home', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ AppState, GameComponent ]
  }));

  it('should have a title', inject([ GameComponent ], (game: GameComponent) => {
    expect(true).toEqual(true);
  }));
});
