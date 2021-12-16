import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src='https://artline.ua/storage/images/news/120/ru/news_1600262974910581_0.jpg'/>
            </div>
            <div>
                <img src='https://www.freeiconspng.com/uploads/tesv-skyrim-icon-png-28.png'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}
export default ProfileInfo;