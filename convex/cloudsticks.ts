import {
  internalMutation,
  mutation,
  MutationCtx,
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
