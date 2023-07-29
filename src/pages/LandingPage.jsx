import Login from "../components/Authentication/Login"
import Register from "../components/Authentication/Register"

const LandingPage = () => {

    return (
        <>
            {<Login /> || <Register />}
        </>
    )
}

export default LandingPage
