import React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PostLikesSection({ post }) {
  const [openLikesPopup, setOpenLikesPopup] = React.useState(false);

  return (
    <>
      {/* ================== ACTIONS (LIKE + PREVIEW) ================== */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.2}
        sx={{
          paddingLeft: { xs: "10px", sm: "18px" }, // Smaller padding on mobile
          mt: 0.5,
          mb: 0.5,
        }}
      >
        {/* Like button */}
        <IconButton sx={{ p: { xs: 0.1, sm: 0.1 } }}>
          <FavoriteBorderIcon
            sx={{
              color: "rgb(5 89 90)",
              fontSize: { xs: 20, sm: 23 }, // Smaller icon size on mobile
            }}
          />
        </IconButton>

        {/* ================== LIKES AVATARS PREVIEW ================== */}
        <Stack direction="row" alignItems="center" sx={{ ml: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Show the first 3 users who liked the post */}
            {post.likes.slice(0, 3).map((likeUser, index) => (
              <Avatar
                key={index}
                src={likeUser.profileImage?.url || "/images/user.png"}
                sx={{
                  width: { xs: 22, sm: 24 }, // Slightly smaller on mobile
                  height: { xs: 22, sm: 24 },
                  border: "2px solid #1d1d1d",
                  marginLeft: index === 0 ? 0 : "-7px", // Overlapping style
                }}
              />
            ))}
          </Box>

          {/* Show "+X" if there are more likes */}
          {post.likes.length > 3 && (
            <Typography
              onClick={() => setOpenLikesPopup(true)}
              sx={{
                fontSize: { xs: "11px", sm: "12px" },
                ml: 0.3,
                color: "#aaa",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              +{post.likes.length - 3}
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* ================== POPUP — FULL LIST OF LIKES ================== */}
      <Dialog
        open={openLikesPopup}
        onClose={() => setOpenLikesPopup(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            backgroundColor: "#1f1f1f",
            color: "white",
            borderRadius: "12px",

            // Smaller width on mobile
            width: { xs: "85%", sm: "100%" },
            margin: "auto",

            // Lower max height for smaller screens
            maxHeight: { xs: "65vh", sm: "75vh" },
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid #333",
            fontSize: { xs: "15px", sm: "16px" },
            padding: { xs: "10px 14px", sm: "14px 18px" },
          }}
        >
          People who liked this post
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            padding: 0,
            maxHeight: { xs: "55vh", sm: "60vh" }, // Scroll area fits well on mobile
          }}
        >
          {/* Render each user who liked the post */}
          {post.likes.map((user, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                padding: { xs: "8px 12px", sm: "10px 16px" },
                borderBottom: "1px solid #333",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#2a2a2a" },
              }}
            >
              <Avatar
                src={user.profileImage?.url || "/images/user.png"}
                sx={{ width: 36, height: 36 }}
              />

              <Typography
                sx={{
                  color: "#eee",
                  fontWeight: 500,
                  fontSize: { xs: "13px", sm: "14px" },
                }}
              >
                {user.userName}
              </Typography>
            </Stack>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
