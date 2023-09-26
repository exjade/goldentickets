import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../../../lib/firebase'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)


const ModifyUser = ({
    closeModal,
    docId,
    setRol,
    rol,
    setSuccess,
    success,
    username
}) => {

    const handleOnChange = (e) => {
        setRol(e.target.value)
    }

    const updateUserInformation = async () => {
        try {
            const userRef = doc(firestore, 'users', docId)
            await updateDoc(userRef, {
                rol: rol
            })
            setSuccess('User rol successfully')
            setTimeout(() => {
                setSuccess('')
                closeModal()
            }, 1000);

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div>
            <div className="py-12 bg-white-normal transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white-normal shadow-md rounded border border-gray-400">
                        <span className='flex flex-row justify-center items-center'>
                        <h1 className="text-gray-800 text-2xl font-bold tracking-normal leading-tight mb-4">User:  </h1>
                        <p className='ml-3 text-2xl font-semibold tracking-normal leading-tight mb-4'>{username}</p>
                        </span>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            What's the new rol?
                        </label>
                        <input
                            id="name"
                            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                            placeholder="Rols: Investor, Sponsored, Admin, Owner"
                            list='rols'
                            onChange={handleOnChange}
                            name="rol"
                        />

                        <datalist id='rols'>
                            <option>choose ...</option>
                            <option value='investor'>Investor</option>
                            <option value='sponsored'>Sponsored</option>
                            <option value='admin'>Admin</option>
                            <option value='owner'>Owner</option>
                        </datalist>
                        {
                            success && (
                                <div className="text-sm text-green-success">
                                    {success}
                                </div>
                            )
                        }
                        <div className="flex items-center justify-start w-full">
                            <button
                                className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                                onClick={() => updateUserInformation()}
                            >Submit
                            </button>
                            <button
                                className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                onClick={() => closeModal()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModifyUser;

ModifyUser.propTypes = {
    closeModal: PropTypes.func,
    docId: PropTypes.string,
    rol: PropTypes.string,
    setRol: PropTypes.func,
    setSuccess: PropTypes.func,
    success: PropTypes.any,
    username: PropTypes.string
}