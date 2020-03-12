import React, { useState, useEffect } from "react";

export default (): JSX.Element => {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    document.title = `${240 - status.length} characters left`;
    // useEffect depends on status
  }, [status]);
  return (
    <div>
      <textarea name="" id="" cols={30} rows={10} value={status} onChange={(e): void => { setStatus(e.target.value); }} />
      <br />
      <button type="button" disabled={status.length === 0 || status.length > 240}>submit</button>
    </div>
  );
};

/*
  Instructions:
    Assume you're creating an app that allows the user to
    post status updates (ala Twitter). Your UI should have a
    textarea and a button. The button should be disabled if the
    length of the textarea is 0 or greater than 240 characters.
    The document's title should inform the user on how many
    characters they have left to type before they hit the 240
    character limit - "115 characters left."
*/
