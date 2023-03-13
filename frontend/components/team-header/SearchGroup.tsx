import styles from './TeamHeader.module.scss';

const DEFAULT_SHOW_COUNT = 4;
export const SearchGroup: React.FC<{
    totalAmount: number;
    showAmount: number;
    header: string;
    showingMore: boolean;
    toggleShowMore: () => void;
    children: any;
}> = ({ totalAmount, showAmount, header, showingMore, toggleShowMore, children }) => {
    return(
        <div className={styles['search-group']}>
            <div className={styles['search-group-header']}>
                <div className={styles['header-main']}>
                    <span>
                        {header}
                    </span>
                    <span className={styles['search-count']}>
                        Showing {showAmount} of {totalAmount}
                    </span>
                </div>
                {totalAmount > DEFAULT_SHOW_COUNT && (
                    <button onClick={toggleShowMore}>
                        {showingMore ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>
            {children}
        </div>
    )
}