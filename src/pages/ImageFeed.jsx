// 🌟 TopicFeed Component
// This component fetches daily recipes, shuffles them using a daily seed,
// and displays them in a Pinterest-style masonry layout.

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

export default function TopicFeed() {
  // State to store the 9 daily selected recipes
  const [items, setItems] = useState([]);

  // Public recipes API
  const apiUrl = "https://api.sampleapis.com/recipes/recipes";

  // 🌞 Generate a seed that changes once per day
  // This ensures the recipe order stays the same all day for every user.
  const getDailySeed = () => {
    const today = new Date();
    return today.getFullYear() + today.getMonth() + today.getDate();
  };

  // 🎲 Shuffle an array using a seeded random generator
  // Makes the shuffle consistent and repeatable for the same day.
  const shuffleWithSeed = (array, seed) => {
    let shuffled = [...array];
    let random = seed;

    for (let i = shuffled.length - 1; i > 0; i--) {
      random = (random * 9301 + 49297) % 233280;
      const j = random % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  // 🔥 Fetch 9 recipes when the component first loads
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const seed = getDailySeed();
        const shuffled = shuffleWithSeed(res.data, seed);

        // Keep only 9 items per day
        setItems(shuffled.slice(0, 9));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        mt: 3,

        // 📌 Pinterest-style layout using CSS columns
        columnCount: {
          xs: 2, // mobile: 2 columns
          sm: 2,
          md: 3, // desktop: 3 columns
        },
        columnGap: "14px",
      }}
    >
      {items.map((item) => {
        // Clicking a card searches the recipe title on Google
        const googleUrl =
          "https://www.google.com/search?q=" +
          encodeURIComponent(item.title);

        return (
          <Card
            key={item.id}
            component="a"
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              breakInside: "avoid", // prevent card from breaking across columns
              mb: 2,
              display: "inline-block",
              width: "100%",

              // 🌑 Dark theme matching the sidebar
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#2a2a2a",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",

              cursor: "pointer",
              transition: "0.25s ease",

              "&:hover": {
                backgroundColor: "#353535",
                transform: "scale(1.02)",
              },
            }}
          >
            {/* 📸 Recipe image */}
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover", // keeps Pinterest style
              }}
              image={item.photoUrl}
              alt={item.title}
            />

            {/* 📝 Recipe title */}
            <CardContent sx={{ p: 1.2 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
