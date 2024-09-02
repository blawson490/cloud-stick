import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("you must be logged in to upload a file");
  }

  return await ctx.storage.generateUploadUrl();
});

export async function getUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();
  if (!user) {
    return null;
  }
  return { user };
}

export const createFile = mutation({
  args: {
    stickId: v.id("cloudSticks"),
    name: v.string(),
    size: v.number(),
    type: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this org");
    }

    const stick = await ctx.db.get(args.stickId);
    if (!stick) {
      throw new ConvexError("CloudStick not found");
    }

    if (stick.ownerId !== user.user._id) {
      throw new ConvexError("You do not have access to this CloudStick");
    }

    const now = Date.now();

    await ctx.db.insert("files", {
      stickId: args.stickId,
      name: args.name,
      size: args.size,
      type: args.type,
      uploadedAt: now,
      uploadedBy: user.user._id,
      fileId: args.fileId,
    });
  },
});

export const getFiles = query({
  args: {
    stickId: v.id("cloudSticks"),
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this file");
    }

    const stick = await ctx.db.get(args.stickId);
    if (!stick) {
      throw new ConvexError("CloudStick not found");
    }

    if (stick.ownerId !== user.user._id) {
      throw new ConvexError("You do not have access to this CloudStick");
    }

    let files = await ctx.db
      .query("files")
      .withIndex("by_stick", (q) => q.eq("stickId", args.stickId))
      .collect();

    const query = args.query;
    if (query) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return files;
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this file");
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("File not found");
    }

    const stick = await ctx.db.get(file.stickId);
    if (!stick) {
      throw new ConvexError("CloudStick not found");
    }

    if (stick.ownerId !== user.user._id) {
      throw new ConvexError("You do not have access to this file");
    }

    await ctx.db.delete(args.fileId);
  },
});

export const updateFileName = mutation({
  args: {
    fileId: v.id("files"),
    newName: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this org");
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("File not found");
    }

    const stick = await ctx.db.get(file.stickId);
    if (!stick) {
      throw new ConvexError("CloudStick not found");
    }

    if (stick.ownerId !== user.user._id) {
      throw new ConvexError("You do not have access to this file");
    }

    await ctx.db.patch(args.fileId, { name: args.newName });
  },
});
