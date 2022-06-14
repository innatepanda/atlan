import React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import {CustContext} from '../context/data'
import {UserContext} from '../context/user'

export default function DataRows () {
    const {
        data, 
        columns, 
        chunk_length,
        current_processing,
        lastOperationTime
    } = CustContext();
    const {current_user_role} = UserContext()

    const renderTableRow = ({index, key, style}) =>{
        
        return(
            <div className="data_table_row" style={style}>
                <div key={key} className="data_cell">{index+1}</div>
                {
                    columns.map((column)=>(
                        <div key={key + column} className="data_cell">{data[index][column]}</div>
                    ))
                }
            </div>
           
        )
    }
    if(current_processing!=-1) return <div>loading</div>

    return(
        <div>
            <div>{data.length} results in {lastOperationTime}ms</div>
            <div className="data_table">
                <div className="data_table_row">
                    <div key="index" className="data_cell">index</div>
                    {
                        columns.map((c_data)=>
                            <div key={c_data} className="data_cell">{c_data}</div>
                        )
                    }
                </div>
                
                <AutoSizer>
                    {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        estimatedRowHeight={60}
                        rowHeight={60}
                        rowRenderer={params => renderTableRow(params)}
                        rowCount={data.length}
                        // scrollToIndex={0}
                        scrollToAlignment="center"
                    />
                    )}
                </AutoSizer>
            </div>
            
        </div>
    )

}
