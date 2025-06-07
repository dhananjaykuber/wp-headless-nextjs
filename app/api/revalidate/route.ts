// Next.js dependencies
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const secret = request.headers.get('x-webhook-secret');

        const { contentType, contentId } = body;

        if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
            console.error(`Invalid webhook secret: ${secret}`);

            return NextResponse.json(
                { error: 'Invalid webhook secret' },
                { status: 401 }
            );
        }

        revalidatePath('/', 'layout');

        console.log(
            `Revalidation successful for content type: ${contentType} & ID: ${contentId}`
        );

        return NextResponse.json(
            {
                message: `Revalidation successful for content type: ${contentType} & ID: ${contentId}`,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            `Revalidation failed: ${
                error instanceof Error ? error.message : error
            }`
        );

        return NextResponse.json(
            { error: 'Revalidation failed' },
            { status: 500 }
        );
    }
};

export { POST };
