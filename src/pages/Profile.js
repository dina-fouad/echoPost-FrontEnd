import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  Typography,
  Avatar,
  Stack,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Popover,
} from "@mui/material";

import EmojiPicker from "emoji-picker-react";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import LatestPosts from "../Components/LatestPosts";

// ================= TIME =================
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1)
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
  }
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const [password, setPassword] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openImage, setOpenImage] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzcyMDc5Mjd9.6QWtCLCYX48R5HlV18dD7sd6fLUsp7DzpGedxmObKDg";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setUserName(res.data.userName);
        setBio(res.data.bio);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async () => {
    const body = {
      userName,
      bio,
    };

    if (password.trim() !== "") {
      body.password = password;
    }

    const res = await axios.put(
      `http://localhost:5000/api/users/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ FIX: preserve posts
    setUser((prev) => ({
      ...res.data.user,
      posts: prev.posts,
    }));

    setEditMode(false);
    setPassword("");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      "http://localhost:5000/api/users/profile/profileImg",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUser((prev) => ({
      ...prev,
      profileImage: res.data.profileImage,
    }));
  };

  const handleDeleteAccount = async () => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEmojiClick = (emojiData) => {
    setBio((prev) => prev + emojiData.emoji);
  };

  if (!user)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  const hasPosts = user?.posts && user.posts.length > 0;

  return (
    <Box sx={{ maxWidth: 900, width: "95%", mx: "auto", color: "white", mt: 4 }}>
      <Card sx={{ backgroundColor: "#1d1d1d", borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ height: 160, background: "linear-gradient(135deg, #038889, #0b2b2c)" }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            px: { xs: 2, sm: 3 },
            pb: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ position: "relative", mt: -6 }}>
            <Avatar
              onClick={() => setOpenImage(true)}
              src={user.profileImage?.url}
              sx={{
                width: { xs: 90, sm: 120 },
                height: { xs: 90, sm: 120 },
                border: "4px solid #1d1d1d",
                cursor: "pointer",
              }}
            />

            <label htmlFor="img">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: "#038889",
                  width: { xs: 24, sm: 28 },
                  height: { xs: 24, sm: 28 },
                }}
              >
                <PhotoCameraIcon sx={{ color: "white", fontSize: { xs: 14, sm: 16 } }} />
              </IconButton>
            </label>

            <input type="file" hidden id="img" onChange={handleImage} />
          </Box>

          <Box sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {!editMode ? (
                <Typography fontWeight={700} sx={{ fontSize: { xs: 16, sm: 22 } }}>
                  {user.userName}
                </Typography>
              ) : (
                <TextField
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  size="small"
                  fullWidth
                />
              )}

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {!editMode ? (
                  <IconButton
                    onClick={() => setEditMode(true)}
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                    }}
                  >
                    <EditIcon sx={{ color: "#038889", fontSize: { xs: 18, sm: 22 } }} />
                  </IconButton>
                ) : (
                  <Button
                    onClick={handleUpdate}
                    variant="outlined"
                    size="small"
                    startIcon={<SaveIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    sx={{
                      color: "#038889",
                      borderColor: "#038889",
                      textTransform: "none",
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    Update
                  </Button>
                )}

                <Button
                  onClick={() => setOpenDelete(true)}
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                  sx={{
                    color: "tomato",
                    borderColor: "tomato",
                    textTransform: "none",
                    mt: { xs: 1, sm: 0 },
                    fontSize: { xs: 12, sm: 14 },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>

            {!editMode ? (
              <Typography color="#aaa" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                {user.bio || "No bio yet"}
              </Typography>
            ) : (
              <Box>
                <TextField
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  size="small"
                  multiline
                  fullWidth
                />

                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                >
                  <EmojiEmotionsIcon sx={{ color: "#038889", fontSize: { xs: 18, sm: 22 } }} />
                </IconButton>

                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </Popover>

                <Typography sx={{ mt: 2, fontSize: { xs: 12, sm: 14 } }}>
                  New Password
                </Typography>

                <TextField
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
            )}

            <Typography sx={{ fontSize: { xs: 10, sm: 12 } }} color="#777">
              Joined {timeAgo(user.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Card>

      <Divider sx={{ my: 3, borderColor: "#333" }} />

      {hasPosts ? (
        <>
          <Typography fontWeight={700} mb={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
            {user.userName}'s Posts
          </Typography>

          <LatestPosts userId={id} showAll={false} />
        </>
      ) : (
        <Typography sx={{ textAlign: "center", color: "#777", fontSize: { xs: 12, sm: 14 } }}>
          No posts available yet
        </Typography>
      )}

      <Dialog open={openImage} onClose={() => setOpenImage(false)}>
        <img
          src={user.profileImage?.url}
          alt="profile"
          style={{ width: "100%", maxHeight: "80vh" }}
        />
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: { backgroundColor: "#1d1d1d", color: "white" },
        }}
      >
        <DialogTitle>Delete Account</DialogTitle>

        <DialogContent>
          <Typography color="#aaa">
            Are you sure you want to delete your account?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: "#aaa" }}>
            Cancel
          </Button>

          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}