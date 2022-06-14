import React, { useState, useContext, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import WebWorker from 'simple-web-worker'


const main_data = require('../data.json')
const test_data = require('../test.json')

const DataContext = createContext();

export const CustContext = () => useContext( DataContext );




export default function Data({ children }) {

    const [data, setData] = useState([])
    const [slicedData, setSlicedData] = useState([])
    const [current_processing, setCurrentProcessing] = useState(-1);
    const [lastOperationTime, setLastOperationTime] = useState(0)
    const [isProcessing, setProcessing] = useState(false)

    const chunk_length = 100;


    const columns = [
        "email",
        "fav_color",
        "first_name",
        "gender",
        // "ip_address",
        "last_name"
    ]

    const stubs = [
        { 
            query: "SELECT * FROM CUSTOMERS",
            func: function(){
                var p_time = performance.now();
                setData(main_data)
                // search(slicedData, '', 'email', 0);
                p_time = performance.now() - p_time;
                console.log("Perfom", p_time )
            }
        },
        { 
            query: "SELECT * FROM CUSTOMERS WHERE GENDER='Male'",
            func: function(){
                var p_time = performance.now();
                search(slicedData, 'Male', 'gender', 0); 
                p_time = performance.now() - p_time;
                setLastOperationTime(p_time)
            }
        },
        { 
            query: "SELECT * FROM CUSTOMERS WHERE FAV_COLOR='Teal'",
            func: function(){
                var p_time = performance.now();
                search(slicedData, 'Teal', 'fav_color', 0);
                p_time = performance.now() - p_time;
                setLastOperationTime(p_time)
            }
        }
    ]

    const selectStub = (index) =>{
        stubs[index].func();
    }
    
    useEffect(() => {
    if(!isProcessing)
    {
        
        getData();
        
    }
    }, [])
    const getData = () =>{
        setProcessing(true);
        var p_time = performance.now();
        var tempD = main_data.splice(0, 300);
        console.log(tempD)
        setData(tempD);
        
        const temp = arraySlicer(
            // main_data.splice(0, main_data.length),
            // main_data.splice(0, 300),
            tempD,
            chunk_length
        )
        
        if(temp[0].length>0)
        {
        
            setSlicedData(temp)
            p_time = performance.now() - p_time;
            setLastOperationTime(p_time);
        }
        else setProcessing(false);
        
    }

    useEffect(() => {
        if(slicedData.length>0 && current_processing==-1)
        {
            setProcessing(false)
        }
    }, [slicedData])

    
    const filterItems = (arr, keyword, column) => {
        return arr.filter((obj) => {
            if (obj[column].includes(keyword)) {
                return true;
            }
            return false;
        });
    };
    const actions = [{ message: 'filtering', func: filterItems }];

    var worker;
    

    const search = (arr, keyword, column, chunkIndex) => {
        if (!worker) {
            console.log("worker created")
                worker = WebWorker.create(actions);
        }

        if (chunkIndex < arr.length) {
            worker
            .postMessage('filtering', [arr[chunkIndex], keyword, column])
            .then((filteredArr) => {
                setCurrentProcessing(chunkIndex);
                console.log("filtered", filteredArr)

                if(chunkIndex==0)
                {
                    Promise.resolve()
                    .then(() =>setData(filteredArr))
                    .then (()=> {
                        const newIndex = chunkIndex + 1;
                        search(arr, keyword, column, newIndex);
                    })
                }
                else 
                {
                    Promise.resolve()
                    .then(() =>setData([...data, ...filteredArr]))
                    .then (()=> {
                        console.log(data);
                        const newIndex = chunkIndex + 1;
                        search(arr, keyword, column, newIndex);
                    })
                    
                }
                
                
                
                

            })
            .catch(console.error);
        } else {
        worker = undefined;
        setCurrentProcessing(-1);
        }
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
        chunk_length,
        stubs,
        selectStub,
        current_processing,
        lastOperationTime
    }
    return (
        <DataContext.Provider value = { value } >
            { children }
        </DataContext.Provider>
    )

}