import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice(); //Shallow copy of a portion of an array
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
  
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    //We need to do that because we are only working with a copy of the array "ingredients.slice()"
    this.ingredientsChanged.next(this.ingredients.slice()); //shopping-list.component is subscribed to this
  }

  addIngredients(ingredients: Ingredient[]) {
    //... spread the ingredients into a list of ingredients instead of the whole array
    this.ingredients.push(...ingredients); 
    //RXJS: A Subject is a type of observable that allows you to multicast values 
    //to multiple subscribers. You can emit new values to a Subject by calling its next() method. 
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
