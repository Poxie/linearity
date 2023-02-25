export default function Group({ params: { groupId } }: {
    params: { groupId: number }
}) {
    return(
        <div>
            {groupId}
        </div>
    )
}