import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { loanId } = req.query;

    const loan = (await database.ref('solicitations/' + loanId).get()).val()

    if (!loan) return res.status(404).send({ message: 'Not found' })

    res.status(200).json(loan)
  } else return res.status(404).send({ message: 'Not found' });
}