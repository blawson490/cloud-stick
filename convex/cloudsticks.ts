import {
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";

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

export const createCloudStick = mutation({
  args: {
    name: v.string(),
    expiration: v.string(),
    size: v.number(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this org");
    }

    const now = Date.now();
    const expirationMap = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };

    const expirationTime =
      expirationMap[args.expiration as keyof typeof expirationMap];
    if (!expirationTime) {
      throw new ConvexError("Invalid expiration time");
    }

    const expiresAt = now + expirationTime;

    await ctx.db.insert("cloudSticks", {
      ownerId: user.user._id,
      name: args.name,
      createdAt: now,
      updatedAt: now,
      expiresAt: expiresAt,
      isInVault: false,
      accessType: "email",
      accessPassword: undefined,
      sharedWith: [],
      publicLink: undefined,
      size: args.size,
    });
  },
});

export const getCloudSticks = query({
  args: {
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this stick");
    }

    let sticks = await ctx.db
      .query("cloudSticks")
      .withIndex("by_owner", (q) => q.eq("ownerId", user.user._id))
      .collect();

    const query = args.query;

    if (query) {
      if (query != "skip") {
        sticks = sticks.filter((stick) =>
          stick.name.toLowerCase().includes(query.toLowerCase())
        );
      }
    }
    return sticks;
  },
});

export const getCloudStickById = query({
  args: {
    id: v.id("cloudSticks"),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx);
    if (!user) {
      throw new ConvexError("You do not have access to this stick");
    }

    return await ctx.db.get(args.id);
  },
});
