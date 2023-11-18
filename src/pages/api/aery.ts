import type { NextApiRequest, NextApiResponse } from "next";
import header from "~/table/aery/header.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = header;
  res.status(200).json(data);
}
