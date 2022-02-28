import * as React from "react";
import { FunctionComponent } from "react";
import PublicLayout from "../../core/components/PublicLayout";
import { Box, Button, Grid, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { useGetUsers } from "../../core/hooks/useGetUsers";
import Filters from "./Filters";

const UserList: FunctionComponent = () => {
  const users = useGetUsers({
    perPage: 8,
    initialFilters: null,
    initialPage: 1,
  });
  console.log(users);
  return (
    <PublicLayout maxWidth={"lg"}>
      <Grid container sx={{ mb: 1, display: "flex", flexDirection: "row-reverse" }}>
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", alignItems: "center", flexDirection: "row-reverse" }}>
          <Link to={"/user/add"}>
            <Button>Add new user</Button>
          </Link>
        </Grid>
        <Filters setRoles={users.setSelectedRoles} setSearch={users.setEmailSearch} />
      </Grid>
      <Grid container spacing={2}>
        {users.list?.map((user) => (
          <Grid item key={user.id} xs={12} lg={3} md={4} sm={12}>
            <Link to={`/user/${user.id}`}>
              <UserCard userData={user} />
            </Link>
          </Grid>
        ))}
        {users.list?.length === 0 && (
          <Box sx={{ width: "100%", fontSize: "1.5rem", my: 7, display: "flex", justifyContent: "center" }}>
            No User Found
          </Box>
        )}
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
