import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import api from '../../../services/api.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { loanId } = req.query;

    const loan = api.solicitations.find((solicitation) => solicitation.id + '' === loanId)

    if (!loan) return res.status(404).send({ message: 'Not found' })

    res.status(200).json(loan)
  } else return res.status(404).send({ message: 'Not found' });
}