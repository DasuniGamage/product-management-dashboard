import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

const categories = ["All", "Electronics", "Clothing", "Books", "Home", "Sports", "Other"];

const ProductFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClear = () => {
    setFilters({
      search: "",
      category: "All",
      priceMin: "",
      priceMax: "",
      stockStatus: "All",
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Category"
        name="category"
        select
        value={filters.category}
        onChange={handleChange}
        fullWidth
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <Box display="flex" gap={2}>
        <TextField
          label="Min Price"
          name="priceMin"
          type="number"
          value={filters.priceMin}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
        />
        <TextField
          label="Max Price"
          name="priceMax"
          type="number"
          value={filters.priceMax}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
        />
      </Box>

      <RadioGroup
        row
        name="stockStatus"
        value={filters.stockStatus}
        onChange={handleChange}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel value="In" control={<Radio />} label="In Stock" />
        <FormControlLabel value="Out" control={<Radio />} label="Out of Stock" />
        <FormControlLabel value="Low" control={<Radio />} label="Low Stock (<5)" />
      </RadioGroup>

      <Button variant="outlined" onClick={handleClear}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default ProductFilters;
