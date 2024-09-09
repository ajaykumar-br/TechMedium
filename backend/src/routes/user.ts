import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@ajaykumar_br/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg: "Inputs not correct"
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    return c.json({
      msg: "Invalid",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg: "Inputs not correct"
    })
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!findUser) {
      return c.json({
        msg: "user not found",
      });
    }

    const jwt = await sign(
      {
        id: findUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }
});
