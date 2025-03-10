"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, Plus, Upload, X, ImageIcon } from "lucide-react"
import { BiSolidOffer } from "react-icons/bi"
import { FaStar } from "react-icons/fa"

export default function CreateProductPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("card")
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    isVeg: true,
    hasOffer: false,
    offerPercentage: "",
    price: "",
    weightOptions: [{ weight: "0.5 Kg", price: "", isActive: true }],
    stock: "",
  })

  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>(["", "", "", ""])
  const [previewMode, setPreviewMode] = useState(false)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle toggle switches
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Handle banner image upload
  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle additional image upload
  const handleAdditionalImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...additionalImages]
        newImages[index] = reader.result as string
        setAdditionalImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages]
    newImages[index] = ""
    setAdditionalImages(newImages)
  }

  // Add weight option
  const addWeightOption = () => {
    setFormData({
      ...formData,
      weightOptions: [...formData.weightOptions, { weight: "", price: "", isActive: true }],
    })
  }

  // Update weight option
  const updateWeightOption = (index: number, field: string, value: string | boolean) => {
    const newWeightOptions = [...formData.weightOptions]
    newWeightOptions[index] = {
      ...newWeightOptions[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      weightOptions: newWeightOptions,
    })
  }

  // Remove weight option
  const removeWeightOption = (index: number) => {
    if (formData.weightOptions.length > 1) {
      const newWeightOptions = [...formData.weightOptions]
      newWeightOptions.splice(index, 1)
      setFormData({
        ...formData,
        weightOptions: newWeightOptions,
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Form data:", formData)
    console.log("Banner image:", bannerImage)
    console.log(
      "Additional images:",
      additionalImages.filter((img) => img),
    )

    // Redirect back to products list
    router.push("/admin/products")
  }

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => router.push("/admin/products")}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
          <p className="text-muted-foreground">Add a new product to your catalog</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="card">Product Card</TabsTrigger>
            <TabsTrigger value="page">Product Page</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
            <Button type="submit" form="product-form" className="bg-blue-600 hover:bg-blue-700">
              Save Product
            </Button>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
          <TabsContent value="card" className="space-y-6">
            {previewMode ? (
              <ProductCardPreview
                name={formData.name}
                description={formData.shortDescription}
                isVeg={formData.isVeg}
                hasOffer={formData.hasOffer}
                offerPercentage={formData.offerPercentage}
                image={bannerImage}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Card Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Title</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="E.g., Red Velvet Cheesecake"
                        className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">Short Description</Label>
                      <Textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        placeholder="1-2 sentences describing the product"
                        className="min-h-[80px] focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cakes">Cakes</SelectItem>
                          <SelectItem value="Cupcakes">Cupcakes</SelectItem>
                          <SelectItem value="Cookies">Cookies</SelectItem>
                          <SelectItem value="Pastries">Pastries</SelectItem>
                          <SelectItem value="Breads">Breads</SelectItem>
                          <SelectItem value="Donuts">Donuts</SelectItem>
                          <SelectItem value="Brownies">Brownies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="isVeg">Veg/Non-Veg Indicator</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup
                          value={formData.isVeg ? "veg" : "nonveg"}
                          onValueChange={(value) => handleSwitchChange("isVeg", value === "veg")}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veg" id="veg" />
                            <Label htmlFor="veg" className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded-sm">
                                <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                              </div>
                              <span>Veg</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nonveg" id="nonveg" />
                            <Label htmlFor="nonveg" className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded-sm">
                                <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                              </div>
                              <span>Non-Veg</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hasOffer">Offer</Label>
                        <Switch
                          id="hasOffer"
                          checked={formData.hasOffer}
                          onCheckedChange={(checked) => handleSwitchChange("hasOffer", checked)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      {formData.hasOffer && (
                        <div className="pt-2">
                          <Label htmlFor="offerPercentage">Offer Percentage</Label>
                          <div className="flex items-center mt-1">
                            <Input
                              id="offerPercentage"
                              name="offerPercentage"
                              type="number"
                              min="1"
                              max="99"
                              value={formData.offerPercentage}
                              onChange={handleChange}
                              placeholder="E.g., 10"
                              className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                              required={formData.hasOffer}
                            />
                            <span className="ml-2">%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Banner Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {bannerImage ? (
                            <>
                              <Image
                                src={bannerImage || "/placeholder.svg"}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={() => setBannerImage(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <div className="text-center p-6">
                              <ImageIcon className="h-10 w-10 mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Upload a high-quality image for the product card
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="banner-image"
                          className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Banner Image
                        </Label>
                        <input
                          type="file"
                          id="banner-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleBannerImageUpload}
                        />
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, Max 2MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="page" className="space-y-6">
            {previewMode ? (
              <ProductPagePreview
                name={formData.name}
                category={formData.category}
                description={formData.longDescription}
                isVeg={formData.isVeg}
                bannerImage={bannerImage}
                additionalImages={additionalImages.filter((img) => img)}
                weightOptions={formData.weightOptions}
                price={formData.weightOptions[0]?.price || formData.price}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                          <div key={index} className="space-y-2">
                            <div className="border rounded-lg overflow-hidden">
                              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                {additionalImages[index] ? (
                                  <>
                                    <Image
                                      src={additionalImages[index] || "/placeholder.svg"}
                                      alt={`Image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="destructive"
                                      className="absolute top-2 right-2 h-6 w-6"
                                      onClick={() => removeAdditionalImage(index)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </>
                                ) : (
                                  <div className="text-center p-2">
                                    <ImageIcon className="h-6 w-6 mx-auto text-gray-400" />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image {index + 1}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`image-${index}`}
                              className="cursor-pointer inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground w-full"
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </Label>
                            <input
                              type="file"
                              id={`image-${index}`}
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleAdditionalImageUpload(index, e)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="longDescription">Long Description</Label>
                        <Textarea
                          id="longDescription"
                          name="longDescription"
                          value={formData.longDescription}
                          onChange={handleChange}
                          placeholder="Detailed description of the product..."
                          className="min-h-[150px] focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleChange}
                          placeholder="0"
                          className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Weight & Price Options</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={addWeightOption} className="h-8">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formData.weightOptions.map((option, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-start pb-4 border-b last:border-0">
                          <div className="col-span-5">
                            <Label htmlFor={`weight-${index}`} className="text-xs">
                              Weight
                            </Label>
                            <Input
                              id={`weight-${index}`}
                              value={option.weight}
                              onChange={(e) => updateWeightOption(index, "weight", e.target.value)}
                              placeholder="E.g., 0.5 Kg"
                              className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                              required
                            />
                          </div>
                          <div className="col-span-5">
                            <Label htmlFor={`price-${index}`} className="text-xs">
                              Price (₹)
                            </Label>
                            <Input
                              id={`price-${index}`}
                              type="number"
                              min="0"
                              value={option.price}
                              onChange={(e) => updateWeightOption(index, "price", e.target.value)}
                              placeholder="0"
                              className="focus-visible:ring-blue-500 focus-visible:ring-1 focus-visible:ring-offset-0"
                              required
                            />
                          </div>
                          <div className="col-span-1 pt-6">
                            <Switch
                              id={`active-${index}`}
                              checked={option.isActive}
                              onCheckedChange={(checked) => updateWeightOption(index, "isActive", checked)}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </div>
                          <div className="col-span-1 pt-5">
                            {formData.weightOptions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeWeightOption(index)}
                                className="h-8 w-8 text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">
                          * First weight option will be used as the default price
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

// Product Card Preview Component
function ProductCardPreview({
  name = "Product Name",
  description = "Product description goes here.",
  image = null,
  isVeg = true,
  hasOffer = false,
  offerPercentage = "10",
}) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-0">
        <div className="bg-white dark:bg-[#17181C] rounded-[20px] overflow-hidden">
          {/* Product Image Section */}
          <div className="relative h-[200px] w-full">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
              {image ? (
                <Image src={image || "/placeholder.svg"} alt={name} fill className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute top-4 left-4 bg-white dark:bg-[#17181C] font-semibold text-black dark:text-white px-3 py-1 rounded-full flex justify-center items-center space-x-2 text-[16px]">
              <FaStar className="text-yellow-400" />
              <p>4</p>
            </div>
            <button
              className="absolute top-4 right-4 bg-white dark:bg-[#17181C] p-2 rounded-full shadow-md"
              aria-label="Add to favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-gray-400 dark:text-gray-300"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Product Info Section */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-2 item-center">
              <h2 className="text-[18px] font-semibold text-gray-800 dark:text-white">{name || "Product Name"}</h2>
              <div className="mb-1">
                <div
                  className={`w-5 h-5 border-2 ${isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center rounded-sm`}
                >
                  <div className={`w-2.5 h-2.5 ${isVeg ? "bg-green-600" : "bg-red-600"} rounded-full`}></div>
                </div>
              </div>
            </div>
            <p className="text-[14px] leading-[16px] text-gray-600 dark:text-gray-300">
              {description || "Product description goes here."}
            </p>
          </div>

          {hasOffer && (
            <div className="p-4 pt-3 border-t border-gray-400 dark:border-gray-600 border-dashed flex items-center gap-2">
              <BiSolidOffer size={20} color="blue" />
              <p className="text-[16px] font-semibold text-gray-700 dark:text-gray-200">
                {offerPercentage}% OFF up to ₹60
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Product Page Preview Component
function ProductPagePreview({
  name = "Product Name",
  category = "Category",
  description = "Product description goes here.",
  isVeg = true,
  bannerImage = null,
  additionalImages = [],
  weightOptions = [{ weight: "0.5 Kg", price: "499", isActive: true }],
  price = "499",
}) {
  return (
    <div className="w-full max-w-md mx-auto border rounded-lg dark:bg-[#121212] overflow-hidden">
      {/* Product Image Section */}
      <div className="relative">
        <div className="relative h-[300px] w-full bg-gray-200 dark:bg-gray-800">
          {bannerImage ? (
            <Image src={bannerImage || "/placeholder.svg"} alt={name} fill className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>

        <div className="absolute top-4 left-4 rounded-full bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center shadow-md">
          <ChevronLeft className="h-5 w-5" />
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="rounded-full bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="rounded-full bg-white dark:bg-gray-800 w-10 h-10 flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center gap-2 p-2 bg-white dark:bg-[#121212]">
        {additionalImages.length > 0
          ? additionalImages.map((img, index) => (
              <div key={index} className="relative w-16 h-16 border rounded-md overflow-hidden">
                <Image src={img || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </div>
            ))
          : Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 border rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                >
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                </div>
              ))}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white dark:bg-[#121212] space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{category || "Category"}</span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 h-3 w-3" />
              <span className="ml-1 text-sm">4</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-1">{name || "Product Name"}</h1>
          <div className="mt-1">
            <div
              className={`inline-block w-5 h-5 border-2 ${isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center rounded-sm`}
            >
              <div className={`w-2.5 h-2.5 ${isVeg ? "bg-green-600" : "bg-red-600"} rounded-full`}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
            <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <circle cx="18" cy="18" r="18" fill="#FF9FDB" />
              <path d="M13 13a6 6 0 0 1 10 0" stroke="#FF71CA" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-sm">Duchess Pastries</p>
            <p className="text-xs text-gray-500">Baker</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {description || "Detailed product description would appear here."}
            <span className="text-blue-600 ml-1">Read more</span>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Select Weight</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {weightOptions.map((option, index) => (
              <div
                key={index}
                className={`px-6 py-3 border rounded-full text-sm ${
                  index === 0 ? "bg-gray-900 text-white dark:bg-gray-700" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {option.weight}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 py-4 mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="text-2xl font-bold">₹{price || "499"}</p>
          </div>
          <button className="px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
