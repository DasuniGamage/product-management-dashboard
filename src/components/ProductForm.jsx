import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Other",
];


const initialFormState = {
  name: "",
  price: "",
  category: "",
  quantity: "",
  description: "",
  image: "",
};

const ProductForm = ({ initialData = null, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 3 || formData.name.length > 50) {
      newErrors.name = "Product name must be between 3 and 50 characters.";
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Max 2 decimal places allowed.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.quantity || !Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a non-negative integer.";
    }

    if (formData.description.length > 200) {
      newErrors.description = "Description must be 200 characters or less.";
    }

    if (formData.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(formData.image)) {
      newErrors.image = "Please enter a valid image URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? value.trim() : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      ...formData,
      id: initialData?.id || Date.now(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      inStock: Number(formData.quantity) > 0,
    };

    onSubmit(newProduct);

    if (!initialData) {
      setFormData(initialFormState); // reset after add
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Price ($)"
            name="price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            required
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Stock Quantity"
            name="quantity"
            type="number"
            fullWidth
            required
            value={formData.quantity}
            onChange={handleChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>

        <Grid item xs={12} sm={9}>
          <TextField
            label={`Description (${formData.description.length}/200)`}
            name="description"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            value={formData.image}
            onChange={handleChange}
            error={!!errors.image}
            helperText={errors.image || "Optional - must be a valid image URL"}
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" gap={2} justifyContent={"end"}>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        {initialData && (
          <Button
              type="button"
              variant="contained"
              color="error"
              onClick={() => onDelete(initialData.id)}
            >
              Delete
            </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductForm;
