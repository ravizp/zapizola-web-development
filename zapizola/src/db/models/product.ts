import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  thumbnail: string;
  price: number;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductModelCreateInput = Omit<ProductModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "zapizola";

const COLLECTION_PRODUCT = "Products";

export const getDb = async () => {
  const client = await getMongoClientInstance();

  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getProducts = async () => {
  const db = await getDb();

  const products = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .toArray()) as ProductModel[];

  return products;
};

export const getProductsBySlug = async (slug: string) => {
  const db = await getDb();

  const product = (await db.collection(COLLECTION_PRODUCT).findOne({
    slug,
  })) as ProductModel;

  return product;
};

export const getProductById = async (Id: string) => {
  const db = await getDb();

  const product = (await db.collection(COLLECTION_PRODUCT).findOne({
    _id: new ObjectId(Id),
  })) as ProductModel;

  return product;
};

export const paginationProducts = async (limit: number) => {
  const db = await getDb();

  if (!limit) {
    limit = 10;
  }

  const productLimit = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .limit(limit)
    .toArray()) as ProductModel[];

  return productLimit;
};

// New search function for product names
export const searchProductsByName = async (query: string, limit: number) => {
  const db = await getDb();
  return await db
    .collection(COLLECTION_PRODUCT)
    .find({ name: { $regex: query, $options: "i" } }) // Case-insensitive search
    .limit(limit)
    .toArray() as ProductModel[];
};

// export const createProduct = async (product: ProductModelCreateInput) => {
//   const newProduct: ProductModelCreateInput = {
//     ...product,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     slug: `${product.name
//       .toLowerCase()
//       .replace(/ /g, "-")}-${Date.now()}`, // Mengganti `replaceAll` dengan `replace`, dan `Date.now()` untuk format slug yang lebih sederhana
//   };

//   const db = await getDb();
//   const result = await db.collection(COLLECTION_PRODUCT).insertOne(newProduct);

//   return result;
// };
