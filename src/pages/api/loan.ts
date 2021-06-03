import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import api from '../../services/api.json'
import { database } from '../../firebase';

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
      contractType,
      cardImageFrontURL,
      cardImageBackURL,
      cardImageSelfieURL
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

    const now = Date.now()

    await database.ref('solicitations/' + now).set(
      {
        id: now,
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
        timestamp: now,
        cardImageFrontURL: cardImageFrontURL || null,
        cardImageBackURL: cardImageBackURL || null,
        cardImageSelfieURL: cardImageSelfieURL || null
      }
    )

    res.status(201).json({ solicitationID: now })
  } else return res.status(404).send({ message: 'Not found' });
}