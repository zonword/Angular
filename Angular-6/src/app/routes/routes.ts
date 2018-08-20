import { AuthGuard } from './../guards/auth.guard'
import { AuthedGuard } from './../guards/authed.guard'

/*export const ROUTES = [
    {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [AuthedGuard]
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthedGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [AuthedGuard]
    },
    {
        path: 'user/profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: WallComponent
            },
            {
                path: 'edit',
                component: EditProfileComponent 
            }
        ]
    },
    {
        path: 'create/joke',
        component: CreateJokeComponent
    }
]*/
