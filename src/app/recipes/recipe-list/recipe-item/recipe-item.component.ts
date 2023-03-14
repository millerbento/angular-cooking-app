import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipeExposed: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onSelectedRecipe() {
    this.recipeSelected.emit();
  }

}
