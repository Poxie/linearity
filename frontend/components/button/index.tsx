import Link from 'next/link';
import React, { AnchorHTMLAttributes, ReactElement } from 'react';
import styles from './Button.module.scss';

export default function Button({ children, style, onClick, href, ariaLabel, target, icon, buttonType='button', external=false, disabled=false, className='', type='default' }: {
    children: any;
    buttonType?: 'button' | 'submit';
    type?: 'default' | 'hollow' | 'transparent';
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    href?: string;
    ariaLabel?: string;
    target?: AnchorHTMLAttributes<''>['target'];
    disabled?: boolean;
    external?: boolean;
    icon?: ReactElement;
}) {
    className = [
        className,
        styles['container'],
        styles[type],
        disabled ? styles['disabled'] : ''
    ].join(' ');

    const props = {
        className,
        style,
        onClick,
        disabled,
        'aria-label': ariaLabel
    }

    return href ? (
        external ? (
            <a 
                href={href}
                rel={'noreferrer'}
                target={target}
                {...props}
            >
                {icon}
                {children}
            </a>
        ) : (
            <Link href={href}>
                <a {...props}>
                    {icon}
                    {children}
                </a>
            </Link>
        )
    ) : (
        <button 
            type={buttonType}
            {...props}
        >
            {icon}
            {children}
        </button>
    )
}