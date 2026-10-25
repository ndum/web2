export const teamRoutes = [
  {
    path: '/team',
    // The code of the team area loads only when someone opens it
    component: () => import('./TeamLayout.vue'),
    // The children get the meta fields of the parent as well
    meta: { requiresTeam: true, title: '[%Team am Tresen|Team at the counter%]' },
    children: [
      { path: '', name: 'team-loans', component: () => import('./TeamLoansView.vue') },
      { path: 'returns', name: 'team-returns', component: () => import('./TeamReturnsView.vue') },
    ],
  },
]
