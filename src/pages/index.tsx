import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"


type Props = {}

const HomePage: NextPage<Props> = () => {
  useEffect(() => {
    console.log("try to login")
    login()
  }, [])

  return (
    <p>
      Hello
    </p>
  )
}

export default HomePage
