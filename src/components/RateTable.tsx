import styles from '../styles/components/RateTable.module.css'

export interface IInstallment {
  id: number,
  installments: number,
  installmentInterest: number,
  installmentValue: number,
  fullValue: number,
  comission: number
}

export interface ITable {
  id: number;
  name: string;
  installments: IInstallment[];
}

export interface IRateTableProps extends ITable {
  className?: string;
  disabled?: boolean;
  onSelect?: (installmentID: number) => any;
  selectedInstallmentID?: number;
}

export function RateTable({ name, installments, className, disabled, onSelect, selectedInstallmentID }: IRateTableProps) {
  return (
    <table className={`
      ${styles.container}
      ${className}
      ${disabled && styles.disabled}
    `}>
      <thead>
        <tr>
          <th colSpan={5}>{name}</th>
        </tr>
        <tr>
          <th>Parcela</th>
          <th>Juros da Parcela</th>
          <th>Valor Parcela</th>
          <th>Valor Total</th>
          <th>Comissão Parceiro</th>
        </tr>
      </thead>

      <tbody>
        {installments.map((installment) => (
          <tr
            key={installment.id}
            className={`${(installment.id === selectedInstallmentID) && styles.selected}`}
            onClick={() => !disabled && onSelect && onSelect(installment.id)}
          >
            <td>{installment.installments}</td>
            <td>{installment.installmentInterest}%</td>
            <td>R${installment.installmentValue.toFixed(2).replace('.', ',')}</td>
            <td>R${installment.fullValue.toFixed(2).replace('.', ',')}</td>
            <td>R${(installment.fullValue - (installment.fullValue / (1 + installment.comission / 100))).toFixed(2).replace('.', ',')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}