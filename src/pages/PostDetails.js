import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Divider,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import PostLikesSection from "./PostLikesSection";
import Comments from "./Comments";

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }
}

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const [openDelete, setOpenDelete] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const fileInputRef = React.useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data?.msg || err.message);
        setLoading(false);
      });
  }, [id]);

  const handlePostImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("postImg", file);

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4MDU0ODF9.5ya2oPDxNuVLShpWgssBtI_C3QxRl1Xhosp8lps9Rgc";

      const res = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setPost(res.data.post);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleEditClick = () => {
    setEditText(post.description);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4MDU0ODF9.5ya2oPDxNuVLShpWgssBtI_C3QxRl1Xhosp8lps9Rgc";

      const res = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { description: editText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPost(res.data.post);
      setIsEditing(false);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4MDU0ODF9.5ya2oPDxNuVLShpWgssBtI_C3QxRl1Xhosp8lps9Rgc";

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpenDelete(false);
      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", color: "white", mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  const handleDeleteComment = async (commentId) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTdkMmZmNDFjMTdjMmE0MjE3MjUzZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4ODM1NDV9.3kdFvlqWw-H4mywcGWGl8G9rHd1El2Eo_ehK58yRHwk";

    await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setComments((prev) => prev.filter((c) => c._id !== commentId));
  } catch (err) {
    console.log(err);
  }
};

const handleSaveComment = async (commentId) => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTdkMmZmNDFjMTdjMmE0MjE3MjUzZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4ODM1NDV9.3kdFvlqWw-H4mywcGWGl8G9rHd1El2Eo_ehK58yRHwk";

    const res = await axios.put(
      `http://localhost:5000/api/comments/${commentId}`,
      { text: editCommentText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? res.data.comment : c
      )
    );

    setEditingCommentId(null);
  } catch (err) {
    console.log(err);
  }
};

const handleLikeUpdate = (updatedPost) => {
  setPost(updatedPost);
};

  return (
    <Card
      sx={{
        backgroundColor: "#1d1d1d",
        borderRadius: { xs: "8px", sm: "10px" },
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
        mb: 3,
        overflow: "hidden",
        color: "white",
        maxWidth: { xs: "97%", sm: 600 },
        mx: "auto",
      }}
    >
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handlePostImageUpload}
      />

      {post.postImg?.url && (
        <Box sx={{ width: "100%", position: "relative" }}>
          <img
            src={post.postImg.url}
            alt="post"
            style={{ width: "100%", objectFit: "cover" }}
          />

          <IconButton
            onClick={() => fileInputRef.current.click()}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(5,89,90,0.8)",
              color: "white",
            }}
          >
            <PhotoCameraIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ padding: { xs: "8px 10px", sm: "12px 16px" } }}
      >
        <Stack direction="row" spacing={1.5}>
          <Avatar src={post.user?.profileImage?.url} />
          <Box>
            <Typography fontWeight={700}>{post.user?.userName}</Typography>
            <Typography sx={{ fontSize: 11, color: "#bbb" }}>
              {timeAgo(post.createdAt)}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row">
          <IconButton onClick={handleEditClick} sx={{ color: "rgb(5,89,90)" }}>
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => setOpenDelete(true)}
            sx={{ color: "#ff3b3b" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <CardContent sx={{ pt: 0 }}>
        {!isEditing ? (
          <Typography sx={{ color: "#e9e9e9" }}>{post.description}</Typography>
        ) : (
          <Box>
            <TextField
              fullWidth
              multiline
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                },
              }}
            />

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                onClick={handleSaveEdit}
                sx={{
                  backgroundColor: "rgb(5,89,90)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Save
              </Button>

              <Button
                onClick={() => setIsEditing(false)}
                sx={{
                  color: "#bbb",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        )}
      </CardContent>

      <PostLikesSection post={post} onLike={handleLikeUpdate} />

      <Divider sx={{ borderColor: "#333", my: 1 }} />

      <Comments
        id={id}
        onAddComment={(newComment) =>
          setComments((prev) => [newComment, ...prev])
        }
      />

      <Divider sx={{ borderColor: "#333", my: 1 }} />

      <Box sx={{ padding: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Comments ({comments.length})
        </Typography>

        {comments.map((c) => {
          const isEditing = editingCommentId === c._id;

          return (
            <Stack
              key={c._id}
              direction="row"
              spacing={2}
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#2a2a2a",
              }}
            >
              <Avatar src={c.user?.profileImage?.url} />

              <Box sx={{ flex: 1 }}>
                {/* HEADER */}
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={700}>{c.user?.userName}</Typography>

                  {/* actions */}
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      onClick={() => {
                        setEditingCommentId(c._id);
                        setEditCommentText(c.text);
                      }}
                      sx={{ color: "rgb(5,89,90)" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDeleteComment(c._id)}
                      sx={{ color: "#ff3b3b" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* TEXT / EDIT MODE */}
                {!isEditing ? (
                  <Typography sx={{ color: "#ddd", mt: 0.5 }}>
                    {c.text}
                  </Typography>
                ) : (
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          backgroundColor: "#1f1f1f",
                        },
                      }}
                    />

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleSaveComment(c._id)}
                        sx={{
                          backgroundColor: "rgb(5,89,90)",
                          textTransform: "none",
                        }}
                      >
                        Save
                      </Button>

                      <Button
                        size="small"
                        onClick={() => setEditingCommentId(null)}
                        sx={{ color: "#bbb", textTransform: "none" }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                )}

                {/* FOOTER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1 }}
                >
                  {/* TIME */}
                  <Typography sx={{ fontSize: 11, color: "#999" }}>
                    {timeAgo(c.createdAt)}
                  </Typography>

                  {/* LIKES */}
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      background:
                        "linear-gradient(90deg, rgb(5,89,90), rgb(3,120,121))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    ❤️ {c.likes?.length || 0}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          );
        })}
      </Box>

      {/* DARK DELETE DIALOG */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1d1d1d",
            color: "white",
            borderRadius: 3,
            padding: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Post</DialogTitle>

        <DialogContent sx={{ color: "#bbb" }}>
          Are you sure you want to delete this post?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{ color: "#bbb", textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeletePost}
            variant="contained"
            sx={{
              backgroundColor: "#ff3b3b",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#d92c2c",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
