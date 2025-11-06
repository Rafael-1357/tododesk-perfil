import NavMenu from "./components/modules/navMenu"
import UserProfile from "./components/modules/userProfile"

function App() {
  return (
    <div className="flex min-h-svh max-h-svh min-w-svh overflow-hidden">
      <NavMenu />
      <UserProfile />
    </div>
  )
}

export default App
