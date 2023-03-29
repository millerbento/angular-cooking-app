import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.route.params.
        //I don't need clean up the subscription here because 'params' is managed by Angular
        //That won't be the case if I create my own observables
        subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != undefined;
            console.log(this.editMode);
          }
        );
    }
}
