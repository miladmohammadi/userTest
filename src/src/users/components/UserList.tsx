import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { FunctionComponent } from "react";

const UserList: FunctionComponent<any> = ({ role, page }) => {
  const users = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const friends = await db.users
        .where("role")
        .anyOf([...role])
        .toArray();

      // Return result
      return friends;
    },
    // specify vars that affect query:
    [role, page],
  );

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          {user.name}, {user.role}
        </li>
      ))}
    </ul>
  );
};
export default UserList;
