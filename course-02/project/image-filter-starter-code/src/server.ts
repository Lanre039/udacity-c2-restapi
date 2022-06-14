import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/filteredimage", async (req: Request, res: Response) => {
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

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
