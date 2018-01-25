import { Component, OnInit } from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:
  [
      trigger('goals', [
          transition('* => *', [
              query(':enter', style({ opacity: 0 }), { optional: true }),
              query(':enter', stagger('300ms', [animate('.6s ease-in', keyframes([
                  style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                  style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                  style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ]))
              ]), { optional: true }),

              query(':leave', stagger('300ms', [animate('.6s ease-in', keyframes([
                  style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                  style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                  style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
              ]))
              ]), { optional: true })
            ])
         ])
  ]
})
export class HomeComponent implements OnInit {
 //Interpolation, prop and event binding makes more ineractive. Interpolation is used for the purpose of communicating  properties in the component class to HTML. It goes one component to template which is one-way.
    itemCount: number = 4;
    //Property Binding is used to control the value of a html item. It goes one component to template which is one-way
    btnText: string = 'Add an Item';
    //Two-Way data binding is used to go from component to template and  vice versa to enable updating the value in template from the component variable/object.
    //ngModel is the key.
    goalText: string = 'My first life goal';
    goals = ['My first life goal', 'My second life goal', 'My third life goal']

    constructor(private _data: DataService) { }

    ngOnInit() {
        this._data.goal.subscribe(res => this.goals = res);
        this.itemCount = this.goals.length;
        this._data.changeGoal(this.goals);
    }

    addItem() {
        this.goals.push(this.goalText);
        this.goalText = '';
        this.itemCount = this.goals.length;
        this._data.changeGoal(this.goals);
    }

    removeItem(i) {
        this.goals.splice(i, 1);
        //this.goalText = '';
        //this.itemCount = this.goals.length;
        this._data.changeGoal(this.goals);
    }
}
