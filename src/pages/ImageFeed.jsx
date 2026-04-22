// 🌟 TopicFeed Component with Skeleton Loading
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";

export default function TopicFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  const apiUrl = "https://api.sampleapis.com/recipes/recipes";

  // 🌞 Daily seed
  const getDailySeed = () => {
    const today = new Date();
    return today.getFullYear() + today.getMonth() + today.getDate();
  };

  // 🎲 Seeded shuffle
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

  //  Fetch recipes
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const seed = getDailySeed();
        const shuffled = shuffleWithSeed(res.data, seed);
        setItems(shuffled.slice(0, 9));
        setLoading(false); 
      })
      .catch((err) => console.log(err));
  }, []);

  // Skeleton while loading
  if (loading) {
    return (
      <Box
        sx={{
          mt: 3,
          columnCount: { xs: 2, sm: 2, md: 3 },
          columnGap: "14px",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Box
            key={i}
            sx={{
              breakInside: "avoid",
              mb: 2,
              display: "inline-block",
              width: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ borderRadius: "12px", bgcolor: "#3b3b3b" }}
            />
            <Skeleton
              height={18}
              sx={{
                mt: 1,
                width: "70%",
                borderRadius: "6px",
                bgcolor: "#3b3b3b",
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  //  After loading, show real items
  return (
    <Box
      sx={{
        mt: 3,
        columnCount: { xs: 2, sm: 2, md: 3 },
        columnGap: "14px",
      }}
    >
      {items.map((item) => {
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
              breakInside: "avoid",
              mb: 2,
              display: "inline-block",
              width: "100%",
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
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              image={item.photoUrl}
              alt={item.title}
            />

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
