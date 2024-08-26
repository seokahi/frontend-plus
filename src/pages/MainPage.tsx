import { Outlet } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"


const  MainPage:React.FC = ()=> {
    return (
        <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
            <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
                <Header/>
            </header>
            <main className="container mx-auto mt-10 p-4">
                <Outlet/>
            </main>
            <footer className="p-4 pb-12 w-full border-t border-t-slate-200  dark:border-t-slate-500 dark:bg-gray-600 text-gray-600 dark:text-white transition-color duration-500 ease-in-out">
                <Footer/>
            </footer>
        </div>
    )
}

export default MainPage