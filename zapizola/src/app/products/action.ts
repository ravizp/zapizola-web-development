"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MyResponse } from "../api/products/route";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export const handleAddWishlist = async (productId: ObjectId) => {
  const response = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });

  const responseJson: MyResponse<unknown> = await response.json();

  if (!response.ok) {
    const message = responseJson.error ?? "Something went wrong! Contact Our Admin";
    redirect(`/products?error=${message}`);
  }

  revalidatePath("/wishlist");
  redirect("/wishlist");
};

