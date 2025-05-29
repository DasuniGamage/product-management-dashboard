import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "./ProductForm";

const ProductFormDialog = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {initialData ? "Edit Product" : "Add New Product"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ProductForm
          initialData={initialData}
          onSubmit={(product) => {
            onSubmit(product);
            onClose(); 
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
