import styles from './EditableText.module.scss';
import { useRef, useState } from "react";
import { Input } from "../input";

export const EditableText: React.FC<{
    requiresValue?: boolean;
    onChange?: (text: string) => void;
    placeholder?: string;
    defaultValue?: string | null;
    size?: 'default' | 'large'
}> = ({ defaultValue, placeholder, requiresValue, onChange, size='default' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        if(!ref.current) return;

        const text = ref.current.value;
        if(requiresValue && !text) return setIsEditing(false);

        if(onChange) onChange(text);
        setIsEditing(false);
    }
    
    const className = [
        styles['text'],
        styles[size]
    ].join(' ');
    return(
        (isEditing || !defaultValue) ? (
            <Input 
                placeholder={placeholder}
                onBlur={handleBlur}
                defaultValue={defaultValue || ''}
                onSubmit={handleBlur}
                focusOnMount
                ref={ref}
            />
        ) : (
            <button 
                onClick={() => setIsEditing(true)}
                className={className}
            >
                {defaultValue}
            </button>
        )
    )
}