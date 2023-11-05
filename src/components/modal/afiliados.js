import React from 'react'
import PropTypes from 'prop-types'

const AfiliadosModal = ({
    newBalance,
    setNewBalance,
    afiliadoID,
    setOpenModal,
    handleUpdateBalance
}) => {
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black-normal bg-opacity-50 py-10">
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white-normal">
                <div className="w-full">
                    <div className="m-8 my-20 max-w-[400px] mx-auto">
                        <div className="mb-8">
                            <h1 className="mb-4 text-3xl font-extrabold">Saldo de afilliado</h1>
                            <p className="text-gray-600">Aquí puedes añadir saldo a la cuenta de un afiliado! :)</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="number"
                                value={newBalance}
                                onChange={(e) => setNewBalance(parseFloat(e.target.value))}
                                className="p-3 bg-black w-full rounded-md border border-gray-primary font-semibold"
                            />
                            <button
                                type='button'
                                className="p-3 bg-white border rounded-full w-full font-semibold hover:bg-green-primary hover:text-white-normal"
                                onClick={() => handleUpdateBalance(afiliadoID, newBalance)}
                            >
                                Actualizar
                            </button>
                            <button
                                type='button'
                                className="p-3 bg-pink-primary border rounded-full w-full text-white-normal font-semibold"
                                onClick={() => setOpenModal(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AfiliadosModal

AfiliadosModal.propTypes = {
    newBalance: PropTypes.number,
    setNewBalance: PropTypes.func,
    afiliadoID: PropTypes.string,
    setOpenModal: PropTypes.func,
    handleUpdateBalance: PropTypes.func,
}