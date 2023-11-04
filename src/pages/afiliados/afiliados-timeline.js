import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/use-user'
import { getDailySellerCode } from '../../services/firebase'
import FallBackLoader from '../../components/FallBackLoader';
import { Table } from '../../components/Table';
import { BreadcrumbUnderline } from '../../components/breadcrumbs';
import { SearchBar } from '../../components/searchbar';
import useBreadcrumbs from '../../hooks/afiliados/use-breadcrumbs';
import useGetTickets from '../../hooks/afiliados/use-getTickets';
import { Pagination } from '../../components/pagination';
import BackofficeAfiliado from './backoffice-afiliado';
import BackofficeAdmin from './backoffice-admin';
import useGetAllTickets from '../../hooks/afiliados/use-getAllTickets';

const AffiliatesTimeline = () => {

    const { user } = useUser()
    const { state: breadcrumState, setState: setBreadcrumState } = useBreadcrumbs()
    const [loader, setLoader] = useState(false)
    const [search, setSearch] = useState('')

    /* ========================= ========= ========================= */
    /* ========================= AFILIADOS ========================= */
    /* ========================= ========= ========================= */
    const [code, setCode] = useState('')
    const { items: sellerTickets, comision: sellerComision } = useGetTickets()
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


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    // Calcular los índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterSearch.slice(indexOfFirstItem, indexOfLastItem);

    // Función para cambiar la página actual
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        const sellerId = user?.userId

        const result = getDailySellerCode(sellerId).then(result => {
            if (result === undefined) {
                setLoader(true)
            } else {
                setCode(result[0].dailyCode)
            }
        }).catch(error => {
            return null
        });


        setTimeout(() => {
            setLoader(false)
        }, [1000])


        if (user?.rol !== undefined && user?.rol === 'afiliado') {
            return () => result
        }
    }, [user])


    const headers = [
        { key: 'purchaseDate', label: 'Date', hidden: false },
        { key: 'numeroTicket', label: '#', hidden: false },
        { key: 'sellerCode', label: 'Code', hidden: true },
        { key: 'username', label: 'User', hidden: false },
        { key: 'id', label: 'ID', hidden: true },
        { key: 'costoTicket', label: 'Price', hidden: false },
        { key: 'comisionTicket', label: 'Earn', hidden: false },
    ];

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
            <Table headers={headers} data={currentItems} />

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filterSearch.length}
                paginate={paginate}
            />
        </>
    )

    /* ========================= ============== ========================= */
    /* ========================= ADMINISTADORES ========================= */
    /* ========================= ============== ========================= */
    const [searchAdmin, setSearchAdmin] = useState('')
    const {
        items: AllTickets,
        afiliados: Afiliados,
        comision: comisiones,
        ingresoNeto: ingresoNeto,
        ingresoBruto: ingresoBruto,
    } = useGetAllTickets()

    const filterAllSearch = AllTickets?.filter(item => {
        const normalizeField = (field) => (typeof field === 'number' ? String(field) : field);

        const idString = normalizeField(item.id);
        const costoTicketString = normalizeField(item.costoTicket);
        const userIdString = normalizeField(item.userId);
        const sellerCodeString = normalizeField(item.sellerCode);
        const numeroTicketString = normalizeField(item.numeroTicket);
        const usernameString = normalizeField(item.username);

        return (
            idString?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
            costoTicketString?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
            userIdString?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
            sellerCodeString?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
            numeroTicketString?.toLowerCase().includes(searchAdmin.toLowerCase()) ||
            usernameString?.toLowerCase().includes(searchAdmin.toLowerCase())
        );
    });

    const [currentPage2, setCurrentPage2] = useState(1);
    const itemsPerPage2 = 15;
    // Calcular los índices de los elementos a mostrar en la página actual
    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = filterAllSearch.slice(indexOfFirstItem2, indexOfLastItem2);

    // Función para cambiar la página actual
    const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

    const headersAdmin = [
        { key: 'purchaseDate', label: 'Date', hidden: false },
        { key: 'numeroTicket', label: '#', hidden: false },
        { key: 'sellerCode', label: 'Code', hidden: true },
        { key: 'username', label: 'User', hidden: false },
        { key: 'id', label: 'ID', hidden: true },
        { key: 'costoTicket', label: 'Price', hidden: false },
        { key: 'comisionTicket', label: 'Earn', hidden: false },
    ];


    const tableAdministrator = (
        <>
            <SearchBar
                title={'All Tickets'}
                setSearch={setSearchAdmin}
            />
            <BreadcrumbUnderline
                crumText1={'Tickets'}
                crumText2={'Pagos'}
                state={breadcrumState}
                setState={setBreadcrumState}
            />
            <Table headers={headersAdmin} data={currentItems2} />

            <Pagination
                itemsPerPage={itemsPerPage2}
                totalItems={filterAllSearch.length}
                paginate={paginate2}
            />
        </>
    )

    if (loader) {
        return <FallBackLoader />
    }
    else {
        return (
            <>
                {
                    user?.rol === 'afiliado' ? (
                        <BackofficeAfiliado
                            user={user}
                            code={code}
                            sellerTickets={sellerTickets}
                            sellerComision={sellerComision}
                            table={table}
                        />
                    ) : user?.rol === 'admin' ? (
                        <BackofficeAdmin
                            user={user}
                            code={code}
                            AllTickets={AllTickets}
                            Afiliados={Afiliados}
                            sellerComision={comisiones}
                            ingresoNeto={ingresoNeto}
                            ingresoBruto={ingresoBruto}
                            table={tableAdministrator}
                        />
                    ) : null
                }

            </>
        )
    }
}

export default AffiliatesTimeline