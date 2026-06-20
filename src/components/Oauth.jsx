import React, { useEffect } from 'react'import { oAuthservice } from '../config/Oauth.config'import { useDispatch } from 'react-redux'
import { userlogin } from '../store/authslice'import { useNavigate } from 'react-router-dom'import { showerr } from '../store/errorslice'import { configService } from '../config/config'

function Oauth() {  const dispatch = useDispatch()
  const navigate = useNavigate()  const params = new URLSearchParams(window.location.search)
  const userId = params.get("userId")
  const secret = params.get("secret")  useEffect(() => {    if (!userId || !secret) {
      // Show error if missing credentials
      dispatch(showerr("userid or secret missing"))
      return
    }    const get = async () => {
      try {        const user = await oAuthservice.createAndGetSession({ userId, secret })

        if (user) {          await configService.setUserInfo({
            email: user.email,
            userId: user.$id,
            username: user.name,
            oauth: "oauth"
          })          dispatch(userlogin(user))          navigate("/")
        }
        else {          navigate("/")
        }

      } catch (error) {        dispatch(showerr(error?.message || "OAuth failed"))

      }
    }    get()

  }, [userId, secret, dispatch, navigate])

  return (
    <>      <div>
        signing you in....
      </div>
    </>
  )
}

export default Oauth