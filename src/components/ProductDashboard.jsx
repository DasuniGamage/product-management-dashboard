import { useState } from "react";
import ProductGrid from "./productGrid";
import ProductFormDialog from "./ProductFormDialog";
import { useProducts } from "../hooks/useProducts";
import ProductFilters from "./ProductFilter";
import {
  Alert,
  Snackbar,
  Typography,
  Drawer,
  Button,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Close } from "@mui/icons-material";


const ProductDashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [success, setSuccess] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    priceMin: "",
    priceMax: "",
    stockStatus: "All",
  });
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);


  const { products, addProduct, updateProduct ,deleteProduct} = useProducts();

  const handleAddOrUpdateProduct = (product) => {
    if (product.id && products.some((p) => p.id === product.id)) {
      updateProduct(product);
      setSnackbarMessage("Product updated successfully!");
      setSnackbarSeverity("success");
    } else {
      addProduct(product);
      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
    }
    setEditingProduct(null);
    setOpenForm(false);
    setSuccess(true);
  };


  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setSnackbarMessage("Product deleted successfully!");
    setSnackbarSeverity("warning");
    setEditingProduct(null);
    setOpenForm(false);
    setSuccess(true);
  };
   const handleEditClick = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return; // Ignore clickaway
    setSuccess(false);
  };


  const applyFilters = (products) => {
    return products.filter((product) => {
      const searchMatch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

      const categoryMatch =
        filters.category === "All" || product.category === filters.category;

      const priceMinMatch =
        filters.priceMin === "" || product.price >= parseFloat(filters.priceMin);

      const priceMaxMatch =
        filters.priceMax === "" || product.price <= parseFloat(filters.priceMax);

      const stockMatch =
        filters.stockStatus === "All" ||
        (filters.stockStatus === "In" && product.stock > 0) ||
        (filters.stockStatus === "Out" && product.stock === 0) ||
        (filters.stockStatus === "Low" && product.stock > 0 && product.stock < 5);

      return (
        searchMatch && categoryMatch && priceMinMatch && priceMaxMatch && stockMatch
      );
    });
  };

  const filteredProducts = applyFilters(products);



  return (
    <>
    <Box display="flex" justifyContent="space-between" m={2}>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={() => setFilterDrawerOpen(true)}
      >
        Filters
      </Button>
      <TextField
        label="Search"
        name="search"
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
        placeholder="Search by name"
        sx={{ width: 1/2}}
      />
    </Box>

    <Drawer
      anchor="left"
      open={isFilterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
    >
      <Box width={300} p={2} mt={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)} size="small">
            <Close/>
          </IconButton>
        </Box>
        <ProductFilters filters={filters} setFilters={setFilters} />
      </Box>
    </Drawer>
      {filteredProducts.length === 0 ? (
        <Typography variant="body1" mt={4}>
          No products found matching your filters.
        </Typography>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onAddProduct={() => {
            setEditingProduct(null);
            setOpenForm(true);
          }}
          onEditProduct={handleEditClick}
        />
      )}

      <ProductFormDialog
        open={openForm  }
        onClose={() => {setOpenForm(false)}}
        initialData={editingProduct}
        onSubmit={handleAddOrUpdateProduct}
        onDelete={handleDeleteProduct}
      />

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDashboard;
