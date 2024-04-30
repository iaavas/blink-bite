import prisma from "../prisma/prisma-client";
import HttpException from "../models/http-exception.model";
import { Product } from "../models/product.model";
import multer from "multer";

export const addProduct = async (input: Product): Promise<Product> => {
  const name = input.name?.trim();
  const description = input.description?.trim();
  const price = parseFloat(input.price);
  const quantity = parseInt(input.quantity);
  const discount = parseInt(input.discount);
  const image = input.image;
  const unit = input.unit.trim();
  const category = input?.category.trim();
  const keyFeatures = input?.keyFeatures;

  if (!name) {
    throw new HttpException(422, { errors: { name: ["can't be blank"] } });
  }

  if (!description) {
    throw new HttpException(422, {
      errors: { description: ["can't be blank"] },
    });
  }

  if (!price) {
    throw new HttpException(422, { errors: { price: ["can't be blank"] } });
  }
  if (!image) {
    throw new HttpException(422, { errors: { image: ["can't be blank"] } });
  }

  if (!unit) {
    throw new HttpException(422, {
      errors: { "size or brand or color": ["can't be blank"] },
    });
  }

  const product = await prisma.Product.create({
    data: {
      name,
      category,
      price,
      image,
      discount,
      description,
      unit,
      quantity,
    },
  });
  console.log(product);

  return product;
};

export const getCurrentProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      image: true,
      keyFeatures: true,
      description: true,

      discount: true,
      quantity: true,

      unit: true,
    },
  });

  if (!product) {
    throw new HttpException(404, {});
  }

  return product;
};

export const deleteProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!product) {
    throw new HttpException(404, {});
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isDeleted: true,
    },
  });

  return product;
};

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      name: true,
      category: true,
      price: true,
      image: true,
      id: true,
      discount: true,
      quantity: true,
      description: true,

      unit: true,
    },
  });

  if (!products) {
    throw new HttpException(404, {});
  }

  return products;
};
export const getProductByCategories = async (query: string) => {
  console.log(query);
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
      category: query,
    },
    select: {
      name: true,
      category: true,
      price: true,
      image: true,
      id: true,
      discount: true,
      quantity: true,

      unit: true,
    },
  });

  if (!products) {
    throw new HttpException(404, {});
  }

  return products;
};

export const getAllCategories = async () => {
  const categories = await prisma.product
    .findMany({
      where: {
        isDeleted: false,
      },
      distinct: ["category"],
      select: {
        category: true,
      },
    })
    .then((products: any) => products.map((product: any) => product.category));

  if (!categories) {
    throw new HttpException(404, {});
  }

  return categories;
};

export const searchProducts = async (query: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false,
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        name: true,
        description: true,
        price: true,
        image: true,
        id: true,
        discount: true,
        unit: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!products || products.length === 0) {
      throw new Error("No products found matching the search query.");
    }

    return products;
  } catch (error) {
    console.error("Error in searching products:", error);
    throw new Error("Failed to search for products.");
  }
};

// export const login = async (userPayload: any) => {
//   const email = userPayload.email?.trim();
//   const password = userPayload.password?.trim();

//   if (!email) {
//     throw new HttpException(422, { errors: { email: ["can't be blank"] } });
//   }

//   if (!password) {
//     throw new HttpException(422, { errors: { password: ["can't be blank"] } });
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       email: true,
//       username: true,
//       password: true,
//     },
//   });

//   if (user) {
//     const match = await bcrypt.compare(password, user.password);

//     if (match) {
//       return {
//         email: user.email,
//         username: user.username,

//         token: generateToken(user),
//       };
//     }
//   }

//   throw new HttpException(403, {
//     errors: {
//       "email or password": ["is invalid"],
//     },
//   });
// };

// export const getCurrentUser = async (username: string) => {
//   const user = (await prisma.user.findUnique({
//     where: {
//       username,
//     },
//     select: {
//       email: true,
//       username: true,
//     },
//   })) as User;

//   return {
//     ...user,
//     token: generateToken(user),
//   };
// };

// export const updateUser = async (
//   userPayload: any,
//   loggedInUsername: string
// ) => {
//   const { email, username, password, image, bio } = userPayload;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.update({
//     where: {
//       username: loggedInUsername,
//     },
//     data: {
//       ...(email ? { email } : {}),
//       ...(username ? { username } : {}),
//       ...(password ? { password: hashedPassword } : {}),
//     },
//     select: {
//       email: true,
//       username: true,
//     },
//   });

//   return {
//     ...user,
//     token: generateToken(user),
//   };
// };
