import { FunctionComponent } from "react";
import PublicLayout from "../../core/components/PublicLayout";
import { Button, Grid, Pagination, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import * as React from "react";
import { useGetUsers } from "../../core/hooks/useGetUsers";
import MultiSelect from "./MultiSelect";

const UserList: FunctionComponent = () => {
  const users = useGetUsers({
    perPage: 8,
    initialFilters: null,
    initialPage: 1,
  });
  console.log(users);
  return (
    <PublicLayout maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ py: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography variant={"subtitle1"}>Filters: </Typography>
          <TextField
            variant={"outlined"}
            label={"Email (starts with)"}
            sx={{ mx: 1 }}
            placeholder={"milad@gmail.com"}
          />
          <MultiSelect />
        </Grid>
        <Grid item xs={6} sx={{ py: 2, display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
          <Link to={"/user/add"}>
            <Button>Add new user</Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {users.list?.map((user) => (
          <Grid key={user.id} item xs={3} lg={3} md={4} sm={12}>
            <Link to={`/user/${user.id}`}>
              <UserCard userData={user} />
            </Link>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            variant="outlined"
            color="secondary"
            count={users.totalPage ?? 0}
            onChange={(e, page) => users.setPage(page)}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </PublicLayout>
  );
};
export default UserList;
