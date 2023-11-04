import React, { useEffect, useState, Fragment } from 'react'
import styles from './css/afiliados.module.css'
import useUser from '../../hooks/use-user'
import { getDailySellerCode } from '../../services/firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'
import FallBackLoader from '../../components/FallBackLoader';
import { CardSmall, CardLarge } from '../../components/Card';
import { Table } from '../../components/Table';
import { BreadcrumbUnderline } from '../../components/breadcrumbs';
import { SearchBar } from '../../components/searchbar';
import useBreadcrumbs from '../../hooks/afiliados/use-breadcrumbs';
import useGetTickets from '../../hooks/afiliados/use-getTickets';

const AffiliatesTimeline = () => {

    const { user } = useUser()
    const { state: breadcrumState, setState: setBreadcrumState } = useBreadcrumbs()
    const { items: sellerTickets, comision: sellerComision } = useGetTickets()

    const [code, setCode] = useState('')
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState('')

    const filterSearch = sellerTickets?.filter(item => {
        const normalizeField = (field) => (typeof field === 'number' ? String(field) : field);

        const idString = normalizeField(item.id);
        const costoTicketString = normalizeField(item.costoTicket);
        const userIdString = normalizeField(item.userId);
        const sellerCodeString = normalizeField(item.sellerCode);
        const numeroTicketString = normalizeField(item.numeroTicket);
        const usernameString = normalizeField(item.username);

        return (
            idString?.toLowerCase().includes(search.toLowerCase()) ||
            costoTicketString?.toLowerCase().includes(search.toLowerCase()) ||
            userIdString?.toLowerCase().includes(search.toLowerCase()) ||
            sellerCodeString?.toLowerCase().includes(search.toLowerCase()) ||
            numeroTicketString?.toLowerCase().includes(search.toLowerCase()) ||
            usernameString?.toLowerCase().includes(search.toLowerCase())
        );
    });


    useEffect(() => {
        const sellerId = user?.userId

        const result = getDailySellerCode(sellerId).then(result => {
            if (result === undefined) {
                setLoader(true)
            } else {
                setCode(result[0].dailyCode)
            }
        }).catch(error => {
            console.error('Error:', error);
        });


        setTimeout(() => {
            setLoader(false)
        }, [1000])


        return () => result
    }, [user])



    const table = (
        <>
            <SearchBar
                title={'Your Tickets'}
                setSearch={setSearch}
            />
            <BreadcrumbUnderline
                crumText1={'Mis ventas'}
                crumText2={'Pagos'}
                state={breadcrumState}
                setState={setBreadcrumState}
            />

            {
                filterSearch?.map((tickets, i) => (
                    <Fragment key={i}>
                        <Table item={tickets} />
                    </Fragment>
                ))
            }
        </>
    )


    if (loader) {
        return <FallBackLoader />
    }
    else {
        return (
            <div className={`${styles.container}`} >
                <div className={`${styles.wrapper}`} >

                    <div className={`${styles.welcomeMessage}`} >
                        <p>Bienvenido, {user?.emailAddress}</p>
                    </div>

                    {/* SELLER CODE */}
                    <div className={`${styles.sellerCode}`} >
                        {
                            code === undefined || code === '' ?
                                (
                                    <p>Código: loading... </p>
                                ) :
                                (
                                    <>
                                        <p>Tú código de venta:</p>
                                        < CopyToClipboard text={code}>
                                            <motion.button
                                                type='button'
                                                className={`${styles.referralCode} lowercase font-semibold`}
                                                whileTap={{ scale: 0.9 }}>
                                                {code}
                                            </motion.button>
                                        </CopyToClipboard>
                                    </>
                                )
                        }
                    </div>

                    {/* CARDS */}
                    <div className={styles['grid-container']}>
                        <CardSmall
                            title='Tickets'
                            img={'https://i.pinimg.com/originals/b6/6b/c2/b66bc2adbaa9662e647ac3f7dbff704b.png'}
                            alt={'ticket'}
                            price={sellerTickets?.length}
                        />
                        <CardSmall
                            title='Comisión'
                            img={'/assets/cart-icon-28356.png'}
                            alt={'cart'}
                            price={sellerComision}
                        />
                    </div>

                    <CardLarge
                        content={table}
                    />

                </div>
            </div >
        )
    }
}

export default AffiliatesTimeline