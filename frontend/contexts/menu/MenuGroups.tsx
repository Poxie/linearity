import styles from './Menu.module.scss';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react"
import { MenuArguments, MenuGroup, useMenu } from "."

const SPACE_FROM_ELEMENT = 15;
const ANIMATION_SPACING = 10;
export const MenuGroups: React.FC<MenuArguments> = ({ groups, element, options }) => {
    const { close } = useMenu();

    const [position, setPosition] = useState<null | {
        top: number, 
        left: number,
        direction: 'left' | 'right'
    }>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!element?.current || !ref.current) return;
        const SPACING = (options?.spaceFromElement || SPACE_FROM_ELEMENT);

        // Getting element dimensions
        const { top: elTop, left: elLeft, width: elWidth, height: elHeight } = element.current.getBoundingClientRect();
        const { width: menuWidth, height: menuHeight } = ref.current.getBoundingClientRect();

        // Determining positions
        let direction: 'right' | 'left' = 'right';
        let top = elTop;
        let left = elLeft + elWidth + SPACING;

        // Checking if left exceeds viewport
        if(left + elWidth > window.innerWidth) {
            left = elLeft - menuWidth - SPACING;
            direction = 'left'
        }

        // Updating position
        setPosition({ top, left, direction });

        // Making the clicked element outlined
        element.current.style.zIndex = '1000002';
        element.current.style.pointerEvents = 'none';

        return () => {
            if(!element.current) return;
            element.current.style.zIndex = '';
            element.current.style.pointerEvents = '';
        }
    }, [ref.current, element.current, options?.spaceFromElement]);

    const handleClick = (onClick: () => void) => {
        close();
        onClick();
    }

    const className = [
        styles['menu'],
        position?.direction ? styles[position.direction] : ''
    ].join(' ');
    return(
        <motion.div
            exit={{ translateX: ANIMATION_SPACING, opacity: 0 }}
            initial={{ translateX: ANIMATION_SPACING, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            style={{
                top: `${position?.top}px`,
                left: `${position?.left}px`,
            }}
            className={className}
            ref={ref}
        >
            {groups.map((items, key) => (
                <ul key={key}>
                    {items.map(item => (
                        <li key={item.text}>
                            <button 
                                className={styles['menu-item']}
                                onClick={() => handleClick(item.onClick)}
                            >
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            ))}
        </motion.div>
    )
}