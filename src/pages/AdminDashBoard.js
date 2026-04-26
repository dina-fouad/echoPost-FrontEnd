import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Card,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";

import { useSnackbar } from "notistack";

import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InboxIcon from "@mui/icons-material/Inbox";

export default function Dashboard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery("(max-width:768px)");

  const [active, setActive] = useState(null);
  const [data, setData] = useState([]);

  const [counts, setCounts] = useState({
    users: 0,
    posts: 0,
    comments: 0,
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTRmNjNiZjJjMTJhY2RlMzJkY2U1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc3NzIwOTM3Nn0.W3MhRHNn2nLOeJdKMTsrauYgaJfVbaJIZR8g_iG0rDk";

  const authHeader = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    []
  );

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const users = await axios.get(
          "http://localhost:5000/api/users/profile/count",
          authHeader
        );

        const posts = await axios.get(
          "http://localhost:5000/api/posts/post/postCount",
          authHeader
        );

        const comments = await axios.get(
          "http://localhost:5000/api/comments",
          authHeader
        );

        setCounts({
          users: users.data || 0,
          posts: posts.data || 0,
          comments: Array.isArray(comments.data)
            ? comments.data.length
            : 0,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCounts();
  }, [authHeader]);

  const fetchData = async (type) => {
    setActive(type);

    try {
      let res;

      if (type === "users") {
        res = await axios.get("http://localhost:5000/api/users", authHeader);
        setData(Array.isArray(res.data) ? res.data : []);
      }

      if (type === "posts") {
        res = await axios.get("http://localhost:5000/api/posts", authHeader);
        setData(Array.isArray(res.data.post) ? res.data.post : []);
      }

      if (type === "comments") {
        res = await axios.get("http://localhost:5000/api/comments", authHeader);
        setData(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      setData([]);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/${active}/${deleteId}`,
        authHeader
      );

      setData((prev) => prev.filter((i) => i._id !== deleteId));

      setOpenDelete(false);

      enqueueSnackbar("Deleted successfully", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("Deletion failed", { variant: "error" });
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);

    if (active === "users") navigate(`/profile/${item._id}`);
    if (active === "posts") navigate(`/create/details/${item._id}`);
    if (active === "comments") setOpenView(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#0b0b0b",
        pt: isMobile ? "64px" : 0, // مراعاة navbar
      }}
    >

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          "& .MuiDrawer-paper": {
            width: 250,
            bgcolor: "#121212",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: isMobile ? 1 : 2 }}>
          <Typography sx={{ display: "flex", gap: 1, fontSize: isMobile ? 14 : 16 }}>
            <DashboardIcon fontSize={isMobile ? "small" : "medium"} /> ADMIN
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#222" }} />

        <List>
          {[
            { key: "users", label: "Users", icon: <PeopleIcon /> },
            { key: "posts", label: "Posts", icon: <ArticleIcon /> },
            { key: "comments", label: "Comments", icon: <CommentIcon /> },
          ].map((item) => (
            <ListItemButton
              key={item.key}
              onClick={() => fetchData(item.key)}
              sx={{
                "&:hover": { bgcolor: "#1f1f1f" },
                py: isMobile ? 0.5 : 1,
              }}
            >
              <ListItemIcon sx={{ color: "#ccc", minWidth: isMobile ? 30 : 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: isMobile ? 12 : 14,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* MAIN */}
      <Box sx={{ flex: 1, p: isMobile ? 2 : 4 }}>

        <Typography
          color="white"
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
        >
          Admin Dashboard
        </Typography>

        {/* COUNTS */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          {[
            { label: "Users", value: counts.users, icon: <PeopleIcon /> },
            { label: "Posts", value: counts.posts, icon: <ArticleIcon /> },
            { label: "Comments", value: counts.comments, icon: <CommentIcon /> },
          ].map((item) => (
            <Card
              key={item.label}
              sx={{
                flex: 1,
                minWidth: isMobile ? "100%" : 180,
                p: isMobile ? 1 : 2,
                bgcolor: "#151515",
                color: "white",
                border: "1px solid #222",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography color="#aaa" fontSize={isMobile ? 10 : 12}>
                  {item.label}
                </Typography>
                <Typography variant={isMobile ? "h6" : "h5"}>
                  {item.value}
                </Typography>
              </Box>

              <Box sx={{ color: "#888" }}>{item.icon}</Box>
            </Card>
          ))}
        </Box>

        {/* EMPTY STATE */}
        {!active && (
          <Card
            sx={{
              mt: 4,
              p: isMobile ? 2 : 5,
              bgcolor: "#151515",
              textAlign: "center",
              color: "#aaa",
              border: "1px solid #222",
            }}
          >
            <InboxIcon sx={{ fontSize: isMobile ? 40 : 60, color: "#444" }} />
            <Typography mt={2} fontSize={isMobile ? 12 : 14}>
              Select Users, Posts, or Comments to display data
            </Typography>
          </Card>
        )}

        {/* TABLE */}
        {active && (
          <Card sx={{ mt: 3, bgcolor: "#151515", color: "white", overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>

              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#aaa", fontSize: isMobile ? 12 : 14 }}>ID</TableCell>
                  <TableCell sx={{ color: "#aaa", fontSize: isMobile ? 12 : 14 }}>DATA</TableCell>
                  <TableCell sx={{ color: "#aaa", fontSize: isMobile ? 12 : 14 }}>ACTION</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ color: "#777", py: 4 }}>
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell sx={{ color: "white", fontSize: isMobile ? 11 : 13 }}>
                        {item._id.slice(0, 6)}...
                      </TableCell>

                      <TableCell sx={{ color: "white", fontSize: isMobile ? 11 : 13 }}>
                        {active === "posts"
                          ? item.description
                          : item.userName || item.text || item.title}
                      </TableCell>

                      <TableCell>
                        <Button
                          size={isMobile ? "small" : "medium"}
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => openDeleteDialog(item._id)}
                        >
                          Delete
                        </Button>

                        <Button
                          size={isMobile ? "small" : "medium"}
                          sx={{ color: "#038889", ml: 1 }}
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleView(item)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </Card>
        )}

      </Box>

      {/* DIALOGS (UNCHANGED) */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Typography>
              {selectedItem.text || selectedItem.description}
            </Typography>
          )}
        </DialogContent>
      </Dialog>

    </Box>
  );
}