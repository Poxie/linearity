import { motion } from 'framer-motion';
import { useModal } from '@/contexts/modal';
import { usePortal } from '@/contexts/portal';
import { EditTaskModal } from '@/modals/edit-task/EditTaskModal';
import { MemberPortal } from '@/portals/member/MemberPortal';
import { useAppSelector } from '@/redux/store';
import { selectTasksByTeam, selectTeamMembers } from '@/redux/teams/selectors';
import { LabelList } from '../label-list/LabelList';
import { UserAvatar } from '../user-avatar';
import { SearchGroup } from './SearchGroup';
import styles from './TeamHeader.module.scss';

const SHOW_COUNT = 4;
export const TeamHeaderSearchResults: React.FC<{
    search: string;
    teamId: number;
    close: () => void;
}> = ({ search, teamId, close }) => {
    const { setModal } = useModal();
    const { setPortal } = usePortal();

    const openMemberPortal = (memberId: number) => setPortal(<MemberPortal teamId={teamId} userId={memberId} />);
    const openTaskModal = (taskId: number) => setModal(<EditTaskModal taskId={taskId} />);

    const members = useAppSelector(state => selectTeamMembers(state, teamId));
    const tasks = useAppSelector(state => selectTasksByTeam(state, teamId));

    const filteredMembers = (
        members.filter(member => 
            member.name.toLowerCase().includes(search.toLowerCase()
        ))
    ).slice(0, SHOW_COUNT);
    const filteredTasks = (
        tasks.filter(task => 
            task.title.toLowerCase().includes(search.toLowerCase())    
        )
    ).slice(0, SHOW_COUNT);

    const empty = !filteredMembers.length && !filteredTasks.length;
    return(
        <motion.div 
            className={styles['search-results']}
            exit={{ opacity: 0, scale: .95 }}
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {empty && (
                <span className={styles['empty']}>
                    Nothing is matchning the search.
                </span>
            )}

            {filteredMembers.length !== 0 && (
                <SearchGroup header={'Members'}>
                    <ul className={styles['search-list']}>
                        {filteredMembers.map(member => (
                            <li>
                                <button 
                                    className={styles['search-item']}
                                    onClick={() => {
                                        openMemberPortal(member.id);
                                        close();
                                    }}
                                >
                                    <div className={styles['item-main']}>
                                        <UserAvatar 
                                            name={member.name}
                                            avatar={member.avatar}
                                            className={styles['avatar']}
                                        />
                                        <span>
                                            {member.name}
                                        </span>
                                    </div>
                                    <span className={styles['item-right']}>
                                        {member.task_count} issues
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </SearchGroup>
            )}
            {filteredTasks.length !== 0 && (
                <SearchGroup header={'Issues'}>
                    <ul className={styles['search-list']}>
                        {filteredTasks.map(task => (
                            <li>
                                <button 
                                    className={styles['search-item']}
                                    onClick={() => {
                                        openTaskModal(task.id);
                                        close();
                                    }}
                                >
                                    <div className={styles['item-main']}>
                                        <span>
                                            {task.title}
                                        </span>
                                    </div>
                                    <LabelList 
                                        labels={task.labels}
                                        small
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </SearchGroup>
            )}
        </motion.div>
    )
}