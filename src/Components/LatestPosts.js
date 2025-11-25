// Import React and required hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Divider,
  CircularProgress,   
} from "@mui/material";

import PostLikesSection from "../pages/PostLikesSection";

// Helper function to format date into "time ago" style
function timeAgo(date) {
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

export default function LatestPosts({ showAll = false }) {
  // All posts from backend
  const [allPosts, setAllPosts] = useState([]);
  // Posts visible on screen
  const [visiblePosts, setVisiblePosts] = useState([]);

  const postsPerPage = 2;

  // Fetch ALL posts once
  const loadAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      const posts = res.data.post || [];

      setAllPosts(posts);

      if (!showAll) {
        setVisiblePosts(posts.slice(0, 3));
      } else {
        setVisiblePosts(posts.slice(0, postsPerPage));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAllPosts();
  }, [showAll]);

  // Load next 3 posts
  const fetchMore = () => {
    setVisiblePosts(allPosts.slice(0, visiblePosts.length + postsPerPage));
  };

  // HOME → NO infinite scroll
  if (!showAll) {
    return (
      <Box sx={{ padding: { xs: "6px", sm: "12px" } }}>
        {visiblePosts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </Box>
    );
  }

  // POSTS PAGE → Infinite scroll
  return (
    <InfiniteScroll
      dataLength={visiblePosts.length}
      next={fetchMore}
      hasMore={visiblePosts.length < allPosts.length}
      
      loader={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <CircularProgress size={32} sx={{ color: "#038889" }} />
        </Box>
      }

      endMessage={
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "10px" }}>
          No more posts
        </p>
      }
      style={{ overflow: "hidden" }}
    >
      <Box sx={{ padding: { xs: "6px", sm: "12px" } }}>
        {visiblePosts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </Box>
    </InfiniteScroll>
  );
}

// Component that renders a single post card
function CardPost({ post }) {
  return (
    <Card
      key={post._id}
      sx={{
        backgroundColor: "#1d1d1d",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.28)",
        mb: 4,
        overflow: "hidden",
        color: "white",
        transition: "0.25s",
        "&:hover": { transform: "scale(1.012)" },
      }}
    >
      {/* IMAGE */}
      {post.postImg?.url && (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <img
            src={post.postImg.url}
            alt="post"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          padding: { xs: "12px 14px", sm: "14px 18px" },
          pt: post.postImg?.url ? 2 : 3,
        }}
      >
        <Avatar
          src={post.user?.profileImage?.url || "/images/user.png"}
          sx={{ width: 44, height: 44 }}
        />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
            {post.user?.userName || "User"}
          </Typography>
          <Typography sx={{ fontSize: "11px", color: "#bbb" }}>
            {timeAgo(post.createdAt)}
          </Typography>
        </Box>
      </Stack>

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography
          sx={{
            fontSize: "15px",
            color: "#e9e9e9",
            whiteSpace: "pre-line",
            mb: 1,
            lineHeight: 1.5,
          }}
        >
          {post.description}
        </Typography>
      </CardContent>

      <Box>
        <PostLikesSection post={post} />
      </Box>

      <Divider sx={{ borderColor: "#333", my: 1.1 }} />

      <Box sx={{ padding: { xs: "8px 14px", sm: "6px 18px" } }}>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#fff",
            fontSize: "15px",
          }}
        >
          Comments ({post.comments?.length || 0})
        </Typography>

        {post.comments?.map((c) => (
          <Stack
            key={c._id}
            direction="row"
            spacing={1.7}
            sx={{
              mb: 2.2,
              backgroundColor: "#2a2a2a",
              padding: "10px 12px",
              borderRadius: "10px",
            }}
          >
            <Avatar
              src={c.user.profileImage.url}
              sx={{ width: 36, height: 36 }}
            />

            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 0.4 }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "13px", color: "#fff" }}
                >
                  {c.user?.userName}
                </Typography>
                <Typography sx={{ color: "#999", fontSize: "11px", ml: 2 }}>
                  {timeAgo(c.createdAt)}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#ddd",
                  lineHeight: 1.45,
                  mb: 0.6,
                }}
              >
                {c.text}
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(90deg, rgb(5,89,90), rgb(3,120,121))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                }}
              >
                ❤️ {c.likesComment?.length || 0} Likes
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Card>
  );
}
