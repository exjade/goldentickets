import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

function QRCodeGenerator({ data }) {
    return (
        <div className='bg-white-normal p-4 rounded-2xl'>
            <QRCode
                value={data}
                size={200}
            />
        </div>
    );
}


export default QRCodeGenerator;

QRCodeGenerator.propTypes = {
    data: PropTypes.string,
}