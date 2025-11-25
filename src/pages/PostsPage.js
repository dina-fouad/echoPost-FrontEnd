import React from "react";
import { Box, Typography } from "@mui/material";
import LatestPosts from "../Components/LatestPosts";

export default function PostsPage() {
  return (
    <Box 
      sx={{ 
        width: "95%",
        maxWidth: "750px",     
        mx: "auto",            
        mt: 4,
        color: "white"
      }}
    >
      {/* Title */}
      <Typography 
        sx={{ 
          fontSize: "26px", 
          fontWeight: 700, 
          mb: 3 
        }}
      >
        All Posts
      </Typography>

      {/* All posts */}
      <LatestPosts showAll={true} />
    </Box>
  );
}
