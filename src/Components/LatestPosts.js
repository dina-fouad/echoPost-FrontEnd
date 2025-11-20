import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

export default function LatestPosts() {
  const [expanded, setExpanded] = React.useState(false);
  const MAX_LENGTH = 120;

  const posts = [
    {
      id: 1,
      title: "How to learn React fast",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
      description:
        "A simple guide to mastering React in a short time. This includes hooks, components, and state management.",
      category: "Programming",
      createdAt: "2025-02-20",
      likes: 12,
      likedUsers: [
        "/images/user1.jpg",
        "/images/user2.jpg",
        "/images/user3.jpg",
      ],
      comments: [
        {
          id: 1,
          user: "Maya",
          avatar: "/images/user1.jpg",
          text: "This is really helpful!",
          createdAt: "2025-02-21",
        },
      ],
    },
  ];

  return (
    <Box sx={{ padding: { xs: "15px 0", sm: "30px 0" } }}>
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            backgroundColor: "#222",
            color: "white",
            borderRadius: "12px",
            mb: 3,
            paddingBottom: "10px",
            width: { xs: "100%", sm: "95%" },
            mx: "auto",
          }}
        >
          {/* Image */}
          <CardMedia
            component="img"
            image={post.image}
            alt="Post Image"
            sx={{
              height: { xs: 150, sm: 180, md: 250 },
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
            }}
          />

          <CardContent sx={{ padding: { xs: "10px", sm: "16px" } }}>
            {/* Title */}
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
                fontWeight: 600,
                mb: 1,
              }}
            >
              {post.title}
            </Typography>

            {/* Category */}
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "13px" },
                color: "#bbb",
                mb: 2,
              }}
            >
              {post.category} • {post.createdAt}
            </Typography>

            {/* Description */}
            <Typography
              sx={{ fontSize: { xs: "13px", sm: "15px" }, color: "#ddd", mb: 1 }}
            >
              {expanded
                ? post.description
                : post.description.length > MAX_LENGTH
                ? post.description.substring(0, MAX_LENGTH) + "..."
                : post.description}
            </Typography>

            {post.description.length > MAX_LENGTH && (
              <Typography
                onClick={() => setExpanded(!expanded)}
                sx={{
                  color: "#4da6ff",
                  textTransform: "none",
                  mb: 2,
                  p: 0,
                  fontSize: { xs: "12px", sm: "14px" },
                  cursor: "pointer",
                }}
              >
                {expanded ? "See Less" : "See More"}
              </Typography>
            )}

            {/* Likes */}
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <FavoriteIcon sx={{ color: "red", fontSize: { xs: 18, sm: 22 } }} />
              <Typography sx={{ fontSize: { xs: "13px", sm: "15px" } }}>
                {post.likes}
              </Typography>

              <Stack direction="row" spacing={-1}>
                {post.likedUsers.map((img, index) => (
                  <Avatar
                    key={index}
                    src={img}
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      border: "2px solid #222",
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Divider sx={{ backgroundColor: "#444", my: 2 }} />

            {/* Comments Title */}
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                mb: 2,
              }}
            >
              Comments ({post.comments.length})
            </Typography>

            {/* Comments List */}
            {post.comments.map((c) => (
              <Box
                key={c.id}
                sx={{
                  backgroundColor: "#1a1a1a",
                  padding: { xs: "8px", sm: "10px" },
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={c.avatar}
                    sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }}
                  />

                  <Box>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: { xs: "13px", sm: "15px" } }}
                    >
                      {c.user}
                    </Typography>

                    <Typography
                      sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "#ccc" }}
                    >
                      {c.text}
                    </Typography>

                    <Typography
                      sx={{ fontSize: { xs: "10px", sm: "12px" }, color: "#777" }}
                    >
                      {c.createdAt}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
