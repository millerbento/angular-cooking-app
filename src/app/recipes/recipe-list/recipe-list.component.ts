import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Chicken Parmigiana',
      'Breaded chicken cutlets topped with tomato sauce and melted mozzarella cheese, often served with pasta on the side. A popular Italian-American dish.',
      'https://assets.bonappetit.com/photos/5caf479af8ce278519b2a1b2/16:9/w_4800,h_2700,c_limit/chicken-parmesan.jpg'
    ),
    new Recipe(
      'Pork Bites',
      'Pork bites are small pieces of seasoned pork, usually marinated and then grilled or pan-fried until crispy on the outside and tender on the inside. They can be served as a snack, appetizer, or main course and are often accompanied by a dipping sauce.',
      'https://img.taste.com.au/7D5MxM1J/w1200-h630-cfill/taste/2017/11/sticky-pork-belly-bites-taste_1980x1320-132894-1.jpg'
    ),
    new Recipe(
      'Caesar Salad',
      'Caesar Salad is a classic dish made with romaine lettuce, Parmesan cheese, croutons, and a dressing of olive oil, lemon juice, garlic, and anchovies. It is a popular side dish or light meal often topped with grilled chicken, shrimp or salmon.',
      'https://images.getrecipekit.com/20220119052510-caesarsalad_img_9360.jpeg?class=16x9'
    )
  ];  

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
