import React from "react";
import TableHeaders from "./TableHeaders";
import "./components.css";

const GetCollabs = (props) => {
  const { collabs } = props;
  return (
    <>
      <br />
      <h2>Collaborators List</h2>
      <div className="table">
      <table className="t1">
        <TableHeaders />
        <tbody>
          {collabs.map((collab) => {
            return collab.data.map(
              (item) =>
                item.login && (
                  <>
                    <tr>
                      <td key={item.id}>{collab.repository}</td>

                      <td>{item.login}</td>

                      <td>{item.permissions.admin ? "Yes" : "No"}</td>

                      <td>{item.permissions.maintain ? "Yes" : "No"}</td>

                      <td>{item.permissions.push ? "Yes" : "No"}</td>

                      <td>{item.permissions.triage ? "Yes" : "No"}</td>

                      <td>{item.permissions.pull ? "Yes" : "No"}</td>
                    </tr>
                  </>
                )
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default GetCollabs;
