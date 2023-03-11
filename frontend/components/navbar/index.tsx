import Link from "next/link"
import styles from './Navbar.module.scss';
import { NavbarTabs } from "./NavbarTabs";

export const Navbar = () => {
    return(
        <nav className={styles['container']}>
            <div className={styles['content']}>
                <Link
                    href={''} 
                    className={styles['header']}
                >
                    {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </Link>
                <NavbarTabs />
            </div>
        </nav>
    )
}