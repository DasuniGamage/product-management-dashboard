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
  Fab,
  Tooltip,
} from "@mui/material";

const ProductCard = ({ product, onEdit }) => {
  const {
    name,
    price,
    category,
    quantity,
    description,
    imageUrl,
  } = product;

  return (
    <Card sx={{ width: 345, height: "100%", display: "flex", flexDirection: "column",overflow: "hidden",position:"relative" }}>
      <Tooltip title="Edit Product">
        <Fab
          color="transparent"
          aria-label="aeditdd"
          size="small"
          onClick={() => onEdit(product)}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            zIndex: 2,
            boxShadow:"none"
          }}
        >
          <Edit />
        </Fab>
      </Tooltip>
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        onError={(e) => (e.target.src = "/default-image.png")}
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
            label={quantity > 0 ? (quantity < 5 ? "Low Stock" : "In Stock") : "Out of Stock"}
            color={quantity === 0 ? "error" : quantity < 5 ? "warning" : "success"}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
