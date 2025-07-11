"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"

import AdminProductCardPreview from "./components/admin-product-card-preview" // Updated import
import { ProductInfoCard } from "./components/product-info-card"
import { BannerImageUploadCard } from "./components/banner-image-upload-card"
import { SellingOptionsCard } from "./components/selling-options-card"
import { ProductGalleryCard } from "./components/product-gallery-card"
import { DeliveryOptionsCard } from "./components/delivery-options-card"
import { ProductDetailsCard } from "./components/product-details-card"
import { MacronutrientsCard } from "./components/macronutrients-card"
import { CustomizationOptionsCard } from "./components/customization-options-card"

// Import the new preview components
import MobileProductPreview from "./mobile-product-preview"
import DesktopProductPreview from "./desktop-product-preview"

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
    offerUpToPrice: "", // New field
    price: "",
    weightOptions: [{ weight: "0.5 Kg", price: "", stock: "", isActive: true }],
    pieceOptions: [{ quantity: "1 piece", price: "", stock: "", isActive: true }],
    stock: "",
    sellingType: "weight", // Default to "weight"
    calories: "",
    netWeight: "",
    protein: "",
    fats: "",
    carbs: "",
    sugars: "",
    fiber: "",
    sodium: "",
    deliveryOption: "both", // New field
    addTextOnCake: false, // New field
    addCandles: false, // New field
    addKnife: false, // New field
    addMessageCard: false, // New field
    highlights: [] as string[], // New field
    ingredients: [] as string[], // New field
  })

  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>(Array(8).fill(""))
  const [previewMode, setPreviewMode] = useState(false)
  const [mediaSlots, setMediaSlots] = useState(4)
  const [urlInputIndex, setUrlInputIndex] = useState(-1)
  const [mediaUrls, setMediaUrls] = useState<string[]>(Array(8).fill(""))
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile")

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | React.ChangeEvent<HTMLTextAreaElement>>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle select changes (for category, sellingType, deliveryOption, highlights, ingredients)
  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle toggle switches (for isVeg, hasOffer, customization options)
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
      weightOptions: [...formData.weightOptions, { weight: "", price: "", stock: "", isActive: true }],
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

  // Update piece option
  const updatePieceOption = (index: number, field: string, value: string | boolean) => {
    const newPieceOptions = [...formData.pieceOptions]
    newPieceOptions[index] = {
      ...newPieceOptions[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      pieceOptions: newPieceOptions,
    })
  }

  // Handle URL input change
  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...mediaUrls]
    newUrls[index] = url
    setMediaUrls(newUrls)
  }

  // Handle URL submission
  const handleUrlSubmit = (index: number) => {
    const url = mediaUrls[index]
    if (url) {
      const newImages = [...additionalImages]
      newImages[index] = url
      setAdditionalImages(newImages)
      setUrlInputIndex(-1)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      id: Date.now(), // Simple unique ID
      name: formData.name,
      image: bannerImage || "/placeholder.svg",
      category: formData.category,
      price: Number.parseInt(formData.price) || 0,
      stock: Number.parseInt(formData.stock) || 0,
      status:
        Number.parseInt(formData.stock) > 10
          ? "in-stock"
          : Number.parseInt(formData.stock) > 0
            ? "low-stock"
            : "out-of-stock",
      description: formData.shortDescription,
      isActive: true, // New products are active by default
      discountPercent: Number.parseInt(formData.offerPercentage) || 0,
    }

    // Retrieve existing products from localStorage
    const existingProductsString = localStorage.getItem("newlyAddedProducts")
    const existingProducts = existingProductsString ? JSON.parse(existingProductsString) : []

    // Add the new product
    const updatedProducts = [...existingProducts, newProduct]
    localStorage.setItem("newlyAddedProducts", JSON.stringify(updatedProducts))

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
            {previewMode && (
              <div className="flex items-center gap-2">
                <Button
                  variant={previewDevice === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewDevice("mobile")}
                >
                  Mobile
                </Button>
                <Button
                  variant={previewDevice === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewDevice("desktop")}
                >
                  Desktop
                </Button>
              </div>
            )}
            <Button type="submit" form="product-form" className="bg-blue-600 hover:bg-blue-700">
              Save Product
            </Button>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
          <TabsContent value="card" className="space-y-6">
            {previewMode ? (
              <AdminProductCardPreview
                name={formData.name}
                description={formData.shortDescription}
                isVeg={formData.isVeg}
                hasOffer={formData.hasOffer}
                offerPercentage={formData.offerPercentage}
                offerUpToPrice={formData.offerUpToPrice}
                image={bannerImage}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <ProductInfoCard
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  handleSwitchChange={handleSwitchChange}
                />
                <BannerImageUploadCard
                  bannerImage={bannerImage}
                  setBannerImage={setBannerImage}
                  handleBannerImageUpload={handleBannerImageUpload}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="page" className="space-y-6">
            {previewMode ? (
              previewDevice === "mobile" ? (
                <div className="flex justify-center items-start">
                  <div className="w-[390px] h-[844px] bg-black rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      <div
                        className="w-full h-full overflow-y-auto scrollbar-hidden"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        <MobileProductPreview
                          name={formData.name}
                          category={formData.category}
                          description={formData.longDescription}
                          isVeg={formData.isVeg}
                          bannerImage={bannerImage}
                          additionalImages={additionalImages.filter((img) => img)}
                          weightOptions={formData.weightOptions}
                          pieceOptions={formData.pieceOptions}
                          price={formData.weightOptions[0]?.price || formData.price}
                          calories={formData.calories}
                          netWeight={formData.netWeight}
                          protein={formData.protein}
                          fats={formData.fats}
                          carbs={formData.carbs}
                          sugars={formData.sugars}
                          fiber={formData.fiber}
                          sodium={formData.sodium}
                          deliveryOption={formData.deliveryOption}
                          addTextOnCake={formData.addTextOnCake}
                          addCandles={formData.addCandles}
                          addKnife={formData.addKnife}
                          addMessageCard={formData.addMessageCard}
                          highlights={formData.highlights}
                          ingredients={formData.ingredients}
                          sellingType={formData.sellingType}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <DesktopProductPreview
                  name={formData.name}
                  category={formData.category}
                  description={formData.longDescription}
                  isVeg={formData.isVeg}
                  bannerImage={bannerImage}
                  additionalImages={additionalImages.filter((img) => img)}
                  weightOptions={formData.weightOptions}
                  pieceOptions={formData.pieceOptions}
                  price={formData.weightOptions[0]?.price || formData.price}
                  calories={formData.calories}
                  netWeight={formData.netWeight}
                  protein={formData.protein}
                  fats={formData.fats}
                  carbs={formData.carbs}
                  sugars={formData.sugars}
                  fiber={formData.fiber}
                  sodium={formData.sodium}
                  deliveryOption={formData.deliveryOption}
                  addTextOnCake={formData.addTextOnCake}
                  addCandles={formData.addCandles}
                  addKnife={formData.addKnife}
                  addMessageCard={formData.addMessageCard}
                  highlights={formData.highlights}
                  ingredients={formData.ingredients}
                  sellingType={formData.sellingType}
                />
              )
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  <SellingOptionsCard
                    formData={formData}
                    handleSelectChange={handleSelectChange}
                    addWeightOption={addWeightOption}
                    updateWeightOption={updateWeightOption}
                    removeWeightOption={removeWeightOption}
                    updatePieceOption={updatePieceOption}
                  />
                  <ProductGalleryCard
                    additionalImages={additionalImages}
                    setAdditionalImages={setAdditionalImages}
                    mediaSlots={mediaSlots}
                    setMediaSlots={setMediaSlots}
                    urlInputIndex={urlInputIndex}
                    setUrlInputIndex={setUrlInputIndex}
                    mediaUrls={mediaUrls}
                    setMediaUrls={setMediaUrls}
                    handleAdditionalImageUpload={handleAdditionalImageUpload}
                    removeAdditionalImage={removeAdditionalImage}
                    handleUrlChange={handleUrlChange}
                    handleUrlSubmit={handleUrlSubmit}
                  />
                  <DeliveryOptionsCard formData={formData} handleSelectChange={handleSelectChange} />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <ProductDetailsCard
                    formData={formData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    handleSwitchChange={handleSwitchChange}
                  />
                  <MacronutrientsCard formData={formData} handleChange={handleChange} />
                  <CustomizationOptionsCard formData={formData} handleSwitchChange={handleSwitchChange} />
                </div>
              </div>
            )}
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
