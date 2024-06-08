import {
    Navigate,
    Route,
    BrowserRouter,
    Routes
} from "react-router-dom";
import {ReactNode} from "react";
import {routers} from "app/providers/RouterProvider/entities/RouterProvider.entities.tsx";

export const RouterProvider = () => {

    const isAuthenticated = true

    const PrivateRoute = ({children}:{children:ReactNode}) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return <BrowserRouter>
        <Routes>
            {routers.map((router)=>{
                if(router.path === '/' || router.path === '/login'){
                    return  <Route path={router.path} element={router.element} />
                }
                return  <Route path={router.path} element={<PrivateRoute>{router.element}</PrivateRoute>} />
            })}
        </Routes>
    </BrowserRouter>
};