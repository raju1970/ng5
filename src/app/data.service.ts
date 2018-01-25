import { Injectable } from '@angular/core';
// RXJS behaviour subject library  is to share data between components
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private goals = new BehaviorSubject<any>(['This lifes goal', 'Next Lifes goal']);
  goal = this.goals.asObservable();

    constructor() { }

    changeGoal(goal) {
        this.goals.next(goal);
    }

}
