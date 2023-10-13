import TagInput from "../TagInput";
import IngredientDropdown from "./IngredientDropdown";

const IngredientInput = ({
  ingredients,
  addIngredient,
  removeIngredient,
}: {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
}) => {
  return (
    <div>
      <label
        htmlFor="ingredient"
        className="cursor-pointer pb-3 text-neutral-700"
      >
        Please add ingredients that you have :
      </label>
      <div className="shadow-neutral-300 shadow-sm mt-3">
        <IngredientDropdown addIngredient={addIngredient} />
        {ingredients.length > 0 && (
          <>
            <hr className=" bg-stone-100 h-[2px]" />
            <TagInput tags={ingredients} removeTag={removeIngredient} />
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
