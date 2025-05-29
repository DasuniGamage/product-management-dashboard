import { useState } from "react";
import ProductGrid from "./productGrid";
import ProductFormDialog from "./ProductFormDialog";
import { useProducts } from "../hooks/useProducts";
import { Alert, Snackbar } from "@mui/material";


const ProductDashboard = () => {
  // const [products, setProducts] = useState([])
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [success, setSuccess] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
    setSnackbarSeverity("warning"); // OR "info", "error", etc.
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


  return (
    <>
      <ProductGrid
        products={products}
        onAddProduct={() => {
          setEditingProduct(null);
          setOpenForm(true);
        }}
        onEditProduct={handleEditClick}
      />

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
