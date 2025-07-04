export interface RecipeResponse {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
}

export interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard"; // You can extend this if needed
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[]; // e.g., ["Lunch", "Dinner"]
}
