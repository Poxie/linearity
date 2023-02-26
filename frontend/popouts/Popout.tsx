import styles from './Popouts.module.scss';
import { motion } from "framer-motion"
import { RefObject, useEffect, useRef } from "react";

const SPACE_FROM_ELEMENT = 20;
const ANIMATE_TRANSLATE_VALUE = -10;
export const Popout: React.FC<{
    children: any;
    element: RefObject<HTMLElement>;
}> = ({ children, element }) => {
    const popout = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!popout.current) return;

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

        window.addEventListener('resize', updatePopoutPosition);
        return () => window.removeEventListener('resize', updatePopoutPosition);
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