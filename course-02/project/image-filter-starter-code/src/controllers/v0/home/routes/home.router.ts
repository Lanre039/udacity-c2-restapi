import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";

const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
router.get("/", async (req: Request, res: Response) => {
  let { image_url } = req.query;
  // 1
  if (!image_url) {
    return res.status(400).send(`Image Url is required`);
  }

  // 2. call filterImageFromURL(image_url) to filter the image
  try {
    const filePath = await filterImageFromURL(image_url as string);

    // 4. deletes any files on the server on finish of the response
    setTimeout(() => {
      deleteLocalFiles([filePath]);
    }, 2000);

    // 3. send the resulting file in the response
    return res.status(200).sendFile(filePath);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export const HomeRouter: Router = router;
