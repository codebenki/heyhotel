import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute
} from '@tanstack/react-router';
import RootLayout from './routes/__root';
import Index from './routes/index';
import Hotels from './routes/Hotels';

const rootRoute = createRootRoute({
  component: RootLayout
})

const indexRoute = createRoute({
  getParentRoute: ()=> rootRoute,
  path: '/',
  component: Index
})

const hotelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:'/hotels',
  component: Hotels,
  validateSearch: (search) => {
    const destination = String(search.destination)
    const guests = Number(search.guests ?? 1)

    let checkInDate: Date | undefined
    if (typeof search.checkInDate === 'string') {
      const date = new Date(search.checkInDate)
      if (!isNaN(date.getDate())) {
        checkInDate = date
      } else {
        throw new Error('Invalid checkInDate')
      }
    }

    let checkOutDate: Date | undefined
    if (typeof search.checkOutDate === 'string') {
      const date = new Date(search.checkOutDate)
      if (!isNaN(date.getDate())) {
        checkOutDate = date
      } else {
        throw new Error('Invalid checkInDate')
      }
    }

    return {
      destination,
      guests,
      checkInDate,
      checkOutDate,
    }
  }
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  hotelRoute
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