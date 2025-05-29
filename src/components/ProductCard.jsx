import { Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    category,
    stock,
    description,
    imageUrl,
  } = product;

  return (
    <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="180"
        image={imageUrl || "/logo.jpg"}
        alt={name}
        onError={(e) => (e.target.src = "/logo.jpg")}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2" mt={1}>
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" color="primary">
            ${price.toFixed(2)}
          </Typography>
          <Chip
            label={stock > 0 ? (stock < 5 ? "Low Stock" : "In Stock") : "Out of Stock"}
            color={stock === 0 ? "error" : stock < 5 ? "warning" : "success"}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
