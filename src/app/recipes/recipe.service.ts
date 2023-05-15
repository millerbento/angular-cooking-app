import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable() //Need that to inject a service into a service
export class RecipeService {
  //Recipes array example here
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Parmigiana',
  //     'Breaded chicken cutlets topped with tomato sauce and melted mozzarella cheese, often served with pasta on the side. A popular Italian-American dish.',
  //     'https://assets.bonappetit.com/photos/5caf479af8ce278519b2a1b2/16:9/w_4800,h_2700,c_limit/chicken-parmesan.jpg',
  //     [
  //       new Ingredient('Chicken', 1),
  //       new Ingredient('Cheese', 3),
  //       new Ingredient('Tomato Sauce', 1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Pork Bites',
  //     'Pork bites are small pieces of seasoned pork, usually marinated and then grilled or pan-fried until crispy on the outside and tender on the inside. They can be served as a snack, appetizer, or main course and are often accompanied by a dipping sauce.',
  //     'https://img.taste.com.au/7D5MxM1J/w1200-h630-cfill/taste/2017/11/sticky-pork-belly-bites-taste_1980x1320-132894-1.jpg',
  //     [
  //       new Ingredient('Pork', 1),
  //       new Ingredient('Sauce', 1)
  //     ]      
  //   )
  // ];    

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor (private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); //Emitting a copy of the recipes array
  }

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

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe (index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
