import ENV from '@/config/env.variables';

const apiRoutes = {
  baseUrl: () => ENV.BASE_URL,
  health: () => '/health' as const, // ! make this api
  auth: {
    me: () => '/auth/me' as const,
    signIn: () => '/auth/login' as const,
    refresh: () => '/auth/refresh' as const,
    signUp: () => '/auth/register' as const,
    oAuthSignIn: () => '/auth/oauth/login' as const,
  },
  users: {
    getUsers: () => '/users' as const,
  },

  services: {
    emailContactUs: () => '/services/email/contact-us' as const,
    emailProperty: () => '/services/email/property' as const,
  },

  regions: {
    create: () => '/regions' as const,
    getAll: () => '/regions' as const,
    getById: (id: string) => `/regions/${id}` as const,
    update: (id: string) => `/regions/${id}` as const,
    delete: (id: string) => `/regions/${id}` as const,
    order: () => `/regions/order` as const,
  },

  majors: {
    create: () => '/majors' as const,
    getAll: () => '/majors' as const,
    getById: (id: string) => `/majors/${id}` as const,
    update: (id: string) => `/majors/${id}` as const,
    delete: (id: string) => `/majors/${id}` as const,
  },

  electives: {
    create: () => '/electives' as const,
    getAll: () => '/electives' as const,
    getById: (id: string) => `/electives/${id}` as const,
    update: (id: string) => `/electives/${id}` as const,
    delete: (id: string) => `/electives/${id}` as const,
  },

  directors: {
    update: (id: string) => `/directors/${id}` as const,
    delete: (id: string) => `/directors/${id}` as const,
  },

  middleSchools: {
    create: () => '/middle-schools' as const,
    getAll: () => '/middle-schools' as const,
    getById: (id: string) => `/middle-schools/${id}` as const,
    update: (id: string) => `/middle-schools/${id}` as const,
    delete: (id: string) => `/middle-schools/${id}` as const,
  },

  highSchools: {
    create: () => '/high-schools' as const,
    getAll: () => '/high-schools' as const,
    getById: (id: string) => `/high-schools/${id}` as const,
    update: (id: string) => `/high-schools/${id}` as const,
    delete: (id: string) => `/high-schools/${id}` as const,
  },

  images: ENV.BASE_URL + '/images/',

  getSignedUrl: ENV.BASE_URL + '/images/getSignedUrl',
};

export default apiRoutes;
