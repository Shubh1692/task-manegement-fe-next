import { NextApiRequest, NextApiResponse } from 'next';

export default async function callAdultComplimentAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { pathname, ...rest } = req.query;
    pathname = atob(pathname as string);
    pathname = decodeURIComponent(pathname)
    const url = `${process.env.API_URL}${pathname}${Object.keys(rest).length ? `?${new URLSearchParams(rest as any).toString()}` : ''}`;
    const response = await fetch(url, {
      method: req.method,
      ...(req.method === 'GET' ? {

      } : {
        body: JSON.stringify(req.body || {}),
      }),
      headers: {
        Accept: 'application/json',
        'CONTENT-TYPE': 'application/json'
      }
    });
    const data = await response.json();
    // Return the data from the external API
    return res.status(data?.statusCode || 200).json(data);
  } catch (e) {
    res.statusMessage = (e as Error).message;
    res.status(500).end();
  }
}