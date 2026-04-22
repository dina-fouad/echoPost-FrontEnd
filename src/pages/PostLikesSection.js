import React from "react";
import axios from "axios";
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
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PostLikesSection({ post, onLike }) {
  const [openLikesPopup, setOpenLikesPopup] = React.useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4ODQ0NTZ9.XGhjOxJqJxgrGBInenp0KbaUi40hYrGT-vECdo_cF1c";

  const userId = localStorage.getItem("userId");

  // ✅ FIX: check by _id
  const isLiked = post?.likes?.some((u) => u._id === userId);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/like/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onLike) onLike(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openPopup = () => {
    if (post.likes?.length > 0) {
      setOpenLikesPopup(true);
    }
  };

  return (
    <>
      {/* ================= LIKE SECTION ================= */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.2}
        sx={{
          paddingLeft: { xs: "10px", sm: "18px" },
          mt: 0.5,
          mb: 0.5,
        }}
      >
        {/* ❤️ LIKE BUTTON */}
        <IconButton onClick={handleLike} sx={{ p: 0.2 }}>
          {isLiked ? (
            <FavoriteIcon
              sx={{
                color: "#22c55e", // أخضر كامل
                fontSize: 25,
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: "#9ca3af",
                fontSize: 25,
              }}
            />
          )}
        </IconButton>

        {/* ================= AVATARS ================= */}
        <Stack direction="row" alignItems="center" sx={{ ml: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {post.likes?.slice(0, 3).map((likeUser, index) => (
              <Avatar
                key={likeUser._id || index}
                onClick={openPopup}
                src={likeUser.profileImage?.url || "/images/user.png"}
                sx={{
                  width: 22,
                  height: 22,
                  border: "2px solid #1d1d1d",
                  marginLeft: index === 0 ? 0 : "-7px",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>

          {/* 🔢 COUNT (same color as usernames) */}
          {post.likes?.length > 0 && (
            <Typography
              onClick={openPopup}
              sx={{
                fontSize: 12,
                ml: 0.6,
                fontWeight: 500,
                cursor: "pointer",
                color: "#e5e7eb", // نفس لون الأسماء
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {post.likes.length} likes
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* ================= POPUP ================= */}
      <Dialog
        open={openLikesPopup}
        onClose={() => setOpenLikesPopup(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#121212",
            color: "white",
            borderRadius: "14px",
            minWidth: "320px",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid #2a2a2a",
            fontWeight: 700,
            color: "#e5e7eb",
          }}
        >
          Likes
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {post.likes?.map((user, i) => (
            <Stack
              key={user._id || i}
              direction="row"
              spacing={2}
              sx={{
                p: 1,
                borderRadius: 2,
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#1e1e1e",
                },
              }}
            >
              <Avatar
                src={user.profileImage?.url}
                sx={{ width: 36, height: 36 }}
              />

              <Typography sx={{ fontWeight: 500, color: "#e5e7eb" }}>
                {user.userName}
              </Typography>
            </Stack>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}