const { randomUUID } = require('crypto');

export const onRequestPost = async ({ request, env }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
        return new Response('No file uploaded.', { status: 400 });
    }

    const id = randomUUID();
    const key = `${id}.zip`;

    const arrayBuffer = await file.arrayBuffer();
    const object = await env.CODEWRD_BUCKET.put(key, arrayBuffer, {
        httpMetadata: {
            contentType: "application/zip"
        }
    });

    return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" }
    });
};
