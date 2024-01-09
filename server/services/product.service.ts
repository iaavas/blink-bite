import prisma from "../prisma/prisma-client";
import HttpException from "../models/http-exception.model";
import { Product } from "../models/product.model";

export const addProduct = async (input: Product): Promise<Product> => {
  const name = input.name?.trim();
  const description = input.description?.trim();
  const price = input.price;
  const image = input.image?.trim();
  const color = input.color.trim();
  const size = input.size.trim();
  const brand = input.brand.trim();
  const quantity = input?.quantity;

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

  if (!size || !brand || !color) {
    throw new HttpException(422, {
      errors: { "size or brand or color": ["can't be blank"] },
    });
  }

  const product = await prisma.Product.create({
    data: {
      name,
      description,
      price,
      image,
      color,
      brand,
      size,
      quantity,
    },
  });

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
      description: true,
      image: true,
      price: true,
      color: true,
      brand: true,
      size: true,
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
      description: true,
      price: true,
      image: true,
      id: true,
    },
  });

  if (!products) {
    throw new HttpException(404, {});
  }

  return products;
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
