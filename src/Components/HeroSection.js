import { Box, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "280px", sm: "330px", md: "380px" },
        position: "relative",
        overflow: "hidden",
        marginTop: 0,
      }}
    >
      {/* Background Image with zoom animation */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1501785888041-af3ef285b470")`,
          backgroundSize: "calc(100% + 2px) calc(100% + 2px)", // Prevents thin border line issue
          backgroundPosition: "center",
          filter: "brightness(55%)",
          animation: "slowZoom 12s ease-in-out infinite alternate",
          "@keyframes slowZoom": {
            from: { transform: "scale(1)" },
            to: { transform: "scale(1.07)" },
          },
        }}
      />

      {/* Bottom gradient fade → blends into body background */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #1a1a1a 100%)",
          zIndex: 4,
        }}
      />

      {/* Centered text content */}
      <Box
        sx={{
          position: "absolute",
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 5,
          px: 2,
          width: "80%",
        }}
      >
        {/* Title text */}
        <Typography
          sx={{
            fontSize: { xs: "18px", sm: "26px", md: "32px", lg: "38px" },
            fontWeight: 700,
            fontFamily: "Playfair Display, serif",
            letterSpacing: "1px",
            textShadow: "0px 0px 10px rgba(0,0,0,0.8)",
            opacity: 0,
            animation: "fadeUp 1.2s ease-out forwards",
            "@keyframes fadeUp": {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          Welcome to EchoPost
        </Typography>

        {/* Subtitle text */}
        <Typography
          sx={{
            marginTop: "10px",
            maxWidth: "650px",
            mx: "auto",
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "17px" },
            fontWeight: 300,
            letterSpacing: "0.5px",
            textShadow: "0px 0px 8px rgba(0,0,0,0.7)",
            opacity: 0,
            animation: "fadeUp 1.5s ease-out forwards",
            animationDelay: "0.25s",
          }}
        >
          Share your ideas, connect with people, and explore amazing content.
        </Typography>
      </Box>
    </Box>
  );
}
