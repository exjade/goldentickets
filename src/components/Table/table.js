import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/table.module.css';
import { format } from 'date-fns'

const Table = ({
  item,
}) => {

  const cadena = item.sellerCode;
  const resultado = cadena.match(/-(.*)$/)[1];

  return (
    <div className={`${styles.container}`} >
      <table className={`${styles.wrapper}`} >

        <thead className={`${styles['table-header']}`}>
          <tr className={`${styles['table-header-row']}`}>
            <th>Fecha</th>
            <th className='hidden md:inline'>id</th>
            <th className='hidden md:inline'>Usuario</th>
            <th>#</th>
            <th>Costo</th>
            <th>Comisión</th>
          </tr>
        </thead>

        <tbody className={`${styles['table-body']}`}>
          <tr className={`${styles['table-body-row']}`}>
            <td>
              {format(new Date(item.purchaseDate), 'dd/MM/yyyy')}
            </td>
            <td className='hidden md:inline'>
              {item.id}
            </td>
            <td className='hidden md:inline'>
              {item.username}
            </td>
            <td>
              {item.numeroTicket}
            </td>
            <td>
              {item.costoTicket}
            </td>
            <td>
              {parseFloat(item.costoTicket * 0.2)?.toFixed(2)}
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  )
}

export default Table

Table.propTypes = {
  item: PropTypes.object,
}


/* 
4. **Historial de ventas** 
    1. Fecha
    2. Numero de ticket
    3. Código de vendedor
    4. Nombre de usuario
    5. Id de ticket
    6. Costo de ticket
    7. Comisión por ticket
*/