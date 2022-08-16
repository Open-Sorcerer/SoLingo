import { TagGroup, Tag, Input, IconButton } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { useState } from "react";
const Tags = () => {
  const [tags, setTags] = useState(["Solana", "Web3", "NextJS", "Tailwind"]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const removeTag = (tag: string) => {
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const addTag = () => {
    const nextTags = inputValue ? [...tags, inputValue] : tags;
    setTags(nextTags);
    setTyping(false);
    setInputValue("");
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <div className="rounded-xl px-2 py-1 border-2 cursor-pointer border-white/20 rounded-xl bg-black/40 flex flex-row justify-start items-center">
          <div>#</div>
          <Input
            className="tag-input bg-transparent"
            size="xs"
            style={{ width: 70 }}
            value={inputValue}
            onChange={setInputValue}
            onBlur={addTag}
            onPressEnter={addTag}
          />
        </div>
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={handleButtonClick}
        icon={<PlusIcon />}
        appearance="ghost"
        size="xs"
      />
    );
  };
  return (
    <TagGroup className="w-full flex flex-row gap-5 text-cyan-500 text-lg p-5">
      {tags.map((item, index) => (
        <Tag
          className="flex flex-row gap-2 bg-black rounded-xl px-2 py-1 border-2 cursor-pointer border-white/20 rounded-xl bg-black/40"
          key={index}
          closable
          onClose={() => removeTag(item)}
        >
          #{item}
        </Tag>
      ))}
      {renderInput()}
    </TagGroup>
  );
};

export default Tags;
