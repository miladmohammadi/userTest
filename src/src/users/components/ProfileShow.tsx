import { FunctionComponent } from "react";
import { IUser } from "../../core/hooks/useGetUsers";
import { FacebookOutlined, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import * as React from "react";

const ProfileShow: FunctionComponent<{ profileData?: IUser | null }> = ({ profileData }) => {
  const fields = [
    { key: "email", xs: 5 },
    { key: "name", xs: 5 },
    { key: "role", xs: 2 },
    { key: "facebook", xs: 3, icon: <FacebookOutlined fontSize={"large"} /> },
    { key: "instagram", xs: 3, icon: <Instagram fontSize={"large"} /> },
    { key: "linkedin", xs: 3, icon: <LinkedIn fontSize={"large"} /> },
    { key: "twitter", xs: 3, icon: <Twitter fontSize={"large"} /> },
    { key: "bio", xs: 12 },
  ];
  return (
    <Card elevation={0} sx={{ px: 2, my: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Avatar
            variant={"rounded"}
            sx={{
              width: "100%",
              height: "fit-content",
              my: 2,
              border: "1px solid #33333314",
              background: "#33333309",
            }}
            src={profileData?.avatar}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {fields.map((text) => (
              <Grid
                key={text.key}
                item
                xs={text.icon ? 6 : 12}
                md={text.icon || text.key === "role" ? 3 : text.key === "bio" ? 9 : 6}
              >
                <Box
                  sx={{
                    backgroundColor: "#33333309",
                    minHeight: "5rem",
                    p: 2,
                    borderRadius: 1,
                    height: "100%",
                  }}
                >
                  {text.icon ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 3,
                      }}
                    >
                      <a target={"_blank"} href={profileData?.[text.key as keyof typeof profileData]}>
                        {text.icon}
                      </a>
                    </Box>
                  ) : (
                    <>
                      <Typography variant={"caption"} textTransform={"uppercase"} color={"darkgray"}>
                        {text.key}
                      </Typography>
                      <Typography>{profileData?.[text.key as keyof typeof profileData]}</Typography>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default ProfileShow;
