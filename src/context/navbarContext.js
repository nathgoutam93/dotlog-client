import React, { useContext, useState } from 'react'

const NavbarContext = React.createContext()

export function useNavbar(){
    return useContext(NavbarContext)
}

export default function NavProvider({children}) {

    const [show, setShow] = useState(true);

    const value = {
        show,
        setShow,
    }

    return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
}
