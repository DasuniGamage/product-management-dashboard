import { Box, Container, CssBaseline } from "@mui/material"
import Header from "./components/Header"
import ProductGrid from "./components/productGrid"



const sampleProducts =[
  {
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
}
]
function App() {

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box mt={4}>
          <ProductGrid products={sampleProducts} />
        </Box>
      </Container>
    </>
  )
}

export default App
