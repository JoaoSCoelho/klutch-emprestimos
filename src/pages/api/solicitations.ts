import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { clientId } = req.query;

    if (!clientId) return res.status(400).send({ message: 'Missing props' })

    const solicitationsObject = (await database.ref('solicitations').get()).val()
    const solicitationsArray = Object.values(solicitationsObject).filter((solicitation: { clientId: number }) => solicitation.clientId + '' === clientId)
    const sortedSolicitations = solicitationsArray.sort((a: { id: number }, b: { id: number }) => b.id - a.id)

    res.status(200).json(sortedSolicitations)
  } else return res.status(404).send({ message: 'Not found' });
}