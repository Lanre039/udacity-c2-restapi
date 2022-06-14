import { Router, Request, Response } from "express";
import { HomeRouter } from "../v0/home/routes/home.router";

const router: Router = Router();

router.use("/filteredimage", HomeRouter);

router.get("/", async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
