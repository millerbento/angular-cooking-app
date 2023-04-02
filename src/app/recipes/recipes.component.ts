import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] //All components under it will have access to the RecipeService
})
export class RecipesComponent {

  constructor () {}

  ngOnInit() {
  }
}
