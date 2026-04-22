import { Box, Typography, Stack, IconButton, TextField, Popover } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import React, { useState } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";

export default function Comments({ id, onAddComment }) {
  const [comment, setComment] = useState("");
  const [emojiAnchor, setEmojiAnchor] = useState(null);

  function addComment() {
    if (!comment.trim()) return;

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTdkMmZmNDFjMTdjMmE0MjE3MjUzZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY4MDA1MzN9.gkCdpPqyWrcaYpqxLaNP3qxikMgg3o5izI18gCGOm9A";

    axios
      .post(
        "http://localhost:5000/api/comments",
        {
          post: id,
          text: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (onAddComment) onAddComment(res.data.comment);
        setComment("");
      })
      .catch((err) => console.log(err.response?.data?.message));
  }

  const onEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, position: "relative" }}>

      <Typography
        sx={{
          fontWeight: 700,
          mb: 1,
          fontSize: { xs: "13px", sm: "16px" },
        }}
      >
        Add Comment
      </Typography>

      {/* 🔥 FIX: منع النزول تحت */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          flexWrap: "nowrap", // 👈 مهم جدًا
        }}
      >

        {/* 💬 input */}
        <TextField
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2a2a2a",
              color: "white",
              borderRadius: "10px",

              fontSize: { xs: "12px", sm: "14px" },

              // 💚 لون الحدود الطبيعي
              "& fieldset": {
                borderColor: "rgb(5,89,90)",
              },

              // 💚 عند التفعيل (بدل الأزرق)
              "&:hover fieldset": {
                borderColor: "rgb(5,89,90)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(5,89,90)",
              },
            },

            "& input": {
              padding: { xs: "8px", sm: "10px" },
            },
          }}
        />

        {/* 😊 emoji */}
        <IconButton
          onClick={(e) => setEmojiAnchor(e.currentTarget)}
          sx={{
            color: "rgb(5,89,90)",
            p: { xs: 0.5, sm: 1 },
          }}
        >
          <EmojiEmotionsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>

        {/* 🚀 send */}
        <IconButton
          onClick={addComment}
          sx={{
            background: "rgb(5,89,90)",
            "&:hover": { background: "rgb(3,120,121)" },
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            flexShrink: 0, // 👈 يمنع النزول
          }}
        >
          <SendIcon sx={{ color: "white", fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>

      </Stack>

      {/* 😊 Emoji picker */}
      <Popover
        open={Boolean(emojiAnchor)}
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>

    </Box>
  );
}