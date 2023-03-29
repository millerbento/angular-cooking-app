import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  //We get these values from recipe-list.component.html via data binding
  @Input() recipeExposed: Recipe;
  @Input() index: number;

  ngOnInit() {
  }
}
