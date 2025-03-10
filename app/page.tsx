import Header from "@/components/block/Header";
import Hero from "@/components/block/hero";
import ProductCard from "@/components/productcard";
import Image from "next/image";
import { NewsletterSubscription } from "@/components/block/NewsletterSubscription";

export default function Home() {
  // Product data for the home page
  const products = [
    {
      id: 1,
      name: "Red Velvet Cake",
      rating: 4.8,
      imageUrl: "/red-velvet-cheesecake.png",
      price: 499,
      isVeg: true,
      description:
        "Layered with creamy cheesecake, made with cocoa, cream cheese, and vanilla.",
    },
    {
      id: 2,
      name: "Chocolate Eclair",
      rating: 4.7,
      imageUrl: "/classic-chocolate-eclair.png",
      price: 299,
      isVeg: true,
      description:
        "Crisp choux pastry filled with rich chocolate cream and topped with chocolate glaze.",
    },
    {
      id: 3,
      name: "Strawberry Cheesecake",
      rating: 4.9,
      imageUrl: "/classic-strawberry-cheesecake.png",
      price: 549,
      isVeg: true,
      description:
        "Creamy cheesecake with a graham cracker crust topped with fresh strawberry compote.",
    },
    {
      id: 4,
      name: "Lemon Tart",
      rating: 4.6,
      imageUrl: "/bright-lemon-tart.png",
      price: 349,
      isVeg: true,
      description:
        "Buttery pastry shell filled with tangy lemon curd and dusted with powdered sugar.",
    },
    {
      id: 5,
      name: "Raspberry Macarons",
      rating: 4.8,
      imageUrl: "/vibrant-raspberry-macarons.png",
      price: 399,
      isVeg: true,
      description:
        "Delicate almond meringue cookies filled with raspberry buttercream.",
    },
    {
      id: 6,
      name: "Chocolate Chip Cookies",
      rating: 4.7,
      imageUrl: "/classic-chocolate-chip-cookies.png",
      price: 249,
      isVeg: true,
      description:
        "Classic cookies loaded with premium chocolate chips and baked to golden perfection.",
    },
    {
      id: 7,
      name: "Vanilla Cake",
      rating: 4.5,
      imageUrl: "/classic-vanilla-cake.png",
      price: 449,
      isVeg: true,
      description:
        "Light and fluffy vanilla sponge cake with smooth buttercream frosting.",
    },
    {
      id: 8,
      name: "Chocolate Brownie",
      rating: 4.9,
      imageUrl: "/decadent-chocolate-brownie.png",
      price: 299,
      isVeg: true,
      description:
        "Rich, fudgy chocolate brownie with a crackly top and gooey center.",
    },
    {
      id: 9,
      name: "Strawberry Cupcake",
      rating: 4.6,
      imageUrl: "/frosted-strawberry-cupcake.png",
      price: 279,
      isVeg: true,
      description:
        "Moist vanilla cupcake topped with strawberry buttercream and fresh strawberry.",
    },
    {
      id: 10,
      name: "Rustic Sourdough",
      rating: 4.7,
      imageUrl: "/rustic-loaf.png",
      price: 349,
      isVeg: true,
      description:
        "Artisanal sourdough bread with a crispy crust and chewy interior.",
    },
    {
      id: 11,
      name: "Chocolate Almond Cake",
      rating: 4.8,
      imageUrl: "/decadent-chocolate-almond-cake.png",
      price: 599,
      isVeg: true,
      description:
        "Rich chocolate cake with almond flour, topped with ganache and toasted almonds.",
    },
    {
      id: 12,
      name: "Celebration Cake",
      rating: 5.0,
      imageUrl: "/celebration-cake.png",
      price: 799,
      isVeg: true,
      description:
        "Festive layered cake with colorful sprinkles, perfect for special occasions.",
    },
  ];

  return (
    <div className="pb-10">
      <Header />
      <div className="min-h-screen relative bg-white dark:bg-gray-900 flex flex-col max-w-[1300px] mx-auto">
        <Hero />

        {/* Products Section */}
        <div className="mx-auto w-full">
          <section className="px-4 py-8 md:px-6 lg:px-8 flex-grow">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Popular Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  rating={product.rating}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  isVeg={product.isVeg}
                  description={product.description}
                />
              ))}
            </div>
          </section>

          {/* Why We Are Best Banner - Mobile/Tablet Version */}
          <div className="block lg:hidden px-4 md:px-6 py-6 md:py-8">
            <img
              src="/images/banner/footer/duchess-pastries banner-mobile.png"
              alt="Why we are the best"
              className="w-full rounded-3xl shadow-md"
            />
          </div>

          {/* Why We Are Best Banner - Desktop Version */}
          <div className="hidden lg:block px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/duchess-pastries-banner.png"
                alt="Why we are the best - Handcrafted fresh daily, delivered with care, affordable prices, and loved by thousands"
                width={1280}
                height={320}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Newsletter Subscription - only on home page - full width */}
          <div className="w-full">
            <NewsletterSubscription />
          </div>
        </div>
      </div>
    </div>
  );
}
