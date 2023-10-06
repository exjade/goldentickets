import React from 'react';
import styles from './css/policy.module.css';
import Error from '../../error/error';
import Header from '../../components/Header/dashboard';
import LandingHeader from '../../components/Header/landing';
import useAuthListener from '../../hooks/use-auth-listener';
import useDropDown from '../../hooks/use-dropdown';
import useModal from '../../hooks/use-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/footer/footer';
import Timeline from '../../components/timeline';

const Terms = () => {


  const { open, openModal, closeModal } = useModal()
  const { user } = useAuthListener()
  const {
    dropdown,
    setDropdown,
    closeDropdown,
    openDropdown,
  } = useDropDown()

  return (

    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {
          user?.uid === undefined || user?.uid === null ? (
            <Error>
              <LandingHeader />
            </Error>
          ) :
            (
              <Error>
                <Header
                  openModal={openModal}
                  dropdown={dropdown}
                  closeDropdown={closeDropdown}
                  openDropdown={openDropdown}
                />
              </Error>
            )
        }

        <Error>
          <Timeline
            open={open}
            closeModal={closeModal}
            setDropdown={setDropdown}
            dropdown={dropdown}
          />
        </Error>

        <div className={`${styles.container}`} >
          <div className={`${styles.wrapper}`} >

            <h2 >Términos de Servicio de Goldentickets.club</h2>

            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                1. Aceptación de los Términos
              </p>
              <br />
              <p>
                Al acceder o utilizar la aplicación Goldentickets.club, aceptas cumplir con estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices la aplicación.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                2. Uso de la Aplicación
              </p>
              <br />
              <p>
                2.1 Registro de Cuenta: Para acceder a ciertas funciones de la aplicación, es posible que debas registrarte y crear una cuenta. Al hacerlo, garantizas que la información proporcionada durante el proceso de registro es precisa y actualizada.
              </p>
              <br />

              <p>
                2.2 Requisitos de Edad: Debes tener al menos la edad legal para participar en las actividades ofrecidas por la aplicación según las leyes de tu jurisdicción.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                3. Compra de Boletos y Participación en Eventos
              </p>
              <br />
              <p>
                3.1 Compra de Boletos: Al comprar boletos a través de la aplicación, aceptas los términos y condiciones específicos de cada evento, así como las reglas y regulaciones aplicables.
              </p>
              <br />

              <p>
                3.2 Responsabilidad Financiera: Eres responsable de cualquier transacción financiera realizada a través de la aplicación, incluida la compra de boletos y participación en eventos.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                4. Responsabilidades y Obligaciones de la Aplicación
              </p>
              <br />
              <p>
                4.1 Operación de la Plataforma: Nos esforzamos por garantizar la operación continua y segura de la aplicación. Sin embargo, no podemos garantizar la ausencia de interrupciones, errores o problemas técnicos.
              </p>
              <br />
              <p>
                4.2 Modificaciones y Actualizaciones: Nos reservamos el derecho de realizar modificaciones o actualizaciones en la aplicación, incluyendo cambios en los términos y condiciones, sin previo aviso.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                5. Limitaciones de Responsabilidad
              </p>
              <br />
              <p>
                No nos hacemos responsables de pérdidas, daños o gastos que puedan surgir como resultado del uso de la aplicación, incluida la participación en eventos.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                6. Propiedad Intelectual
              </p>
              <br />
              <p>
                La aplicación y su contenido están protegidos por derechos de propiedad intelectual. No tienes derecho a reproducir, distribuir o modificar ningún contenido de la aplicación sin autorización.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                7. Privacidad
              </p>
              <br />
              <p>
                El uso de la aplicación está sujeto a nuestra Política de Privacidad, que puedes revisar <a href="/policy" className='text-white-normal'>privacidad</a>
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                8. Terminación del Servicio
              </p>
              <br />
              <p>
                Nos reservamos el derecho de suspender o terminar tu acceso a la aplicación en cualquier momento y por cualquier motivo, sin previo aviso.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                9. Contacto
              </p>
              <br />
              <p>
                Si tienes preguntas o inquietudes sobre nuestra política de privacidad, contáctanos en support@goldenTickets.club
              </p>
              <br />
            </span>

          </div>
        </div>


        <Footer />

      </motion.div >
    </AnimatePresence>
  )
}

export default Terms