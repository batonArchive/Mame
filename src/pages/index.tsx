import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { AppContainer } from "../components/appContainer"


type Props = {}

const HomePage: NextPage<Props> = () => {
  useEffect(() => {
    console.log("try to login")
    // login()
  }, [])

  return (
    <AppContainer>
    </AppContainer>
  )
}

export default HomePage
