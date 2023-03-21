import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice(); //Shallow copy of a portion of an array
  }
  
  addIngredient(ingredient: Ingredient) {
    console.log(ingredient);
    this.ingredients.push(ingredient);
    //We need to do that because we are only working with a copy of the array "ingredients.slice()"
    this.ingredientsChanged.emit(this.ingredients.slice()); //shopping-list.component is subscribed to this
  }

  addIngredients(ingredients: Ingredient[]) {
    //... spread the ingredients into a list of ingredients instead of the whole array
    this.ingredients.push(...ingredients); 
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
