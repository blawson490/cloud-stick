import { internalMutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
    email: v.string(),
    subscriptionTier: v.string(),
    storageUsed: v.number(),
    storageLimit: v.number(),
    activeSticks: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      name: args.name,
      image: args.image,
      email: args.email,
      subscriptionTier: args.subscriptionTier,
      storageUsed: args.storageUsed,
      storageLimit: args.storageLimit,
      activeSticks: args.activeSticks,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
      email: args.email,
    });
  },
});

export const deleteUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    await ctx.db.delete(user._id);
  },
});
