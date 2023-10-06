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

const Policy = () => {


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

            <h2 >Política de Privacidad de GoldenTickets.club</h2>

            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                1. Información que Recopilamos
              </p>
              <br />
              <p>
                1.1 Información Personal Identificable: Podemos recopilar información personal identificable, como nombres, direcciones de correo electrónico y números de teléfono, cuando los usuarios se registran en nuestro sitio, realizan compras o participan en otras actividades relacionadas con nuestros servicios.
              </p>
              <br />

              <p>
                1.2 Información de Pago: Al realizar compras a través de nuestro sitio, se puede recopilar información de pago, como números de tarjetas de crédito o información de cuentas bancarias. Esta información se procesa de manera segura a través de servicios de pago confiables y no se almacena en nuestros servidores.
              </p>
              <br />

              <p>
                1.3 Datos de Uso: Recopilamos datos sobre la forma en que los usuarios interactúan con nuestro sitio, como páginas visitadas, tiempo de permanencia, y otros datos analíticos para mejorar la experiencia del usuario
              </p>

            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                2. Uso de la Información Recopilada
              </p>
              <br />
              <p>
                2.1 Mejora de Servicios: Utilizamos la información recopilada para mejorar y personalizar nuestros servicios, así como para comprender mejor las necesidades y preferencias de nuestros usuarios.
              </p>
              <br />

              <p>
                2.2 Procesamiento de Pagos: La información de pago se utiliza exclusivamente para procesar transacciones y facilitar compras a través de nuestro sitio.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                3. Compartir Información con Terceros
              </p>
              <br />
              <p>
                3.1 Proveedores de Servicios: Podemos compartir información con proveedores de servicios de confianza que nos ayudan en la prestación de nuestros servicios, como procesadores de pagos y servicios de análisis.
              </p>
              <br />

              <p>
                3.2 Cumplimiento Legal: Revelaremos información cuando sea necesario para cumplir con las leyes aplicables, regulaciones gubernamentales o en respuesta a órdenes judiciales.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                4. Seguridad de la Información
              </p>
              <br />
              <p>
                Implementamos medidas de seguridad para proteger la información recopilada contra acceso no autorizado, alteración, divulgación o destrucción no autorizada.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                5. Enlaces a Otros Sitios Web
              </p>
              <br />
              <p>
                Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios y alentamos a los usuarios a revisar las políticas de privacidad de esos sitios.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                6. Cambios en la Política de Privacidad
              </p>
              <br />
              <p>
                Nos reservamos el derecho de modificar esta política en cualquier momento. Se notificarán cambios importantes a los usuarios a través de avisos en nuestro sitio.
              </p>
              <br />
            </span>
            {/*======================== POLICY BLOCK ========================*/}
            <span>
              <p>
                7. Contacto
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

export default Policy