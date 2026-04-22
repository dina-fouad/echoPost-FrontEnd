import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm({ toastMsg }) {
  const [category, setGategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function creatPostHandler() {
    if (category === "") return toastMsg("Category is required", "warning");
    if (description === "") return toastMsg("Description is required", "warning");

    let formData = new FormData();
    formData.append("postImg", image);
    formData.append("description", description);
    formData.append("category", category);

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmZGI0ZjJjMTJhY2RlMzJkY2U1NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NzY3OTMzOTJ9.jEfpjYDwesx_kM0NkvXxID1O5cpzaEx9q-dHfrU8rUw";
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:5000/api/posts", formData, config)
      .then((res) => navigate(`/create/details/${res.data._id}`))
      .catch((err) => console.log(err.response.data.message));
  }

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: { xs: "80%", sm: "600px" },
        margin: "auto",
        mt: { xs: 2, sm: 5 },
        p: { xs: 2, sm: 4 },
        borderRadius: { xs: "14px", sm: "20px" },
        backdropFilter: "blur(14px)",
        background: "rgba(42, 42, 42, 0.65)",
        boxShadow: "0 8px 22px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "rgb(6, 89, 90)",
          mb: 3,
          fontSize: { xs: "22px", sm: "30px" },
        }}
      >
        Create Post
      </Typography>

      {/* Category */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: "#ddd", fontSize: { xs: "14px", sm: "16px" } }}>
          Category
        </InputLabel>

        <Select
          value={category}
          onChange={(e) => setGategory(e.target.value)}
          label="Category"
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: { xs: 220, sm: 320 }, // 📱 القائمة أقصر
              },
            },
          }}
          sx={{
            color: "white",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.06)",

            /* ✅ RESPONSIVE SIZE */
            height: { xs: "44px", sm: "56px" },
            fontSize: { xs: "14px", sm: "16px" },

            ".MuiSelect-select": {
              padding: { xs: "10px", sm: "16.5px 14px" },
              display: "flex",
              alignItems: "center",
            },

            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(6, 89, 90)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(6, 89, 90)",
            },
          }}
        >
          {[
            "Programming",
            "AI & Machine Learning",
            "Web Development",
            "Lifestyle",
            "Business",
            "Travel",
            "Fitness & Health",
            "Education",
            "Society & Culture",
            "Political",
          ].map((item) => (
            <MenuItem
              key={item}
              value={item}
              sx={{ fontSize: { xs: "13px", sm: "16px" } }} // 📱 خط أصغر
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Description */}
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          mb: 3,
          textarea: {
            color: "white",
            fontSize: { xs: "14px", sm: "16px" },
          },
          "& label": { color: "#ccc" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            background: "rgba(255,255,255,0.06)",
            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
            "&:hover fieldset": { borderColor: "rgb(6, 89, 90)" },
            "&.Mui-focused fieldset": { borderColor: "rgb(6, 89, 90)" },
          },
        }}
      />

      {/* Upload */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Box
          component="label"
          sx={{
            width: { xs: "100%", sm: "60%" },
            height: "70px",
            border: "2px dashed rgba(255,255,255,0.3)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            background: "rgba(255,255,255,0.05)",
            "&:hover": {
              borderColor: "rgb(6, 89, 90)",
              background: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloudUploadIcon
            sx={{ fontSize: { xs: 30, sm: 40 }, color: "rgb(6, 89, 90)" }}
          />
          <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
        </Box>
      </Box>

      {/* Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 4,
          py: { xs: 1.2, sm: 1.5 },
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: { xs: "15px", sm: "17px" },
          backgroundColor: "rgb(6, 89, 90)",
          "&:hover": {
            backgroundColor: "rgb(4, 70, 72)",
            transform: "translateY(-2px)",
          },
        }}
        onClick={creatPostHandler}
      >
        Create Post
      </Button>
    </Paper>
  );
}
