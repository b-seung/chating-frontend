import {MdClear, MdOutlinePermContactCalendar, MdPersonAddAlt1, MdDescription, MdKey, MdOutlineLogin} from 'react-icons/md';

const Menu = ({setMenu}) => {
    return (
        <>
            <div>
                <MdClear className="exit"/>
            </div>
            <Link to="/mypage">
                <div　className={menuBar}>
                    <MdOutlinePermContactCalendar />
                    <div>マイページ</div>
                </div>
            </Link>
            <Link to="/addfriend">
                <div　className={menuBar}>
                    <MdPersonAddAlt1 />
                    <div>友達追加</div>
                </div>
            </Link><Link to="/userupdate">
                <div　className={menuBar}>
                    <MdDescription />
                    <div>登録情報修正</div>
                </div>
            </Link><Link to="/passwordreset">
                <div　className={menuBar}>
                    <MdKey />
                    <div>パスワード再設定</div>
                </div>
            </Link><Link to="/secession">
                <div　className={menuBar}>
                    <MdOutlineLogin />
                    <div>会員退会</div>
                </div>
            </Link>
        </>
    )
}

export default Menu;
