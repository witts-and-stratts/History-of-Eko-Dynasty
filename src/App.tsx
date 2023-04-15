import { DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridProps, DataGridRow, Input, Persona, TableCellLayout, TableColumnDefinition, createTableColumn, typographyStyles } from "@fluentui/react-components";
import { MailInboxAdd20Regular, Open20Regular, Search20Filled } from '@fluentui/react-icons';
import axios from "axios";
import dayjs from 'dayjs';
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer, toast, Id } from "react-toastify";

interface paymentRef {
  amount: number | null;
  reference: string;
  paid_at: string;
  first_name: string;
  last_name: string;
  email: string;
  _id: string | undefined;
  _rev: string;
}

const samplePayments: paymentRef[] = [ { "amount": 4500, "reference": "T883996674591930", "paid_at": "2023-04-15T07:22:03.000Z", "first_name": "Tunde", "last_name": "Giwa", "email": "tundegiwa75@gmail.com", "_id": "T883996674591930", "_rev": "2-35b0f8da519a4a07a8edc6c55bf84449" }, { "amount": 4500, "reference": "T857980493680573", "paid_at": "2022-10-08T08:40:52.000Z", "first_name": "Victory", "last_name": "J", "email": "victoryjames@witts-stratts.com", "_id": "T857980493680573", "_rev": "2-271774a835484bcdb43412b79a424276" }, { "amount": 4500, "reference": "T801405949461753", "paid_at": "2023-04-13T19:15:45.000Z", "first_name": "Ayọ̀ọlá", "last_name": "Fálàṣẹ", "email": "ayoflash@gmail.com", "_id": "T801405949461753", "_rev": "2-1b4f43aa26094ef68f27c89a29ad0885" }, { "amount": 4500, "reference": "T782986707648274", "paid_at": "2022-10-11T06:52:15.000Z", "first_name": "Victory", "last_name": "James", "email": "javik@live.com", "_id": "T782986707648274", "_rev": "2-3e52119af65542fd8c829e699d9e4e61" }, { "amount": 4500, "reference": "T762491248354642", "paid_at": "2023-03-09T22:20:41.000Z", "first_name": "Adeola ", "last_name": "Bossman", "email": "adeolabossman@gmail.com", "_id": "T762491248354642", "_rev": "2-9cc0a92444824f0c8ce9be8dc3f6ee6b" }, { "amount": 4500, "reference": "T672334571366525", "paid_at": "2022-10-11T06:58:04.000Z", "first_name": "Victory", "last_name": "James", "email": "victoryjames@witts-stratts.com", "_id": "T672334571366525", "_rev": "2-2ed67cd7b2de4eaea9d2be0ca7834339" }, { "amount": 4500, "reference": "T661125958120409", "paid_at": "2023-02-12T23:13:20.000Z", "first_name": "Ebun", "last_name": "Ikenze", "email": "ebun.ikenze@gmail.com", "_id": "T661125958120409", "_rev": "2-94ff3fc621e8441490b379460c6295c6" }, { "amount": 4500, "reference": "T568165390506696", "paid_at": "2023-04-14T14:24:03.000Z", "first_name": "Olakunle", "last_name": "Alaba", "email": "olakunlay2009@gmail.com", "_id": "T568165390506696", "_rev": "2-3957b8223dd04241a01447813ef426ae" }, { "amount": 4500, "reference": "T402666393907386", "paid_at": "2023-04-13T22:14:04.000Z", "first_name": "Fouad ", "last_name": "Oki", "email": "fouadoki@yahoo.com", "_id": "T402666393907386", "_rev": "2-f2928f47f47348aaa341d7ca653cd2fe" }, { "amount": 4500, "reference": "T302868544700415", "paid_at": "2022-10-11T06:59:59.000Z", "first_name": "Victory", "last_name": "James", "email": "victoryjames@witts-stratts.com", "_id": "T302868544700415", "_rev": "2-3ee17481fd0a4f7296e3d963993b8c01" }, { "amount": 4500, "reference": "T255507405159494", "paid_at": "2023-03-13T13:21:26.000Z", "first_name": "Allentown", "last_name": "Limited", "email": "allentownlimited@gmail.com", "_id": "T255507405159494", "_rev": "2-b56cfd29bed14b60bd52df58561bd380" }, { "amount": 4500, "reference": "T254907585034648", "paid_at": "2023-03-13T05:52:44.000Z", "first_name": "Olusola", "last_name": "Salako", "email": "solasalakoajulo@gmail.com", "_id": "T254907585034648", "_rev": "2-a3b1ecb0ac8447839e3ee71017e06478" } ];

const formatDate = ( date: string ) => {
  return dayjs( date ).format( "ddd DD MMMM, YYYY" );
};

const columns: TableColumnDefinition<paymentRef>[] = [
  createTableColumn<paymentRef>( {
    columnId: 'name',
    compare: ( a, b ) => a.first_name.localeCompare( b.first_name ),
    renderHeaderCell: () => "First Name",
    renderCell: ( payment ) => <TableCellLayout><Persona textAlignment='center' name={ payment.first_name + ' ' + payment.last_name } /></TableCellLayout>,
  } ),
  createTableColumn<paymentRef>( {
    columnId: 'email',
    compare: ( a, b ) => a.email.localeCompare( b.email ),
    renderHeaderCell: () => "Email",
    renderCell: ( payment ) => <TableCellLayout>{ payment.email }</TableCellLayout>,
  } ),
  createTableColumn<paymentRef>( {
    columnId: 'amount',
    renderHeaderCell: () => "Amount",
    renderCell: ( payment ) => <TableCellLayout>{ payment.amount }</TableCellLayout>,
  } ),
  createTableColumn<paymentRef>( {
    columnId: 'paid_at',
    compare: ( a, b ) => a.paid_at.localeCompare( b.paid_at ),
    renderHeaderCell: () => "Paid At",
    renderCell: ( payment ) => <TableCellLayout>{ formatDate( payment.paid_at ) }</TableCellLayout>,
  } ),
  createTableColumn<paymentRef>( {
    columnId: 'payment_reference',
    renderHeaderCell: () => "Reference",
    renderCell: ( payment ) => <TableCellLayout>{ payment.reference }</TableCellLayout>,
  } ),
  createTableColumn<paymentRef>( {
    columnId: 'actions',
    renderHeaderCell: () => "Actions",
    renderCell: ( payment ) => <TableCellLayout><Open20Regular onClick={ e => viewPage( payment.reference ) } /><MailInboxAdd20Regular onClick={ e => resendEmail( payment.reference ) } /></TableCellLayout>,
  } ),
];

const viewPage = ( token: string ) => {
  const encodedToken = btoa( token );
  window.open( `https://ekodynasty.com/ebook-download?token=${ encodedToken }`, '_blank' );
};

const debounce = ( fn: any, ms: number ) => {
  let timer: any;
  return ( ...args: any[] ) => {
    clearTimeout( timer );
    timer = setTimeout( () => {
      timer = null;
      fn( ...args );
    }, ms );
  };
};

const resendEmail = ( token: string ) => {
  const url = `https://ekodynasty.com/resend-email/${ btoa( token ) }`;
  const id = toast( "Resending email..." );
  axios.get( url ).then( res => {
    toast( "Email resent successfully", {
      updateId: id,
    } );
  } ).catch( err => {
    toast.error( "Error resending email. Please try again", {
      updateId: id,
    } );
  } ).finally( () => {
    toast.dismiss( id );
  } );
};

function App() {
  const [ payments, setPayments ] = useState<paymentRef[]>( [] );
  const [ filteredPayments, setFilteredPayments ] = useState<paymentRef[]>( [] );
  const toastId = useRef<Id>();

  const debounceOnChange = debounce( ( e: any ) => {
    filterPayments( e.target.value );
  }, 50 );

  const filterPayments = ( search: string ) => {
    const filtered = payments.filter( payment => {
      return payment.first_name.toLowerCase().includes( search.toLowerCase() ) || payment.last_name.toLowerCase().includes( search.toLowerCase() ) || payment.email.toLowerCase().includes( search.toLowerCase() ) || payment.reference.toLowerCase().includes( search.toLowerCase() ) || formatDate( payment.paid_at ).toLowerCase().includes( search.toLowerCase() );
    } );
    setFilteredPayments( filtered );
  };

  useEffect( () => {
    fetch( '/results', {
      method: 'GET',
    } ).then( data => data.json() ).then( data => {
      setPayments( data as unknown as paymentRef[] );
      setFilteredPayments( data as unknown as paymentRef[] );
      console.log( "Fetched data:", data );
    } ).catch( err => {
      console.log( err );
    } );

    setPayments( samplePayments );
    setFilteredPayments( samplePayments );
  }, [] );

  const defaultSortState = useMemo<
    Parameters<NonNullable<DataGridProps[ "onSortChange" ]>>[ 1 ]
  >( () => ( { sortColumn: "paid_at", sortDirection: "descending" } ), [] );

  return (
    <div className="App">
      <div className="header">
        <div>
          <img src="https://ekodynasty.com/assets/img/history-of-eko-dynasty-logo.svg" alt="History of Eko dynasty logo" /></div>
        <div className="left">
          <h1 style={ typographyStyles.subtitle1 }>Book purchase and fulfillment</h1>
          <Input placeholder="Search purchase history" size="large" style={ {
            width: '100%'
          } } appearance="filled-lighter-shadow" contentAfter={ <Search20Filled /> } onChange={ debounceOnChange } />
        </div>

      </div>
      <DataGrid as="div"
        items={ filteredPayments }
        columns={ columns }
        getRowId={ ( item ) => item._id }
        sortable={ true }
        defaultSortState={ defaultSortState }
        subtleSelection={ true }
        selectionMode='multiselect'
      >
        <DataGridHeader>
          <DataGridRow>
            { ( { renderHeaderCell } ) => (
              <DataGridHeaderCell><p style={ typographyStyles.body1Strong }>{ renderHeaderCell() }</p></DataGridHeaderCell>
            ) }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<paymentRef>>
          { ( { item, rowId } ) => (
            <DataGridRow<paymentRef>
              key={ rowId }
              selectionCell={ { "aria-label": "Select row" } }
            >
              { ( { renderCell } ) => (

                <DataGridCell>
                  <motion.div initial={ { opacity: 0, y: -10 } } animate={ { opacity: 1, y: 0 } } exit={ { opacity: 0, y: -10 } } transition={ { type: "spring", stiffness: 100, duration: 0.6 } } >
                    { renderCell( item ) }
                  </motion.div>
                </DataGridCell>

              ) }
            </DataGridRow>
          ) }
        </DataGridBody>
      </DataGrid>
      <ToastContainer />
    </div>
  );
}


export default App;
