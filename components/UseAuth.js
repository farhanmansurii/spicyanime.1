import { useEffect, useState } from "react"
import { auth } from "./config/firebase"
const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoggedIn(user && user.uid ? true : false)
    })
  }, [user, isLoggedIn])
  return { user, isLoggedIn }
}
export default useAuth
