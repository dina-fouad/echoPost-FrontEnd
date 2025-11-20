import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    // ======= Footer Wrapper =======
    // Full-width container with a vertical gradient background
    <Box
      sx={{
        width: "100%",
        background:
          "linear-gradient(to top, #06595a 0%, #06595a 20%, #1a1a1a 100%)",
        borderTop: "none",
        opacity: 1,

        // Responsive top margin to create spacing from content above
        mt: { xs: 3, sm: 4, md: 8, lg: 10 },

        // Responsive vertical padding
        py: { xs: 1, sm: 1.4, md: 1.8 },
      }}
    >
      {/* ======= Center Container =======
          Centers the footer content and scales it slightly on small screens */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          transform: {
            xs: "scale(0.82)",
            sm: "scale(0.9)",
            md: "scale(1)",
          },
          transformOrigin: "top",
        }}
      >
        {/* ======= Footer Content Box =======
            Glass-style box holding the flag and copyright text */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: { xs: 0.6, sm: 0.8, md: 1 },

            // Inner spacing
            px: { xs: 1.2, sm: 1.6, md: 2 },
            py: { xs: 0.35, sm: 0.5, md: 0.6 },

            // Styling: rounded, bordered, frosted, subtle transparency
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(3px)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {/* ======= Flag Icon ======= */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg"
            alt="Palestine Flag"
            width="18"
            height="12"
            style={{ borderRadius: "2px" }}
          />

          {/* ======= Footer Text =======
              Displays the creator's name with auto-updated year */}
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.4px",
            }}
          >
            Dina Al Barghouthi © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
