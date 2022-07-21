import React from "react";
import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { StatusIndicator } from "./StatusIndicator";

const LIFT_FIELDS = gql`
  fragment LiftDetails on Lift {
    id
    name
    status
  }
`;

const QUERY = gql`
  ${LIFT_FIELDS}
  query AllLifts {
    allLifts {
      ...LiftDetails
    }
  }
`;

const LIFT_STATUS_MUTATION = gql`
  mutation Mutation($setLiftStatusId: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $setLiftStatusId, status: $status) {
      id
      name
      status
    }
  }
`;

function App() {
  const { loading, data } = useQuery(QUERY, { pollInterval: 1000 });
  const [setLiftStatus] = useMutation(LIFT_STATUS_MUTATION);

  if (loading) return <p>loading lifts</p>;
  return (
    <section>
      <h1>Snowtooth Lift Status</h1>
      {data && !loading && (
        <table>
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Lift Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map((lift) => (
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>
                  {lift.status}
                  <StatusIndicator
                    status={lift.status}
                    onChange={(status) =>
                      setLiftStatus({
                        variables: {
                          setLiftStatusId: lift.id,
                          status
                        }
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
export default App;
