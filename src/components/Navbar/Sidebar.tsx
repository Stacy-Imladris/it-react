import React from "react";
import s from './Navbar.module.css';
import {FriendType, SidebarType} from "../../redux/state";

type SidebarPropsType = {
    state: SidebarType
}

export const Sidebar = (props: SidebarPropsType) => {

    let friendElements = props.state.friends.map((f: FriendType) => {
        return (
            <div key={f.id}>
                <div>
                    <img src={f.img}/>
                </div>
                <div>
                    {f.name}
                </div>
            </div>
        )
    });

    return (
        <div className={s.sidebar}>
            <div className={s.title}>
                Friends
            </div>
            <div className={s.friends}>
                {friendElements}
            </div>
        </div>
    )
}