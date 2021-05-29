import styles from '../styles/components/RateTable.module.css'

export interface IInstallment {
  id: number,
  installments: number,
  installmentInterest: number,
  installmentValue: number,
  fullValue: number,
  comission: number
}

export interface IRateTableProps {
  name: string;
  installments: IInstallment[]
  className?: string;
}


export function RateTable({ name, installments, className }: IRateTableProps) {
  return (
    <table className={`${styles.container} ${className}`}>
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
          <tr key={installment.id} className={(installment.id === 1) && styles.selected}>
            <td>{installment.installments}</td>
            <td>{installment.installmentInterest}%</td>
            <td>R${installment.installmentValue.toFixed(2).replace('.', ',')}</td>
            <td>R${installment.fullValue.toFixed(2).replace('.', ',')}</td>
            <td>R${installment.comission.toFixed(2).replace('.', ',')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}