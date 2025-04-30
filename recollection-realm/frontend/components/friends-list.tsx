interface FriendsListProps {
  title: string
  friends: string[]
}

export function FriendsList({ title, friends }: FriendsListProps) {
  return (
    <div>
      <div className="bg-purple-400 rounded-md py-2 px-4 text-white mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <ul className="space-y-2">
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-yellow-200"></div>
            <span>{friend}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
