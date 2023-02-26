import styles from './Popouts.module.scss';
import { motion } from "framer-motion"
import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import { usePopout } from '@/contexts/popout';

const SPACE_FROM_ELEMENT = 20;
const ANIMATE_TRANSLATE_VALUE = -10;
export const Popout: React.FC<{
    children: any;
    element: RefObject<HTMLElement>;
    position: 'up' | 'left';
}> = ({ children, element, position }) => {
    const { close } = usePopout();
    const popout = useRef<HTMLDivElement>(null);
    const [popoutOffset, setPopoutOffset] = useState(0);

    // Closing popout on click outside
    // Updating popout position, on mount and resize
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

            // Getting sizes and position of clicked element and popout
            let { top, left, width: _width, height: _height } = element.current.getBoundingClientRect();
            const { width, height } = popout.current.getBoundingClientRect();
            
            // Determining position for popout
            if(position === 'up') {
                top -= height + SPACE_FROM_ELEMENT;
                left -= width / 2 - _width / 2;
            } else if(position === 'left') {
                left -= width + SPACE_FROM_ELEMENT;
            }

            // Checking offset based on element ref
            setPopoutOffset(_height / 2);
            
            // Updating popout top and left
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
    }, [element, position]);

    // Determining popout animations
    const initial = { 
        translateY: position === 'up' ? ANIMATE_TRANSLATE_VALUE : 0,
        translateX: position === 'left' ? ANIMATE_TRANSLATE_VALUE : 0,
        opacity: 0
    }
    const animate = { 
        translateY: 0,
        translateX: 0,
        opacity: 1
    }

    const className = [
        styles['container'],
        styles[position]
    ].join(' ');
    return(
        <motion.div
            className={className}
            animate={animate}
            initial={initial}
            exit={initial}
            transition={{ duration: .2 }}
            style={{
                '--popout-offset': `${popoutOffset}px`
            } as CSSProperties}
            ref={popout}
        >
            {children}
        </motion.div>
    )
}