import NavMenu from '@/components/modules/navMenu'
import SearchProfileContent from '@/components/modules/searchProfileContent'

function SearchProfile() {
  return (
    <div className="flex min-h-svh max-h-svh min-w-svh overflow-hidden">
      <NavMenu />
      <SearchProfileContent />
    </div>
  )
}

export default SearchProfile