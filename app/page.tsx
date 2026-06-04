import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/hero";
import { getProducts } from "@/sanity/lib/getProducts";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import ProductGrid from "@/components/productGrid";
const categories = ["kitchen", "electronics", "accessories"];

type Product = {
  slug: string;
  imageUrl: string;
  name: string;
  price: string | number;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-[#DAE2E9]">
      <Hero />
      <ChatWidget />
      {/* sanity */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="flex gap-4 flex-wrap mb-6">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <button className="px-4 py-2 bg-[#C78238] text-white rounded-full capitalize">
                {cat}
              </button>
            </Link>
          ))}
        </div>        
          {/* Our Products */}
         <ProductGrid products={products} urlFor={urlFor} />
       
      </div>
    </div>
  );
}
