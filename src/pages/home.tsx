import NavMenu from '@/components/modules/navMenu'
import UserProfile from '@/components/modules/userProfile'
import { useGeneralStore } from '@/store/general'

function Home() {
  const rafaelUser = useGeneralStore((state) => 
    state.users.find(u => u.id === 'rafael-silveira')
  );

  if (!rafaelUser) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex min-h-svh max-h-svh min-w-svh overflow-hidden">
      <NavMenu />
      <UserProfile user={rafaelUser} isMe={true} />
    </div>
  )
}

export default Home