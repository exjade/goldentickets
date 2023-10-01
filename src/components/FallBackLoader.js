import React from 'react'
import '../styles/loader.css'
import Lottie from 'lottie-react'
import AnimationLoader from './AnimationLoader.json'

const FallBackLoader = () => {

    return (
      <div className="fallbackloader bg-black-normal">

        <div className="vertical-centered-box">
          <div className="content flex flex-col justify-center items-center w-full h-full">


            <Lottie
              animationData={AnimationLoader}
              style={{ width: '200px', height: '200px' }}
            />
            <p className='text-2xl uppercase font-extrabold text-white-normal animate-bounce my-10'>
              GOLDENTICKETS.club
            </p>

          </div>
        </div>

      </div>
    )
  }



export default FallBackLoader