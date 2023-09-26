import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SelectCurrency = ({ handleOnChange }) => {
    const { t } = useTranslation()
    return (
        <select
            className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            name="currencies"
            onChange={handleOnChange}
        >
            <option value="">
                {t('Select_an_option')}
            </option>
            <option value='TETHER'
            >
                {t('TETHER_(USDT)')}
            </option>
        </select>

    );
};
export default SelectCurrency;
SelectCurrency.propTypes = {
    handleOnChange: PropTypes.func.isRequired
}