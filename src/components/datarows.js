import React from 'react';

import {OrdersContext} from '../context/data'
import {UserContext} from '../context/user'

export default function DataRows () {
    const {data, columns} = OrdersContext()
    const {current_user_role} = UserContext()

    return(
        <div>
            <div className="data_table">
                {
                    columns.map((c_data)=>
                        <div>{c_data}</div>
                    )
                }
                {
                    columns.map((c_data)=>
                        <div>{c_data}</div>
                    )
                }
            </div>
        </div>
    )

}
