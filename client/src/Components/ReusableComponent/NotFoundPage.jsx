
import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"
export default function NotFoundPage(){
    return(
        <>
        <section className="bg-gray-400 h-screen roboto-black flex flex-col justify-center items-center">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                        <p className="mb-4 text-3xl md:text-4xl tracking-tight roboto-bold">Page Not Found</p>
                        <p className="mb-4 text-lg md:text-xl font-light roboto-bold">Sorry, we couldn't find the page you're looking for. Explore more on our home page.</p>
            <Link to={"/"}>
            <Button>Home Page</Button>
            </Link>
      
        </div>   
    </div>
</section>
        </>
    )
}