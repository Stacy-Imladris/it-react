import React from "react";
import s from './Navbar.module.css';
import {SidebarPropsType} from "./SidebarContainer";
import {FriendType} from "../../redux/sidebar-reducer";

export const Sidebar = (props: SidebarPropsType) => {

    let friendElements = props.sidebar.friends.map((f: FriendType) => {
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