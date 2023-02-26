import styles from './Popouts.module.scss';
import { motion } from "framer-motion"
import { RefObject, useEffect, useRef } from "react";
import { usePopout } from '@/contexts/popout';

const SPACE_FROM_ELEMENT = 20;
const ANIMATE_TRANSLATE_VALUE = -10;
export const Popout: React.FC<{
    children: any;
    element: RefObject<HTMLElement>;
}> = ({ children, element }) => {
    const { close } = usePopout();
    const popout = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!popout.current) return;

        // Closing popout if click outside
        const handleClickOutside = (e: Event) => {
            // @ts-ignore: this works
            if(popout.current && !popout.current.contains(e.target)) {
                close();
            }
        }

        // Updating popout position
        const updatePopoutPosition = () => {
            if(!element.current || !popout.current) return;
            let { top, left, width: _width } = element.current.getBoundingClientRect();
            const { width, height } = popout.current.getBoundingClientRect();
            
            top -= height + SPACE_FROM_ELEMENT;
            left -= width / 2 - _width / 2;
            
            popout.current.style.top = `${top}px`;
            popout.current.style.left = `${left}px`;
        }
        updatePopoutPosition();

        // Listening to popout resize
        new ResizeObserver(updatePopoutPosition).observe(popout.current);

        // Listening to mouse clisk
        window.addEventListener('mousedown', handleClickOutside);

        window.addEventListener('resize', updatePopoutPosition);
        return () => {
            window.removeEventListener('resize', updatePopoutPosition);
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, [element]);

    return(
        <motion.div
            className={styles['container']}
            animate={{ translateY: 0, opacity: 1 }}
            initial={{ translateY: ANIMATE_TRANSLATE_VALUE, opacity: 0 }}
            exit={{ translateY: ANIMATE_TRANSLATE_VALUE, opacity: 0 }}
            transition={{ duration: .2 }}
            ref={popout}
        >
            {children}
        </motion.div>
    )
}