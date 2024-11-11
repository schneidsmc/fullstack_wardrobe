import React, { useState } from "react";

const BackgroundRemovalToggle = () => {
  const [isBackgroundRemovalEnabled, setBackgroundRemovalEnabled] =
    useState(false);

  const toggleBackgroundRemoval = () => {
    setBackgroundRemovalEnabled(!isBackgroundRemovalEnabled);
  };

  return (
    <div>
      <label>
        Enable Background Removal:
        <input
          type="checkbox"
          checked={isBackgroundRemovalEnabled}
          onChange={toggleBackgroundRemoval}
        />
      </label>
    </div>
  );
};

export default BackgroundRemovalToggle;
