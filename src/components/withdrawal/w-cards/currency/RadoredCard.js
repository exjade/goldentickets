//styles
import styles from '../../../../styles/modules/withdrawal/withdrawal.module.css';

const RadoredCard = () => {


  return (
    <div className={`${styles.cardContainer}`} id='theme_btn_light'>
      <div className={`${styles.cardWrapper} flex flex-col`} id='theme_btn_dark'>
        <div className={`${styles.withdrawalNewCryptoBackground} flex  `}>

          {/* LOGO */}
          <div className={`${styles.logoCard} flex flex-row justify-center mt-6 px-2.5 py-2.5 w-full items-center gap-5`}>
            <img src="/assets/logo.webp" alt="bitcoin wallet" className={`w-72 flex ml-5 mb-10 items-center  `} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default RadoredCard

