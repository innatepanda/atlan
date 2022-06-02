import React from 'react';
import {Link} from "react-router-dom";
import {usercontext} from '../context/user'

export default function SideBar(){
    const {current_user, all_users} = usercontext();
    return(
        <div>
            <div>
                <select defaultValue={current_user}>
                    {
                        all_users.map((data, index)=>
                            <option value={index}>
                                <div>
                                    {data.name}
                                </div>
                                <div>
                                    {data.role}
                                </div>
                            </option>
                        )
                    }
                </select>
            </div>
            <div>
                <Link to="/stats" >Stats</Link>
                <Link to="/editor">Editor</Link>
            </div>
        </div>
    )
}








