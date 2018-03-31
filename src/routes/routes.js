const childRoutes = [
  { path: '/home', component: () => import('@/views/Home'), meta: { requiresAuth: true } },
]

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layouts'),
    children: childRoutes,
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    component: () => import('@/components/NotFound'),
    meta: { requiresAuth: false },
  },
]

export default routes
