"use client";

import React, { HTMLInputTypeAttribute, ReactElement, useEffect, useImperativeHandle, useRef } from "react";
import styles from './Input.module.scss';

type InputProps = {
    focusOnMount?: boolean;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    name?: string;
    type?: HTMLInputTypeAttribute;
    textArea?: boolean;
    placeholder?: string;
    icon?: ReactElement;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ focusOnMount, containerClassName, inputClassName, onChange, onSubmit, onFocus, onBlur, name, placeholder, icon, textArea=false, type='text' }, ref) => {
    const inputRef = useRef<any>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Handling change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange && onChange(e.currentTarget.value);
    }
    // Handling keypress
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && e.currentTarget.value) {
            onSubmit && onSubmit(e.currentTarget.value);
        }
    }
    // Focusing on mount
    useEffect(() => {
        if(focusOnMount) {
            inputRef.current?.focus();
        }
    }, [focusOnMount]);

    // Creating general properties
    const props = {
        type,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        className: inputClassName,
        onFocus: onFocus,
        onBlur: onBlur,
        name,
        id: name,
        required: true,
        ref: inputRef,
        placeholder
    }

    containerClassName = [
        styles['container'],
        containerClassName
    ].join(' ');
    inputClassName = [
        styles['input'],
        inputClassName
    ].join(' ');
    return(
        <div className={containerClassName}>
            {icon && (
                <label htmlFor={name} aria-label={placeholder}>
                    {icon}
                </label>
            )}
            {textArea ? (
                <textarea 
                    {...props}
                />
            ) : (
                <input 
                    {...props}
                />
            )}
        </div>
    )
})