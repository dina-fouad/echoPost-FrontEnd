import { Box, Typography, TextField, Stack } from "@mui/material";

export default function Sidebar() {
  const categories = [
    { name: "Programming", count: 12 },
    { name: "AI & Machine Learning", count: 8 },
    { name: "Web Development", count: 14 },
    { name: "Lifestyle", count: 6 },
    { name: "Business", count: 4 },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#1d1d1d",
        padding: { xs: "12px", sm: "18px", md: "20px" },
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        color: "white",
        width: { xs: "100%", sm: "280px", md: "320px" },
        mx: "auto",
      }}
    >
      {/* Search */}
      <Typography
        sx={{
          fontSize: { xs: "15px", sm: "17px", md: "18px" },
          fontWeight: 600,
          mb: { xs: 1, sm: 1.5 },
        }}
      >
        Search
      </Typography>

      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2a2a2a",
            borderRadius: "8px",
            height: { xs: 40, sm: 45 },

            "& fieldset": {
              borderColor: "#444",
            },
            "&:hover fieldset": {
              borderColor: "#666",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0aa",
            },
          },

          "& input": {
            color: "white",
            padding: "10px 12px",
            fontSize: { xs: "13px", sm: "14px" },
          },

          mb: { xs: 2, sm: 3 },
        }}
      />

      {/* Categories */}
      <Typography
        sx={{
          fontSize: { xs: "15px", sm: "17px", md: "18px" },
          fontWeight: 600,
          mb: { xs: 1.5, sm: 2 },
        }}
      >
        Categories
      </Typography>

      <Stack spacing={1}>
        {categories.map((cat) => (
          <Box
            key={cat.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: { xs: "8px 10px", sm: "10px 14px" },
              backgroundColor: "#2a2a2a",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "#353535",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "15px" } }}>
              {cat.name}
            </Typography>
            <Typography
              sx={{ color: "#aaa", fontSize: { xs: "12px", sm: "14px" } }}
            >
              {cat.count}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
