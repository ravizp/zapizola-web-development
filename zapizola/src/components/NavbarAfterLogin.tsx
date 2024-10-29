"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Rabbit, Heart } from "lucide-react";
import { Button } from "./Button";
import { handleFormLogout } from "@/app/types";
import { ProductModel } from "@/db/models/product";
import { Input } from "./Input";

export default function NavbarAfterLogin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      try {
        const response = await fetch(`/api/products?query=${query}`);
        const result = await response.json();
        setSearchResults(result.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLogout = async () => {
    await handleFormLogout();
    router.push("/login");
  };

  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Rabbit />
        <Link href="/" className="text-xl font-bold">
          Zapizola
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/about" className="flex items-center">
            About
          </Link>
          <Link href="/products" className="flex items-center">
            Collections
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-gray-800 rounded-md relative">
          <Input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="bg-transparent border-none text-white placeholder-gray-400 pr-8"
          />
          <Search className="absolute right-2 h-5 w-5 text-gray-400 pointer-events-none" />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {searchResults.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.name}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/wishlist" className="relative">
          <Heart className="h-6 w-6 text-gray-400" />
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-sm text-gray-400 hover:text-white">
          Logout
        </Button>
      </div>
    </header>
  );
}
