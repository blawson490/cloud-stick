import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    subscriptionTier: v.string(), // "free", "basic", "pro"
    storageUsed: v.number(),
    storageLimit: v.number(),
    activeSticks: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_tokenIdentifier", ["tokenIdentifier"]),

  cloudSticks: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    expiresAt: v.number(),
    isInVault: v.boolean(),
    accessType: v.string(), // "email" or "link"
    accessPassword: v.optional(v.string()),
    sharedWith: v.array(v.string()), // array of email addresses
    publicLink: v.optional(v.string()),
    size: v.number(),
  }).index("by_owner", ["ownerId"]),

  files: defineTable({
    stickId: v.id("cloudSticks"),
    name: v.string(),
    size: v.number(),
    type: v.string(),
    uploadedAt: v.number(),
    uploadedBy: v.id("users"),
    fileId: v.id("_storage"),
  }).index("by_stick", ["stickId"]),

  accessLogs: defineTable({
    stickId: v.id("cloudSticks"),
    accessedBy: v.union(v.id("users"), v.string()), // user ID or IP address
    accessedAt: v.number(),
    action: v.string(), // "viewed" or "downloaded"
    device: v.string(),
  }).index("by_stick", ["stickId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    plan: v.string(), // "free", "basic", "pro"
    startDate: v.number(),
    endDate: v.number(),
    isActive: v.boolean(),
    paymentMethod: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
