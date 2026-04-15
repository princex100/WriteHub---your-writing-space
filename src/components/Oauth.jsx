// 🔹 React Hooks
import React, { useEffect, useState } from 'react'

// 🔹 OAuth service
import { oAuthservice } from '../config/Oauth.config'

// 🔹 Redux
import { useDispatch, useSelector } from 'react-redux'
import { setgooglelogin, userlogin } from '../store/authslice'

// 🔹 Routing
import { useNavigate } from 'react-router-dom'

// 🔹 Error handling
import { showerr } from '../store/errorslice'

// 🔹 Config service (for storing user info)
import { configService } from '../config/config'

function Oauth() {

  // 🔹 Redux + navigation hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 🔹 Extract query params from URL
  const params = new URLSearchParams(window.location.search)
  const userId = params.get("userId")
  const secret = params.get("secret")

  // 🔹 OAuth type from redux (currently not used)
  const oauth = useSelector(state => state.auth.oauth)

  // 🔹 Effect to handle OAuth login flow
  useEffect(() => {

    // 🔹 Validate required params
    if (!userId || !secret) {
      // Show error if missing credentials
      dispatch(showerr("userid or secret missing"))
      return
    }

    // 🔹 Async function to create session and fetch user
    const get = async () => {
      try {

        // 🔹 Create session using OAuth credentials
        const user = await oAuthservice.createAndGetSession({ userId, secret })

        if (user) {

          // 🔹 Store user info in database
          await configService.setUserInfo({
            email: user.email,
            userId: user.$id,
            username: user.name,
            oauth: "oauth"
          })

          // 🔹 Save user in redux
          dispatch(userlogin(user))

          // 🔹 Redirect to home
          navigate("/")
        }
        else {
          // 🔹 Fallback navigation if no user returned
          navigate("/")
        }

      } catch (error) {

        // 🔹 Handle OAuth errors safely
        dispatch(showerr(error?.message || "OAuth failed"))

      }
    }

    // 🔹 Trigger OAuth flow
    get()

  }, [userId, secret, dispatch, navigate])

  return (
    <>
      {/* 🔹 Loading UI while signing in */}
      <div>
        signing you in....
      </div>
    </>
  )
}

export default Oauth