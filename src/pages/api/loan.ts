import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import api from '../../services/api.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      clientId,
      installmentInterest,
      installmentInterestValue,
      comission,
      comissionValue,
      cardExpiration,
      installmentValue,
      cardNumber,
      cardCvc,
      desiredValue,
      totalLoan,
      installmentId,
      rateTableId,
      contractType
    } = req.body;

    if (
      !clientId ||
      !installmentInterest ||
      !installmentInterestValue ||
      !comission ||
      !comissionValue ||
      !cardExpiration ||
      !installmentValue ||
      !cardNumber ||
      !cardCvc ||
      !desiredValue ||
      !totalLoan ||
      !installmentId ||
      !rateTableId ||
      !contractType
    ) return res.status(400).send({ message: "Missing props!" })

    api.solicitations.push({
      id: api.solicitations.length + 1,
      clientId,
      installmentInterest,
      installmentInterestValue,
      comission,
      comissionValue,
      cardExpiration,
      installmentValue,
      cardNumber,
      cardCvc,
      desiredValue,
      totalLoan,
      installmentId,
      rateTableId,
      contractType,
      timestamp: Date.now()
    })

    fs.writeFileSync(__dirname + '/../../services/api.json', JSON.stringify(api, null, 2))

    res.status(201).json({ solicitationID: api.solicitations.length })
  } else return res.status(404).send({ message: 'Not found' });
}