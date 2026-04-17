"use client";
import { useCartStore } from "@/app/store/cartStore";

interface Product {
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function AddToCartBtn({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
   
    <button 
      onClick={handleAdd}
      className="flex-1 border-2 border-gray-200 bg-[#C78238] text-white py-4 rounded-2xl font-bold hover:bg-[#B87328] transition-all text-lg active:scale-95"
    >
      Add to Cart
    </button>
  );
}