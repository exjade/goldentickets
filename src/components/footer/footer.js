import React from 'react';
import styles from './css/footer.module.css';
import Logo from '../logo';

const Footer = () => {
  return (
    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        {/* BRANDING & COPYRIGHT */}
        <section
          className={`${styles.leftFooterSection}`}
        >
          <Logo />

          <span className={`${styles.leftFooterRights}`} >
            <p>
              2023 All rights reserved
            </p>
            <p>
              GOLDENTICKETS.CLUB is operated by HDS Technologies N.V., address
              Heelsumstraat 51, Curaçao, register number 149850, license number 8048/JAE2019-020
            </p>
            <p>
              This site is protected by reCAPTCHA and the Google and apply.
            </p>
          </span>

        </section>

        {/* CONTACT */}
        <section
          className={`${styles.middleFooterSection}`}
        >

          <div className={`${styles.middleFooterWrapper}`} >

            <span className={`${styles.middleFooterText}`}>
              <h3>marketing</h3>
              <p>marketing@goldentickets.club</p>
            </span>

            <span className={`${styles.middleFooterText}`}>
              <h3>support</h3>
              <p>support@goldentickets.club</p>
            </span>

          </div>

          <span className={`${styles.middleFooterSupport}`}>
            <span className="material-symbols-outlined">
              support_agent
            </span>
            <p>Live Support</p>
          </span>

        </section>

        {/* POLICY */}
        <section
          className={`${styles.middleFooterSection}`}
        >


          <div className={`${styles.policyFooterWrapper}`} >

            <h4>policy</h4>

            <ul className={`${styles.middleFooterText}`}>
              <li><a href="https://medium.com/@goldenticketsenterprise">blog</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Sport Rules</a></li>
              <li><a href="https://www.begambleaware.org/">Gamble Aware</a></li>
              <li> <a href="#">Policy</a> </li>
            </ul>
          </div>



        </section>

        {/*  REGULATION */}
        <section className={`${styles.footerRegulations}`} >

          <span className={`${styles.rightFooterWrapper}`} >

            <img
             src="https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fsvg%2F18.svg?alt=media&token=a9ecdeb0-72cc-4f26-b47a-b55e954e74a1" 
             alt="+18" 
             className='w-16 h-16 object-contain'
             />
            <img
             src="https://e50e95e3-13be-484a-a3be-40f8c08e62fa.seals-emr.certria.com/sealassets/880882e1cc308437b5cb515a9b5c27dc-wolf.bet-29e59395696f012d6cfdd62aeb33d7bc0bfcd6a6118653591554e14a39ade8bc1f51b80016499ed3114eecf1a2c982db-c2VhbC5wbmc%3D?status=valid" 
             alt="em license" 
             className='w-16 h-16 object-contain'
             />
            <img
             src="https://firebasestorage.googleapis.com/v0/b/goldentickets-da603.appspot.com/o/img%2Fassets%2Fsvg%2Frng_new.png?alt=media&token=202a86dd-ae5f-4d9f-971a-5a459ef0fba6" 
             alt="rng certified" 
             className='w-16 h-16 object-contain'
             />


          </span>

        </section>

      </div>
    </div>
  )
}

export default Footer