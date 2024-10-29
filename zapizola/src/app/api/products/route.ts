import { ProductModel, paginationProducts, searchProductsByName } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data: T;
  error?: string;
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "10");
  const query = searchParams.get("query") || ""; // Get the search query

  let products: ProductModel[];
  if (query) {
    // Use a search function when there is a query
    products = await searchProductsByName(query, limit);
  } else {
    products = await paginationProducts(limit);
  }

  return NextResponse.json<MyResponse<ProductModel[]>>(
    {
      statusCode: 200,
      message: "Fetched products",
      data: products,
    },
    { status: 200 }
  );
};

