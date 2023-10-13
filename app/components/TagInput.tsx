const TagInput = ({
  tags,
  removeTag,
}: {
  tags: string[];
  removeTag: (tag: string) => void;
}) => {
  return (
    <div className="bg-neutral-100 w-[30rem] max-w-full min-h-[5rem] h-fit rounded-b-md p-3 flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <TagBubble key={tag} name={tag} removeTag={removeTag} />
      ))}
    </div>
  );
};

const TagBubble = ({
  name,
  removeTag,
}: {
  name: string;
  removeTag: (tag: string) => void;
}) => {
  return (
    <div className="rounded-full bg-stone-600 opacity-90 text-white text-sm max-w-fit py-2 px-3 flex gap-2 h-fit">
      <p>{name}</p>
      <button
        onClick={() => {
          removeTag(name);
        }}
      >
        x
      </button>
    </div>
  );
};

export default TagInput;
