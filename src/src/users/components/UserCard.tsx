import { FunctionComponent } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { IUser } from "../../core/hooks/useGetUsers";

const UserCard: FunctionComponent<{ userData: IUser }> = ({ userData }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, rgba(149,58,89,1) 41%, rgba(219,121,136,1) 100%)",
        borderRadius: 2,
        minHeight: 430,
        boxShadow: "0px 13px 20px 0px rgb(0 0 0 / 10%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          minHeight: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={userData.name ?? "No Name Yet"}
          src={userData.avatar}
          sx={{
            width: 110,
            height: 110,
            boxShadow: "0px 3px 5px 1px rgb(0 0 0 / 25%)",
            border: "1px solid #33333314",
            background: "#33333350",
          }}
        />
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          minHeight: "150px",
          py: 6,
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant={"h6"}>{userData.name ?? "No Name Yet"}</Typography>
        <Typography variant={"caption"}>{userData.role}</Typography>
        <Typography
          variant={"body2"}
          sx={{
            mt: 3,
            maxHeight: "4em",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {userData.bio ?? "No Bio Yet"}
        </Typography>
        {(userData?.bio?.length ?? 0) > 100 && "..."}
      </Box>
    </Box>
  );
};
export default UserCard;
