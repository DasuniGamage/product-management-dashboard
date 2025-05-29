import { useState } from "react";
import ProductGrid from "./productGrid";
import ProductFormDialog from "./ProductFormDialog";


const ProductDashboard = () => {
  const [products, setProducts] = useState([{
  id: "1",
  name: "Wireless Mouse",
  price: 25.99,
  category: "Electronics",
  stock: 12,
  description: "A reliable wireless mouse with ergonomic design and long battery life.",
  imageUrl: "logo.jpg"
},
  {
  id: "2",
  name: "Wireless Mouse",
  price: 25.99,
  category: "Electronics",
  stock: 0,
  description: "A reliable wireless mouse with ergonomic design and long battery life.",
  imageUrl: "logo.jpg"
},
  {
  id: "3",
  name: "Wireless Mouse",
  price: 25.99,
  category: "Electronics",
  stock: 12,
  description: "A reliable wireless mouse with ergonomic design and long battery life.",
  imageUrl: "logo.jpg"
},
  {
  id: "4",
  name: "Wireless Mouse",
  price: 25.99,
  category: "Electronics",
  stock: 12,
  description: "A reliable wireless mouse with ergonomic design and long battery life.",
  imageUrl: "logo.jpg"
}]);
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddOrUpdateProduct = (product) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        // Update
        const updated = [...prev];
        updated[index] = product;
        return updated;
      }
      // Add
      return [...prev, product];
    });
  };

  return (
    <>
      <ProductGrid
        products={products}
        onAddProduct={() => {
          setEditingProduct(null);
          setOpenForm(true);
        }}
      />

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        initialData={editingProduct}
        onSubmit={handleAddOrUpdateProduct}
      />
    </>
  );
};

export default ProductDashboard;
