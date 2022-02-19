import type { NextApiRequest, NextApiResponse } from 'next';

export interface IGetCardsResponse {
  collected: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IGetCardsResponse>) {
  res.status(200).json({
    collected: ['94F75844-01D4-4BF7-9593-23D5A253FBCA']
  });
}
