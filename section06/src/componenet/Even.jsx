import {useEffect} from "react";


const Even = () => {
    // unMount
    useEffect(() => {
        return () => {
            console.log('unMount');
        }
    }, [])
    return <div>Even!</div>
}

export default Even