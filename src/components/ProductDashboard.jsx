import { useState } from "react";
import ProductGrid from "./productGrid";
import ProductFormDialog from "./ProductFormDialog";
import { useProducts } from "../hooks/useProducts";


const ProductDashboard = () => {
  // const [products, setProducts] = useState([])
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

    const { products, addProduct, updateProduct } = useProducts();



  // useEffect(() => {
  //   const stored = localStorage.getItem("product_list");
  //   if (stored) {
  //     setProducts(JSON.parse(stored));
  //   }
  // }, []);

   const handleAddOrUpdateProduct = (product) => {
    if (product.id && products.some((p) => p.id === product.id)) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    setOpenForm(false);
  };
  

  // const handleAddOrUpdateProduct = (product) => {
  //   setProducts((prev) => {
  //     const index = prev.findIndex((p) => p.id === product.id);
  //     if (index !== -1) {
  //       // Update
  //       const updated = [...prev];
  //       updated[index] = product;
  //       return updated;
  //     }
  //     // Add
  //     return [...prev, product];
  //   });
  // };

   const handleEditClick = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
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
      />
    </>
  );
};

export default ProductDashboard;
