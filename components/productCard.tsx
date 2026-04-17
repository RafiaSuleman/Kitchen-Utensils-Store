import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      
      <Image
        src={image}
        alt={name}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300"
      />

      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      <p className="text-gray-600 mb-4">{price}</p>

      <Link
        href={`/products/${id}`}
        className="bg-[#c78238] text-white px-4 py-2 rounded-md hover:bg-[#915719] inline-block"
      >
        Buy Now
      </Link>
      
    </div>
  );
};

export default ProductCard;