import React from "react";
import "./components.css";

const GetRepos = (props) => {
  const { repos } = props;

  const repoList =
    repos.length !== 0 ? (
      repos.data.map((item) => (
        <tbody>
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.created_at}</td>
            <td>{item.pushed_at}</td>
          </tr>
        </tbody>
      ))
    ) : (
      <tbody>
        <tr>
          <td>No Public Repos</td>
        </tr>
      </tbody>
    );
  return (
    <>
      <br />
      <h2>Repository List</h2>
      <div className="table">
        <table className="t1">
          <thead>
            <tr>
              <th>Public Repository List</th>
              <th>Created on</th>
              <th>Pushed on </th>
            </tr>
          </thead>
          {repoList}
        </table>
      </div>
    </>
  );
};

export default GetRepos;
