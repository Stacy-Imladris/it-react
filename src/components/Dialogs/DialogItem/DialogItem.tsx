import s from './DialogItem.module.scss'
import {NavLink} from 'react-router-dom'

type Props = {
    name: string
    id: number
    img: string
}

export const DialogItem = ({name, id, img}: Props) => (
    <div className={s.dialog}>
        <div><img src={img} alt={'user image'}/></div>
        <div><NavLink to={'/dialogs/' + id}>{name}</NavLink></div>
    </div>
)
