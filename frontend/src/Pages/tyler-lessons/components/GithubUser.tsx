import React, { useState, useEffect } from "react";

/**
 * @description get github profile Info
 * @param {string} userName
 * @returns {Promise<unknown>}
 */
async function getGithubProfile(userName: string): Promise<{ [key: string]: unknown }> {
  return (await fetch(`https://api.github.com/users/${userName}`)).json();
}

export default ({ userName }: { userName: string }): JSX.Element => {
  const [profile, setProfile] = useState<{ [key: string]: unknown }>();
  useEffect(() => {
    console.log("I work after dom is re-rendered");
    getGithubProfile(userName).then(setProfile);

    return (): void => { setProfile(undefined); };
  }, [userName]);

  if (!profile) return <span>loading...</span>;
  return (
    <pre>
      {JSON.stringify(profile, null, 2)}
    </pre>
  );
};
