import {FunctionComponent} from "react";
import {Avatar, Box, Typography} from "@mui/material";

const UserCard: FunctionComponent = () => {
    const description = 'Description Description Description Description Description Description Description\n' +
        'Description\n'

    return (
        <Box sx={{
            background: "linear-gradient(45deg, rgba(149,58,89,1) 41%, rgba(219,121,136,1) 100%)",
            borderRadius: 15,
            minHeight: 430,
            boxShadow: '0px 13px 20px 0px rgb(0 0 0 / 10%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Box sx={{
                minHeight: 180, display: "flex", justifyContent: 'center', alignItems: 'center'
            }}>
                <Avatar
                    alt="Remy Sharp"
                    src="https://i.pravatar.cc/100"
                    sx={{width: 110, height: 110, boxShadow: '0px 3px 8px 3px rgb(0 0 0 / 25%)'}}

                />
            </Box>
            <Box sx={{
                borderRadius: 10,
                minHeight: "150px",
                py: 6,
                background: 'white',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Typography variant={'h6'}>
                    Milad Mohamadi
                </Typography>
                <Typography variant={'subtitle2'}>
                    Admin
                </Typography>
                <Typography variant={'body2'} sx={{
                    mt: 3,
                    maxHeight: "4em",
                    overflow: 'hidden'
                }}>
                    {description}
                </Typography>
                {description.length > 100 && '...'}
            </Box>
        </Box>
    )
}
export default UserCard
