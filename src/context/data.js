import React, { useState, useContext, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import WebWorker from 'simple-web-worker'
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
const data_csv = require('../orders.json')

const DataContext = createContext();

export const OrdersContext = () => useContext( DataContext );

const chunk_length = 300;


export default function Data({ children }) {

    const [data, setData] = useState([])

    const columns = [
        "orderID",
        "customerID",
        "employeeID",
        "orderDate",
        "freight",
        "shipName",
        "shipAddress",
        "productID",
        "unitPrice",
        "quantity",
        "discount"
    ]

    const stubs = [
        { 
            query: "SELECT * FROM ORDERS",
            func: function(){
                console.log("no filter")
            }
        },
        { 
            query: "SELECT * FROM ORDERS WHERE COUNTRY='France'",
            func: function(){
                console.log("france")
            }
        },
        { 
            query: "SELECT * FROM ORDERS WHERE CUSTOMERID='RICSU'",
            func: function(){
                console.log("RICSU")
            }
        }
    ]

    const selectStub = (index) =>{
        stubs[index].func();
    }
    
    useEffect(() => {
        loadData();
    }, [])

    const loadData = () =>{

    }

    const arraySlicer = (array, chunkLength) => {
        const result = [];
        const initialLength = array.length;
        if (initialLength <= chunkLength) {
            result.push(array);
        } else {
            const iterations = Math.floor(initialLength / chunkLength);
            for (let i = 0; i < iterations; i += 1) {
                result.push(array.splice(0, chunkLength));
            }
            if (array.length > 0) {
                result.push(array);
            }
        }
        return result;
    };
    
    const value = {
        data,
        columns,
        stubs,
        selectStub
    }
    return (
        <DataContext.Provider value = { value } >
            { children }
        </DataContext.Provider>
    )

}