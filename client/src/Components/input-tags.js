import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "./ComponentStyling/tags-input.css";

const OrganizationTagsInput = ({ tags, setTags }) => {
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  return (
    <div>
      <TagsInput
        value={tags}
        onChange={handleTagsChange}
        placeholder="Add tags"
      />
    </div>
  );
};

export default OrganizationTagsInput;