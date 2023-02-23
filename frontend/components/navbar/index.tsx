import Link from "next/link"
import styles from './Navbar.module.scss';

export const Navbar = () => {
    return(
        <nav className={styles['container']}>
            <Link
                href={''} 
                className={styles['header']}
            >
                {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </Link>
        </nav>
    )
}