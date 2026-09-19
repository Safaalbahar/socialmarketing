import { PostStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { decryptToken } from "@/lib/auth/tokens";
import { prisma } from "@/lib/db/prisma";
import { getIntegration } from "@/lib/integrations/registry";

export async function POST(_request: Request, context: { params: Promise<{ postId: string }> }) {
  const { postId } = await context.params;

  const post = await prisma.socialPost.findUnique({
    where: { id: postId },
    include: { channel: true }
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  await prisma.socialPost.update({
    where: { id: post.id },
    data: { status: PostStatus.PUBLISHING, lastError: null }
  });

  try {
    const integration = getIntegration(post.provider);
    const result = await integration.publishPost({
      accessToken: decryptToken(post.channel.encryptedAccessToken),
      accountId: post.channel.externalAccountId,
      caption: post.caption,
      mediaUrls: post.mediaUrls
    });

    const updated = await prisma.socialPost.update({
      where: { id: post.id },
      data: {
        status: PostStatus.PUBLISHED,
        externalPostId: result.externalPostId,
        publishedAt: new Date()
      }
    });

    return NextResponse.json({ post: updated, providerResponse: result.raw });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown publish error.";

    await prisma.socialPost.update({
      where: { id: post.id },
      data: {
        status: PostStatus.FAILED,
        lastError: message
      }
    });

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
