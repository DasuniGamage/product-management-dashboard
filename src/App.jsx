import { Box, Container, CssBaseline } from "@mui/material"
import Header from "./components/Header"
import ProductDashboard from "./components/ProductDashboard"


function App() {

 

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg"  >
        <Box mt={10}>
          <ProductDashboard />
        </Box>
      </Container>
    </>
  )
}

export default App
