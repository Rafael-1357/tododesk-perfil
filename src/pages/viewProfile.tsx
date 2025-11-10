import NavMenu from '@/components/modules/navMenu'
import UserProfile from '@/components/modules/userProfile'
import { useGeneralStore } from '@/store/general'
import { useParams } from 'react-router'

function ViewProfile() {
  const { name } = useParams<{ name: string }>()
  const users = useGeneralStore((state) => state.users);
  const user = users.find(u => u.id === name);

  if (!user) {
    return (
       <div className="flex min-h-svh max-h-svh min-w-svh overflow-hidden">
        <NavMenu />
        <div className="flex-1 flex items-center justify-center">
          <p>Usuário não encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh max-h-svh min-w-svh overflow-hidden">
      <NavMenu />
      <UserProfile user={user} isMe={false} />
    </div>
  )
}

export default ViewProfile