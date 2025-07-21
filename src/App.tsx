import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute
} from '@tanstack/react-router';
import RootLayout from './routes/__root';
import Index from './routes/index';

const rootRoute = createRootRoute({
  component: RootLayout
})

const indexRoute = createRoute({
  getParentRoute: ()=> rootRoute,
  path: '/',
  component: Index
})

const routeTree = rootRoute.addChildren([
  indexRoute
])

const router = createRouter({
  routeTree
})

declare module '@tanstack/react-router'{
  interface Register {
    router: typeof router;
  }
}

export default function App(){
  return <RouterProvider router={router} />
}