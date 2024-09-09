import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ajaykumar_br/medium-common";
import z from "zod";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

// middleware
postRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
        error: "You are not logged in",
        });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      error: "You are not logged in",
    });
  }
});

postRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg: "Inputs not correct"
    })
  }
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({
      msg: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "server error",
    });
  }
});

postRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg: "Inputs not correct"
    })
  }

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Invalid",
    });
  }
});

postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(411);
    c.json({
      msg: "Invalid",
    });
  }
});

const idInput = z.string();

postRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const { success } = idInput.safeParse(id);
  if(!success) {
    c.status(411);
    return c.json({
      msg: "Inputs not correct"
    })
  }

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    c.json({
      msg: "Invalid",
    });
  }
});
