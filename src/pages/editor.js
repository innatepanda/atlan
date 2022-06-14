import React from 'react';
// COMPONENTS ====================================
import DataRows from '../components/datarows'

import Button from '@mui/material/Button';

// CONTEXT ====================================
import {CustContext} from '../context/data'


export default function Editor(){
    const {stubs, selectStub} = CustContext();
    return(
        <div className="editor">
            <div>
                <div>
                    <div className="header">SQL Editor</div>
                    <textarea className="editor_textarea" placeholder="This doesnt do anything for now"/>
                    <Button>Execute</Button>
                </div>
                <div>
                    <div className="header">Demo Stubs</div>
                    <select onChange={e => selectStub(e.target.value)} >
        
                        {
                            stubs.map((s_data, index)=>
                            <option value={index}>{s_data.query}</option>
                            )
                        }

                    </select>
                </div>
            </div>
            
            <DataRows />
        </div> 
    )
}