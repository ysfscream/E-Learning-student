const childRoutes = [
  { path: '/home', component: () => import('@/views/Home'), meta: { requiresAuth: false } },
  { path: '/docsView/:id', component: () => import('@/views/Docs/DocsView'), meta: { requiresAuth: true } },
  { path: '/videosView/:id', component: () => import('@/views/Videos/videosView'), meta: { requiresAuth: true } },
  { path: '/tags/:tag', component: () => import('@/views/Tags/TagsView'), meta: { requiresAuth: true } },
  { path: '/popular/', component: () => import('@/views/Platform/MostPopular'), meta: { requiresAuth: true } },
  { path: '/news/', component: () => import('@/views/Platform/TheNewest'), meta: { requiresAuth: true } },
  { path: '/likes/', component: () => import('@/views/Platform/LikeBest'), meta: { requiresAuth: true } },
  { path: '/allShares/', component: () => import('@/views/Platform/AllShares'), meta: { requiresAuth: true } },
  { path: '/editInfo/:id', component: () => import('@/views/Platform/EditInfo'), meta: { requiresAuth: true } },
  { path: '/changePassword/:id', component: () => import('@/views/Platform/ChangePassword'), meta: { requiresAuth: true } },
]

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layouts'),
    children: childRoutes,
    meta: { requiresAuth: false },
  },
  {
    path: '*',
    component: () => import('@/components/NotFound'),
    meta: { requiresAuth: false },
  },
]

export default routes
