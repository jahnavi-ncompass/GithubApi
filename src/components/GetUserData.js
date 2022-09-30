import React, { useState } from "react";
import { Octokit } from "octokit";
import GetCollabs from "./GetCollabs";
import GetRepos from "./GetRepos";

const GetUserData = () => {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleAccess = (e) => {
    setAccessToken(e.target.value);
  };

  const octokit = new Octokit({
    auth: accessToken,
  });

  const handleRepo = async () => {
    try {
      const result = await octokit.request(
        `{process.env.REACT_APP_APICALL}/users/${user}/repos`
      );
      setRepos(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCollab = async () => {
    const result = await handleRepo();
    try {
      const repoNames = result.data.map((data) => data.name);
      getCollaborator(repoNames);
    } catch (err) {
      console.log(err);
    }
  };

  const getCollaborator = async (repoNames) => {
    let response = [];
    for (let i = 0; i < repoNames.length; i++) {
      const result = await getCollabApi(user, repoNames[i]);
      response[i] = result;
    }
    setCollabs(response);
  };

  const getCollabApi = async (user, repo) => {
    const results = await octokit.request(
      `{process.env.REACT_APP_APICALL}/repos/${user}/${repo}/collaborators`
    );
    return {
      data: results.data.map((result) => {
        return { login: result.login, permissions: result.permissions };
      }),
      repository: repo,
    };
  };

  return (
    <>
      <h2>GitHub User Data</h2>
      UserName:
      <input type="text" value={user} onChange={handleChange} />
      <br />
      Access Token:
      <input type="password" value={accessToken} onChange={handleAccess} />
      <br />
      <button
        onClick={() => {
          handleClickCollab();
          setCollabs("");
          setRepos("");
        }}
      >
        Search
      </button>
      <br />
      <br />
      {collabs.length ? (
        <GetCollabs collabs={collabs} repos={repos} />
      ) : (
        "No Access to the Collaborators data"
      )}
      {<GetRepos repos={repos} />}
    </>
  );
};

export default GetUserData;
