import { Allergy } from "../../types";
import TagInput from "../TagInput";
import AllergiesDropDown from "./AllergyDropdown";

const AllergyInput = ({
  allergies,
  addAllergy,
  removeAllergy,
}: {
  allergies: Allergy[];
  addAllergy: (allergy: Allergy) => void;
  removeAllergy: (allergy: Allergy) => void;
}) => {
  return (
    <div>
      <label
        htmlFor="allergies"
        className="cursor-pointer pb-3 text-neutral-700"
      >
        Please add your allergies :
      </label>
      <div className="shadow-neutral-300 shadow-sm mt-3">
        <AllergiesDropDown addAllergy={addAllergy} />
        {allergies.length > 0 && (
          <>
            <hr className=" bg-stone-100 h-[2px]" /> {/* @ts-ignore */}
            <TagInput tags={allergies} removeTag={removeAllergy} />
          </>
        )}
      </div>
    </div>
  );
};

export default AllergyInput;
