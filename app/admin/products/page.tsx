"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileDown, MoreHorizontal, Package, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { HiOutlineSquares2X2 } from "react-icons/hi2"
import { CiCircleList } from "react-icons/ci"
import Image from "next/image"

// Sample products data
const initialProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "/decadent-chocolate-cake.png",
    category: "Cakes",
    price: 499,
    stock: 25,
    status: "in-stock",
    description: "Rich chocolate cake with creamy ganache frosting.",
    isActive: true,
    discountPercent: 0,
  },
  {
    id: 2,
    name: "Red Velvet Cupcake",
    image: "/red-velvet-cheesecake.png",
    category: "Cupcakes",
    price: 199,
    stock: 5,
    status: "low-stock",
    description: "Classic red velvet cupcake with cream cheese frosting.",
    isActive: true,
    discountPercent: 10,
  },
  {
    id: 3,
    name: "Oatmeal Cookie",
    image: "/classic-chocolate-chip-cookies.png",
    category: "Cookies",
    price: 99,
    stock: 0,
    status: "out-of-stock",
    description: "Chewy oatmeal cookies with raisins.",
    isActive: false,
    discountPercent: 0,
  },
  {
    id: 4,
    name: "Classic Croissant",
    image: "/golden-butter-croissant.png",
    category: "Pastries",
    price: 149,
    stock: 18,
    status: "in-stock",
    description: "Buttery, flaky croissants baked fresh daily.",
    isActive: true,
    discountPercent: 0,
  },
  {
    id: 5,
    name: "Strawberry Cheesecake",
    image: "/classic-strawberry-cheesecake.png",
    category: "Cakes",
    price: 599,
    stock: 7,
    status: "in-stock",
    description: "Creamy cheesecake topped with fresh strawberries.",
    isActive: true,
    discountPercent: 5,
  },
  {
    id: 6,
    name: "Chocolate Chip Cookie",
    image: "/classic-chocolate-chip-cookies.png",
    category: "Cookies",
    price: 79,
    stock: 42,
    status: "in-stock",
    description: "Classic cookies with chocolate chips in every bite.",
    isActive: true,
    discountPercent: 0,
  },
  {
    id: 7,
    name: "Blueberry Muffin",
    image: "/images/blueberry-muffin.jpg",
    category: "Pastries",
    price: 129,
    stock: 0,
    status: "out-of-stock",
    description: "Fluffy muffins bursting with fresh blueberries.",
    isActive: true,
    discountPercent: 0,
  },
]

// Sample categories data
const categories = [
  { id: 1, name: "Cakes" },
  { id: 2, name: "Cupcakes" },
  { id: 3, name: "Cookies" },
  { id: 4, name: "Pastries" },
  { id: 5, name: "Breads" },
  { id: 6, name: "Donuts" },
  { id: 7, name: "Brownies" },
]

export default function ProductsPage() {
  const router = useRouter()
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  // Delete product
  const confirmDelete = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  // Handle navigation to edit product
  const handleEditProduct = (product: any) => {
    // This would navigate to an edit page in a real app
    console.log("Edit product:", product)
    // Example: router.push(`/admin/products/edit/${product.id}`)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "out-of-stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Filter products based on search term, category, and stock status
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    // Stock filter
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.status === "in-stock") ||
      (stockFilter === "low-stock" && product.status === "low-stock") ||
      (stockFilter === "out-of-stock" && product.status === "out-of-stock")

    return matchesSearch && matchesCategory && matchesStock
  })

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button
          onClick={() => router.push("/admin/products/create")}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-between sm:justify-start">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={viewMode === "card" ? "bg-muted" : ""}
              onClick={() => setViewMode("card")}
            >
              <HiOutlineSquares2X2 className="h-5 w-5" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={viewMode === "table" ? "bg-muted" : ""}
              onClick={() => setViewMode("table")}
            >
              <CiCircleList className="h-5 w-5" />
              <span className="sr-only">List View</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={(value) => setStockFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => setShowEmptyState(!showEmptyState)}
            >
              {showEmptyState ? "Show Products" : "Show Empty"}
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table or Empty State */}
      {showEmptyState || products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              <Package className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No products available yet</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground">
              Start adding delicious treats to your catalog! Products you add will appear here.
            </p>
            <Button
              className="mt-6 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/admin/products/create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "table" ? (
        <Card>
          <div className="overflow-x-auto">
            <Table className="admin-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium leading-none">{product.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden mt-1">{product.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">₹{product.price}</span>
                        {product.discountPercent > 0 && (
                          <span className="text-xs text-green-600">{product.discountPercent}% off</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{product.stock} pcs</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(product.status)}>
                        {product.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setProductToDelete(product.id)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden admin-card">
              <div className="relative h-48 w-full dark:bg-[#1f1f1f]">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.discountPercent > 0 && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discountPercent}% OFF
                  </div>
                )}
                <Badge variant="outline" className={`absolute bottom-2 left-2 ${getStatusBadgeColor(product.status)}`}>
                  {product.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              </div>
              <CardContent className="p-4 dark:bg-[#1f1f1f]">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-muted-foreground">{product.category}</span>
                  <span className="font-bold">₹{product.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className={product.stock === 0 ? "text-red-500" : "text-muted-foreground"}>
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between gap-2 border-t dark:bg-[#141414]">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditProduct(product)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:text-red-700"
                  onClick={() => {
                    setProductToDelete(product.id)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!showEmptyState && products.length > 0 && (
        <div className="flex items-center justify-end">
          <div className="text-sm text-muted-foreground mr-4">
            Showing <strong>1 - {Math.min(10, filteredProducts.length)}</strong> of{" "}
            <strong>{filteredProducts.length}</strong> products
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-[95vw] sm:w-auto">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="rounded-full bg-red-100 p-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="text-sm text-muted-foreground">
              Deleting this product will remove it from your catalog and customers will no longer be able to purchase
              it.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
