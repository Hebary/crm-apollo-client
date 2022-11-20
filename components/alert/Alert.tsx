import React from 'react'

interface AlertProps {
    message: string | null | undefined
}
export const Alert : React.FC<AlertProps> = ({ message }) => {
    
    return ( 
        <div className="bg-black py-2 px-3 my-3 w-full max-w-sm tracking-wider  text-center border-l-2 border-white animate font-bold text-white mx-auto">
            <p>{message}</p>
        </div>
     );
}

