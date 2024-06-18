import { generateVectorFromPreferences, generateVectorFromRecipe, generateUniqueIngredients } from './vectorUtils';
import { cosineSimilarity } from './utils';

export function recommendRecipes(userPreferences, recipes) {
  const uniqueIngredients = generateUniqueIngredients(recipes, userPreferences.ingredients);
  const allCategories = Array.from(new Set(recipes.flatMap(recipe => recipe.categories)));

  const userVector = generateVectorFromPreferences(userPreferences, uniqueIngredients, allCategories);
  console.log("사용자 벡터:", userVector);

  const recipeVectors = recipes.map(recipe => ({
    ...recipe,
    vector: generateVectorFromRecipe(recipe, uniqueIngredients, allCategories)
  }));

  recipeVectors.forEach(recipe => {
    const similarity = cosineSimilarity(userVector, recipe.vector);
    recipe.similarity = similarity;
    console.log(`레시피: ${recipe.name}, 유사도: ${similarity}`);
  });

  // 유사도에 따라 레시피 배열을 정렬
  recipeVectors.sort((a, b) => b.similarity - a.similarity);
  console.log("정렬된 레시피 벡터:", recipeVectors);

  // 채식주의자 옵션을 고려하여 고기를 포함하지 않는 레시피만 반환
  const filteredRecipes = recipeVectors
    .filter(recipe => !userPreferences.vegan || !recipe.meat) // 채식주의자 옵션을 고려한 필터링
    .filter(recipe => userPreferences.ingredients.every(ingredient => recipe.ingredients.includes(ingredient))) // 사용자가 입력한 재료가 포함된 레시피만 반환
    .map(({ vector, ...rest }) => rest);
  console.log("필터링된 레시피:", filteredRecipes);

  // 정렬된 레시피 배열 반환
  return filteredRecipes;
}