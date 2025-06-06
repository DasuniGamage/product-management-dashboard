import { Fab, Grid, Tooltip,Box } from "@mui/material";
import ProductCard from "./ProductCard";
import AddIcon from '@mui/icons-material/Add';

const ProductGrid = ({ products, onAddProduct, onEditProduct }) => {
  console.log('products :>> ', products);
  return (
    <Box sx={{ position: "relative", paddingBottom: 2}}>
      <Grid container spacing={4} mx={3} sx={{justifyContent: 'center'}}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <ProductCard product={product} onEdit={onEditProduct} />
          </Grid>
        ))}
      </Grid>

      <Tooltip title="Add New Product">
        <Fab
          color="primary"
          aria-label="add"
          onClick={onAddProduct}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ProductGrid;