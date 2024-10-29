import Link from "next/link";
import { ProductModel } from "../db/models/product";
import { cookies } from "next/headers";

//import component\\
import Navbar from "../components/Navbar";
import { MyResponse } from "./api/products/route";
import Card from "../components/Card";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import NavbarAfterLogin from "../components/NavbarAfterLogin";

const fetchProducts = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const responseJson: MyResponse<ProductModel[]> = await response.json();

  if (!response.ok) {
    throw new Error("Something Wrong!, Contact Our Admin");
  }

  return responseJson;
};

export default async function Home() {
  const token = cookies().get("token");

  const products = await fetchProducts();
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* navbar */}
        {token ? <NavbarAfterLogin /> : <Navbar />}

        <main className="container mx-auto px-4 py-12">
          {/* Banner */}
          <Banner />

          <div className="text-center mb-12">
            <div className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm mb-4">
              property by Zapizola
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Foundation for your commerce platform
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Zapizola is an open-source platform for building and customizing
              your own commerce platform with ease.
            </p>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured products</h2>
            </div>
            <p className="text-gray-400">
              Explore products from around the world
            </p>
          </div>

          <div className="grid grid-cols-5 justify-center m-8">
            {products.data?.splice(0, 5).map((prod) => (
              <Card product={prod} key={prod.slug} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link href={"/products"}>
              <button className="m-4 border hover:bg-gray-50 text-white font-light py-2 px-4 rounded-full">
                See All
              </button>
            </Link>
          </div>
        </main>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
