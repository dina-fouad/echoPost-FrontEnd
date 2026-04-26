// Import React and required hooks
import React, { useEffect, useState, useCallback } from "react";
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
import { Link } from "react-router-dom";

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

export default function LatestPosts({ showAll = false, userId = null }) {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  const postsPerPage = 2;

  const loadAllPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      const posts = res.data.post || [];

      // ================= FILTER ONLY IF userId EXISTS =================
      const filteredPosts = userId
        ? posts.filter((p) => p.user?._id === userId)
        : posts;

      setAllPosts(filteredPosts);

      // ================= KEEP YOUR ORIGINAL LOGIC =================
      if (!showAll) {
        setVisiblePosts(filteredPosts.slice(0, 3)); // 🔥 3 posts only (UNCHANGED)
      } else {
        setVisiblePosts(filteredPosts.slice(0, postsPerPage));
      }
    } catch (err) {
      console.log(err);
    }
  }, [showAll, userId, postsPerPage]);

  useEffect(() => {
    loadAllPosts();
  }, [loadAllPosts]);

  const fetchMore = () => {
    setVisiblePosts(allPosts.slice(0, visiblePosts.length + postsPerPage));
  };

  if (!showAll) {
    return (
      <Box sx={{ padding: { xs: "6px", sm: "12px" } }}>
        {visiblePosts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </Box>
    );
  }

  return (
    <InfiniteScroll
      dataLength={visiblePosts.length}
      next={fetchMore}
      hasMore={visiblePosts.length < allPosts.length}
      loader={
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress size={32} sx={{ color: "#038889" }} />
        </Box>
      }
      endMessage={
        <p style={{ textAlign: "center", color: "#aaa" }}>No more posts</p>
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

// ================= POST CARD =================
function CardPost({ post }) {
  const [showAllComments, setShowAllComments] = useState(false);

  const comments = post.comments || [];

  const visibleComments = showAllComments ? comments : comments.slice(-1);

  return (
    <Box
      component={Link}
      to={`/create/details/${post._id}`}
      sx={{ textDecoration: "none" }}
    >
      <Card
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
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        )}

        {/* USER */}
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Link
            to={`/profile/${post.user?._id}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar src={post.user?.profileImage?.url} />
          </Link>

          <Box>
            <Link
              to={`/profile/${post.user?._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography fontWeight={700}>{post.user?.userName}</Typography>
            </Link>

            <Typography fontSize={11} color="#bbb">
              {timeAgo(post.createdAt)}
            </Typography>
          </Box>
        </Stack>

        {/* DESCRIPTION */}
        <CardContent sx={{ pt: 0 }}>
          <Typography>{post.description}</Typography>
        </CardContent>

        <PostLikesSection post={post} />

        <Divider sx={{ borderColor: "#333", my: 1 }} />

        {/* COMMENTS */}
        <Box sx={{ padding: { xs: "8px 14px", sm: "6px 18px" } }}>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 1.2,
              color: "#fff",
              fontSize: "15px",
            }}
          >
            Comments ({comments.length})
          </Typography>

          {comments.length > 1 && !showAllComments && (
            <Typography
              onClick={(e) => {
                e.preventDefault();
                setShowAllComments(true);
              }}
              sx={{
                fontSize: "13px",
                color: "#999",
                cursor: "pointer",
                mb: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View previous comments
            </Typography>
          )}

          {visibleComments.map((c) => (
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
              <Link
                to={`/profile/${c.user?._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Avatar
                  src={c.user?.profileImage?.url}
                  sx={{ width: 36, height: 36 }}
                />
              </Link>
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.4 }}
                >
                  <Link
                    to={`/profile/${c.user?._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      sx={{ fontWeight: 700, fontSize: "13px", color: "#fff" }}
                    >
                      {c.user?.userName}
                    </Typography>
                  </Link>
                  <Typography sx={{ color: "#999", fontSize: "11px" }}>
                    {timeAgo(c.createdAt)}
                  </Typography>
                </Stack>

                <Typography sx={{ fontSize: "13px", color: "#ddd" }}>
                  {c.text}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#038889",
                  }}
                >
                  ❤️ {c.likesComment?.length || 0} Likes
                </Typography>
              </Box>
            </Stack>
          ))}

          {showAllComments && comments.length > 1 && (
            <Typography
              onClick={(e) => {
                e.preventDefault();
                setShowAllComments(false);
              }}
              sx={{
                fontSize: "13px",
                color: "#999",
                cursor: "pointer",
                mt: 0.5,
              }}
            >
              Hide comments
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
}
