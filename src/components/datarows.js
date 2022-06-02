import React from 'react';

import {context} from '../context/data'
import {usercontext} from '../context/user'

export default function DataRows () {
    const {data, columns} = context()
    const {current_user_role} = usercontext()

    return(
        <div>
            <div>
                {
                    columns.map((data)=>{
                        
                    })
                }
            </div>
        </div>
    )

}
