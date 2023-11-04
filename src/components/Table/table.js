import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/table.module.css';
import { format } from 'date-fns';

const Table = ({ headers, data }) => {
  const getCellValue = (item, header) => {
    switch (header.key) {
      case 'purchaseDate':
        return format(new Date(item[header.key]), 'dd/MM/yyyy');
      case 'costoTicket':
        return item[header.key].toFixed(2);
      case 'comisionTicket':
        return (parseFloat(item.costoTicket) * 0.2).toFixed(2);
      default:
        return item[header.key];
    }
  };

  return (
    <div className={`${styles.container}`}>
      <table className={`${styles.wrapper}`}>
        <thead className={`${styles['table-header']}`}>
          <tr className={`${styles['table-header-row']}`}>
            {headers.map((header) => (
              <th
                key={header.key}
                className={` ${header.hidden && 'hidden md:inline'}`}
              >{header.label}</th>
            ))}
          </tr>
        </thead>

        <tbody className={`${styles['table-body']}`}>
          {data.map((item, index) => (
            <tr key={index} className={`${styles['table-body-row']}`}>
              {headers.map((header) => (
                <td
                  key={header.key}
                  className={` ${header.hidden && 'hidden md:inline'}`}
                >
                  {getCellValue(item, header)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
