import s from './DialogItem.module.scss'
import {NavLink} from 'react-router-dom'

export type DialogItemPropsType = {
    name: string
    id: number
    img: string
}

export const DialogItem = ({name, id, img}: DialogItemPropsType) => (
    <div className={s.dialog}>
        <div><img src={img} alt={'user image'}/></div>
        <div><NavLink to={'/dialogs/' + id}>{name}</NavLink></div>
    </div>
)