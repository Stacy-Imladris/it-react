import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from './Profile.module.css';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src='https://artline.ua/storage/images/news/120/ru/news_1600262974910581_0.jpg'/>
        </div>
        <div>
            <img src='https://www.freeiconspng.com/uploads/tesv-skyrim-icon-png-28.png'/>
        </div>
        <div>
            ava + description
        </div>
        <MyPosts />
    </div>
}
export default Profile;