import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IInstallment, ITable } from "../components/RateTable";
import { IClient } from "../pages/search-client";
import { IModality } from '../pages/modality'
import { ICard } from "../pages/card-data";
import { IContractType } from "../pages/confirm-data";



export interface ILoanContextData {
  rateTable?: ITable;
  setRateTable?: Dispatch<SetStateAction<ITable>>
  installment?: IInstallment;
  setInstallment?: Dispatch<SetStateAction<IInstallment>>
  desiredValue?: number;
  setDesiredValue?: Dispatch<SetStateAction<number>>
  client?: IClient;
  setClient?: Dispatch<SetStateAction<IClient>>
  modality?: IModality
  setModality?: Dispatch<SetStateAction<IModality>>
  card?: ICard;
  setCard?: Dispatch<SetStateAction<ICard>>
  contractType?: IContractType;
  setContractType?: Dispatch<SetStateAction<IContractType>>
}

export const LoanContext = createContext<ILoanContextData>({});

export interface ILoanProviderProps {
  children: ReactNode;
}

export function LoanProvider({ children }: ILoanProviderProps) {
  const [rateTable, setRateTable] = useState<ITable>();
  const [installment, setInstallment] = useState<IInstallment>();
  const [desiredValue, setDesiredValue] = useState<number>();
  const [client, setClient] = useState<IClient | null>();
  const [modality, setModality] = useState<IModality>();
  const [card, setCard] = useState<ICard>();
  const [contractType, setContractType] = useState<IContractType>('AUTOMATIC')

  return (
    <LoanContext.Provider value={{
      desiredValue,
      installment,
      rateTable,
      client,
      modality,
      card,
      contractType,
      setDesiredValue,
      setInstallment,
      setRateTable,
      setClient,
      setModality,
      setCard,
      setContractType
    }}>
      {children}
    </LoanContext.Provider>
  );
}