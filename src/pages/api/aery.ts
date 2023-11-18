import type { NextApiRequest, NextApiResponse } from "next";
import header from "public/table/aery/header.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  header["data_url"] = "/api/aery/data";
  res.status(200).json(header);
}
