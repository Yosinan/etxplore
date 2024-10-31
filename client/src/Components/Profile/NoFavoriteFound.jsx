import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export default function NoFavoriteFound(){
    return(
        <>
        <div className="flex flex-col  gap-4 justify-center items-center h-96">
            <div className="text-center roboto-black text-2xl md:text-3xl">
                No favorite found 
            </div>
            <Link to={"/posts"}>
            <Button>Post page</Button>
            </Link>
        </div>
        </>
    )
}