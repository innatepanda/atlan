import React, { useState, useContext, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import WebWorker from 'simple-web-worker'
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
const data_csv = require('../orders.json')

const DataContext = createContext();

export const context = () => useContext( DataContext );

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
        columns
    }
    return (
        <DataContext.Provider value = { value } >
            { children }
        </DataContext.Provider>
    )

}