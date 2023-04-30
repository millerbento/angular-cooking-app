import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }  

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
    ) { }

    ngOnInit() {
      this.route.params.
        //I don't need clean up the subscription here because 'params' is managed by Angular
        //That won't be the case if I create my own observables
        subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != undefined;
            this.initForm();
            //console.log(this.editMode);
          }
        );
    }

    onSubmit() {
      //Because it has the same structure as the recipe model, I can pass this.recipeForm.value directly
      // const newRecipe = new Recipe(
      //   this.recipeForm.value['name'], 
      //   this.recipeForm.value['description'], 
      //   this.recipeForm.value['imagePath'], 
      //   this.recipeForm.value['ingredients']);

      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
    }

    onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, 
            [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        })
      );
    }    

    onDeleteIngredient(index: number) {

    }

    //Using reactive forms approach here
    private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);


      if (this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        //Check if recipe has ingredients, if so loop through them and push them to the form
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount,
                  [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
              })
            );
          }
        }
      }

      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      });
    } 
}
