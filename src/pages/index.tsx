import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { updateProfile } from "../repositories/update-profile"
import { profiles } from "../repositories/get-profiles"


type Props = {}

const HomePage: NextPage<Props> = () => {
  useEffect(() => {
    //profiles()
    updateProfile("0x02ca");
  }, [])

  return (
    <p>
      Hello
    </p>
  )
}

export default HomePage
