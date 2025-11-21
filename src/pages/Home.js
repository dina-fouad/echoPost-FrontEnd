import HeroSection from "../Components/HeroSection";
import LatestPosts from "../Components/LatestPosts";
import Sidebar from "../Components/Sidebar";
import ImageFeed from "./ImageFeed";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/ArrowForwardIos";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Box sx={{ mb: 8 }}>
        <HeroSection />
      </Box>

      {/* MAIN LAYOUT — 3 COLUMNS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 3,
          maxWidth: "1500px",
          mx: "auto",
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            
            width: { xs: "90%", md: "300px" },

            flex: { xs: "unset", md: "0.9" },

          
            mx: { xs: 0, md: 3 },

            order: { xs: 2, md: 1 },

            px: { xs: 1, md: 0 },
           
          }}
        >
          <Sidebar />
        </Box>

        {/* POSTS — يتحرك يمين */}
        <Box
          sx={{
            flex: { xs: "unset", md: "2.4" },
            maxWidth: { md: "650px" },
            order: { xs: 1, md: 2 },
            mx: "auto",

            ml: { md: "50px" },
          }}
        >
          <LatestPosts />

          <Box sx={{ mt: 1.2, textAlign: { xs: "center" } }}>
            <Button
              component={Link}
              to="/posts"
              sx={{
                color: "#055a5b",
                fontSize: "18px",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mx: { xs: "auto", md: "0" },
              }}
            >
              See all posts
              <TrendingFlatIcon sx={{ fontSize: "22px" }} />
            </Button>
          </Box>
        </Box>

        {/* IMAGE FEED */}
        <Box
          sx={{
            flex: { xs: "unset", md: "1.4" },
            maxWidth: { md: "400px" },
            order: { xs: 3, md: 3 },
            mx: { xs: "auto", md: 0 },
          }}
        >
          <ImageFeed />
        </Box>
      </Box>
    </div>
  );
}
