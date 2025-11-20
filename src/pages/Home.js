import HeroSection from "../Components/HeroSection";
import LatestPosts from "../Components/LatestPosts";
import Sidebar from "../Components/Sidebar";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/ArrowForwardIos";

export default function Home() {
  return (
    <div>
      {/* Hero section at the top */}
      <Box sx={{ mb: 5 }}>
        <HeroSection />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop

          // Reduced gap between LatestPosts & Sidebar on smaller screens
          gap: { xs: 0.8, sm: 1.5, md: 3 },

          mt: 4,
          px: { xs: 1, sm: 2, md: 4 },

          alignItems: { xs: "center", md: "flex-start" }, // Center on mobile
        }}
      >
        {/* Latest Posts section */}
        <Box
          sx={{
            flex: 2.5, // Main content takes more space

            width: {
              xs: "94%", // Slightly smaller width on small screens
              sm: "95%",
              md: "100%",
            },
            maxWidth: { xs: "580px", md: "100%" },
          }}
        >
          <LatestPosts />

          {/* "See all posts" button */}
          <Box sx={{ mt: 1.2, textAlign: { xs: "center", md: "left" } }}>
            <Button
              component={Link}
              to="/posts"
              sx={{
                color: "#055a5b",
                fontSize: "18px",
                fontWeight: 600,
                textTransform: "none",
                padding: "3px 6px",
                minWidth: "unset",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mx: { xs: "auto", md: "0" }, // Center on mobile
              }}
            >
              See all posts
              <TrendingFlatIcon sx={{ fontSize: "22px" }} />
            </Button>
          </Box>
        </Box>

        {/* Sidebar section */}
        <Box
          sx={{
            flex: 1, // Sidebar takes less space

            mt: { xs: 2, md: 5 }, // More margin on desktop

            width: {
              xs: "92%", // Slightly larger sidebar width on small screens
              sm: "300px",
              md: "100%",
            },

            maxWidth: { xs: "330px", sm: "340px", md: "350px" },

            // Push sidebar slightly to the right on mobile screens
            mr: { xs: "22px", sm: "18px", md: 0 },

            textAlign: { xs: "center", md: "left" }, // Center items on mobile
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </div>
  );
}
