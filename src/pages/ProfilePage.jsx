import LinktreePage from '../components/linktree/LinktreePage'

export default function ProfilePage() {
  // TODO: check from Supabase auth whether logged-in user owns this profile
  const isOwner = true
  return <LinktreePage isOwner={isOwner} />
}
