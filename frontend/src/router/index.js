import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Tables from '@/views/TablesView.vue'
import decode from 'jwt-decode';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = decode(token);
  if (!data) return;
  return date < data.exp;
}

const routes = [

  {
    meta: {
      title: 'Dashboard',
    },
    path: '/',
    name: 'Dashboard',
    component: Home
  },

    {
      meta: {
        title: 'Users'
      },
      path: '/users',
      name: 'Users',
      component: () => import('@/views/CRUD/Users/UsersView.vue'),
    },
    {
      meta: {
        title: 'New Users'
      },
      path: '/users/new',
      name: 'NewUsers',
      component: () => import('@/views/CRUD/Users/UsersNew.vue'),
    },
    {
      meta: {
        title: 'Edit Users'
      },
      path: '/users/:id/edit',
      name: 'EditUsers',
      component: () => import('@/views/CRUD/Users/UsersEdit.vue'),
    },

    {
      meta: {
        title: 'Contacts'
      },
      path: '/contacts',
      name: 'Contacts',
      component: () => import('@/views/CRUD/Contacts/ContactsView.vue'),
    },
    {
      meta: {
        title: 'New Contacts'
      },
      path: '/contacts/new',
      name: 'NewContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Contacts'
      },
      path: '/contacts/:id/edit',
      name: 'EditContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsEdit.vue'),
    },

    {
      meta: {
        title: 'Teams'
      },
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/CRUD/Teams/TeamsView.vue'),
    },
    {
      meta: {
        title: 'New Teams'
      },
      path: '/teams/new',
      name: 'NewTeams',
      component: () => import('@/views/CRUD/Teams/TeamsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Teams'
      },
      path: '/teams/:id/edit',
      name: 'EditTeams',
      component: () => import('@/views/CRUD/Teams/TeamsEdit.vue'),
    },

    {
      meta: {
        title: 'Notes'
      },
      path: '/notes',
      name: 'Notes',
      component: () => import('@/views/CRUD/Notes/NotesView.vue'),
    },
    {
      meta: {
        title: 'New Notes'
      },
      path: '/notes/new',
      name: 'NewNotes',
      component: () => import('@/views/CRUD/Notes/NotesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Notes'
      },
      path: '/notes/:id/edit',
      name: 'EditNotes',
      component: () => import('@/views/CRUD/Notes/NotesEdit.vue'),
    },

    {
      meta: {
        title: 'Jobs'
      },
      path: '/jobs',
      name: 'Jobs',
      component: () => import('@/views/CRUD/Jobs/JobsView.vue'),
    },
    {
      meta: {
        title: 'New Jobs'
      },
      path: '/jobs/new',
      name: 'NewJobs',
      component: () => import('@/views/CRUD/Jobs/JobsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Jobs'
      },
      path: '/jobs/:id/edit',
      name: 'EditJobs',
      component: () => import('@/views/CRUD/Jobs/JobsEdit.vue'),
    },

    {
      meta: {
        title: 'Roles'
      },
      path: '/roles',
      name: 'Roles',
      component: () => import('@/views/CRUD/Roles/RolesView.vue'),
    },
    {
      meta: {
        title: 'New Roles'
      },
      path: '/roles/new',
      name: 'NewRoles',
      component: () => import('@/views/CRUD/Roles/RolesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Roles'
      },
      path: '/roles/:id/edit',
      name: 'EditRoles',
      component: () => import('@/views/CRUD/Roles/RolesEdit.vue'),
    },

    {
      meta: {
        title: 'Trades'
      },
      path: '/trades',
      name: 'Trades',
      component: () => import('@/views/CRUD/Trades/TradesView.vue'),
    },
    {
      meta: {
        title: 'New Trades'
      },
      path: '/trades/new',
      name: 'NewTrades',
      component: () => import('@/views/CRUD/Trades/TradesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Trades'
      },
      path: '/trades/:id/edit',
      name: 'EditTrades',
      component: () => import('@/views/CRUD/Trades/TradesEdit.vue'),
    },

    {
      meta: {
        title: 'Templates'
      },
      path: '/templates',
      name: 'Templates',
      component: () => import('@/views/CRUD/Templates/TemplatesView.vue'),
    },
    {
      meta: {
        title: 'New Templates'
      },
      path: '/templates/new',
      name: 'NewTemplates',
      component: () => import('@/views/CRUD/Templates/TemplatesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Templates'
      },
      path: '/templates/:id/edit',
      name: 'EditTemplates',
      component: () => import('@/views/CRUD/Templates/TemplatesEdit.vue'),
    },

    {
      meta: {
        title: 'Estimates'
      },
      path: '/estimates',
      name: 'Estimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesView.vue'),
    },
    {
      meta: {
        title: 'New Estimates'
      },
      path: '/estimates/new',
      name: 'NewEstimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Estimates'
      },
      path: '/estimates/:id/edit',
      name: 'EditEstimates',
      component: () => import('@/views/CRUD/Estimates/EstimatesEdit.vue'),
    },

    {
      meta: {
        title: 'Appointment'
      },
      path: '/appointment',
      name: 'Appointment',
      component: () => import('@/views/CRUD/Appointment/AppointmentView.vue'),
    },
    {
      meta: {
        title: 'New Appointment'
      },
      path: '/appointment/new',
      name: 'NewAppointment',
      component: () => import('@/views/CRUD/Appointment/AppointmentNew.vue'),
    },
    {
      meta: {
        title: 'Edit Appointment'
      },
      path: '/appointment/:id/edit',
      name: 'EditAppointment',
      component: () => import('@/views/CRUD/Appointment/AppointmentEdit.vue'),
    },

    {
      meta: {
        title: 'Images'
      },
      path: '/images',
      name: 'Images',
      component: () => import('@/views/CRUD/Images/ImagesView.vue'),
    },
    {
      meta: {
        title: 'New Images'
      },
      path: '/images/new',
      name: 'NewImages',
      component: () => import('@/views/CRUD/Images/ImagesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Images'
      },
      path: '/images/:id/edit',
      name: 'EditImages',
      component: () => import('@/views/CRUD/Images/ImagesEdit.vue'),
    },

    {
      meta: {
        title: 'Documents'
      },
      path: '/documents',
      name: 'Documents',
      component: () => import('@/views/CRUD/Documents/DocumentsView.vue'),
    },
    {
      meta: {
        title: 'New Documents'
      },
      path: '/documents/new',
      name: 'NewDocuments',
      component: () => import('@/views/CRUD/Documents/DocumentsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Documents'
      },
      path: '/documents/:id/edit',
      name: 'EditDocuments',
      component: () => import('@/views/CRUD/Documents/DocumentsEdit.vue'),
    },

  {
    meta: {
      title: 'Change Password'
    },
    path: '/change_password',
    name: 'Change Password',
    component: () => import('@/views/ChangePasswordView.vue'),
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
    {
      meta: {
        title: 'Register',
        fullScreen: true
      },
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      meta: {
        title: 'Verify',
        fullScreen: true
      },
      path: '/verify-email',
      name: 'Verify',
      component: () => import('@/views/VerifyEmailView.vue')
    },
    {
      meta: {
        title: 'Forgot',
        fullScreen: true
      },
      path: '/forgot',
      name: 'Forgot',
      component: () => import('@/views/ForgotPasswordView.vue')
    },
    {
      meta: {
        title: 'Reset',
        fullScreen: true
      },
      path: '/password-reset',
      name: 'Reset',
      component: () => import('@/views/ResetPasswordView.vue')
    },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
    {
      meta: {
        title: 'Starter',
        fullScreen: true
      },
      path: '/starter',
      name: 'Starter',
      component: () => import('@/views/StarterView.vue')
    },
    {
        meta: {
          title: 'Profile',
        },
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue')
      }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(async (to, from) => {
  if (
    !isAuthenticated() && !['Login', 'Register', 'Verify', 'Reset', 'Forgot', 'Starter'].includes(to.name)
  ) {
    return { name: 'Starter' }
  }
})

export default router
