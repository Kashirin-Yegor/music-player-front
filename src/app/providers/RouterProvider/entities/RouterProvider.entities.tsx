import {Dashboard} from "pages/Dashboard";

export const routers = [
    {
        path:'/',
        element:<>home</>
    },
    {
        path:'/login',
        element:<>login</>
    },
    {
        path:'/dashboard',
        element:<Dashboard />
    },
    {
        path:'*',
        element:<>Not Found</>
    },
]