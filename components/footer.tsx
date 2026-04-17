import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-20">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4 flex flex-col items-center text-center md:items-start md:text-left">
          
          <Image
            src="/logo.png"
            alt="Kitchen Utensils"
            width={120}
            height={40}
          />

          <h2 className="text-2xl font-black tracking-tighter text-white">
            Kitchen <span className="text-[#C78238]">Utensils</span>
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop destination for the latest kitchen utensils and accessories.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            
            <span className="cursor-pointer rounded-full bg-[#C78238] p-2 hover:bg-[#a76b2a] transition">
              <Image src="/fb.png" alt="Facebook" width={20} height={20} />
            </span>

            <span className="cursor-pointer rounded-full bg-[#C78238] p-2 hover:bg-[#a76b2a] transition">
              <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
            </span>

          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/shop" className="hover:text-[#C78238] transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-[#C78238] transition">About</Link></li>
            <li><Link href="/categories" className="hover:text-[#C78238] transition">Categories</Link></li>
            <li><Link href="/contact" className="hover:text-[#C78238] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="hover:text-[#C78238] cursor-pointer">Help Center</li>
            <li className="hover:text-[#C78238] cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-[#C78238] cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#C78238] cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get special offers and news.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C78238]"
            />

            <button className="bg-[#C78238] hover:bg-[#a76b2a] text-white px-4 py-2 rounded-lg font-bold text-sm transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
        <p>© 2026 Kitchen Utensils. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;