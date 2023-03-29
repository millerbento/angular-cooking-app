import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable() //Need that to inject a service into a service
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Parmigiana',
      'Breaded chicken cutlets topped with tomato sauce and melted mozzarella cheese, often served with pasta on the side. A popular Italian-American dish.',
      'https://assets.bonappetit.com/photos/5caf479af8ce278519b2a1b2/16:9/w_4800,h_2700,c_limit/chicken-parmesan.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Cheese', 3),
        new Ingredient('Tomato Sauce', 1)
      ]
    ),
    new Recipe(
      'Pork Bites',
      'Pork bites are small pieces of seasoned pork, usually marinated and then grilled or pan-fried until crispy on the outside and tender on the inside. They can be served as a snack, appetizer, or main course and are often accompanied by a dipping sauce.',
      'https://img.taste.com.au/7D5MxM1J/w1200-h630-cfill/taste/2017/11/sticky-pork-belly-bites-taste_1980x1320-132894-1.jpg',
      [
        new Ingredient('Pork', 1),
        new Ingredient('Sauce', 1)
      ]      
    ),
    new Recipe(
      'Caesar Salad',
      'Caesar Salad is a classic dish made with romaine lettuce, Parmesan cheese, croutons, and a dressing of olive oil, lemon juice, garlic, and anchovies. It is a popular side dish or light meal often topped with grilled chicken, shrimp or salmon.',
      'https://images.getrecipekit.com/20220119052510-caesarsalad_img_9360.jpeg?class=16x9',
      [
        new Ingredient('Lettuce', 1),
        new Ingredient('Parmesan cheese', 1),
        new Ingredient('Croutons', 1),
        new Ingredient('Olive oil', 1),
        new Ingredient('Garlic', 3)
      ]      
    )
  ];    

  constructor (private slService: ShoppingListService) { }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    //The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end
    //If its empty, that means it will return the entire array    
    return this.recipes.slice(); 
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
