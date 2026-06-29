import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProductGrid } from './components/ProductGrid'
import { Footer } from './components/Footer'
import { useProducts } from './hooks/useProducts'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const { products, loading, error } = useProducts()

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero
          search={search}
          onSearchChange={setSearch}
          productCount={products.length}
        />
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          search={search}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
