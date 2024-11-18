import { z } from "zod";

export default defineCachedEventHandler(async (event) => {
  try {
    const { asset: assetEncodedName, file: fileEncodedName } =
      await getValidatedRouterParams(
        event,
        z.object({
          asset: z.string().min(1),
          file: z.string().min(1),
        }).parse
      );
    const assetName = decodeURIComponent(assetEncodedName);
    const fileName = decodeURIComponent(fileEncodedName);
    const file = await useStorage('fs').getItemRaw(`${assetName}/${fileName}`)

    if (!file)
      throw createError({
        statusCode: 404,
        statusMessage: `${assetName}/${fileName} not found`,
      });

    setResponseHeaders(event, {
      "Cache-Control": "public, max-age=31552767",
      "X-Robots-Tag": "index, follow",
    });

    return file;
  } catch (error: any) {
    console.error('Route asset GET', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
}, { maxAge: 60 * 60 });
