const signin = () =>
    import ('../../views/SignIn.vue')
const SignUp = () =>
    import ('../../views/SignUp.vue')
const Profile = () =>
    import ('../../views/Profile.vue')
const Faq = () =>
    import ('../../views/Faq.vue')
const PrivacyPolicy = () =>
    import ('../../views/PrivacyPolicy.vue')
const TermsAndCondition = () =>
    import ('../../views/TermsAndCondition.vue')
const Help = () =>
    import ('../../views/Help.vue')
const Support = () =>
    import ('../../views/Support.vue')
const ForgotPassword = () =>
    import ('../../views/ForgotPassword.vue')
const Wallet = () =>
    import ('../../views/Wallet.vue')
const WalletPayment = () =>
    import ('../../views/WalletPayment.vue')
const notfound = () =>
    import ('../../views/404.vue')

const user = [{
        path: 'sign-in',
        name: 'sign-in',
        component: signin
    },
    {
        path: 'sign-up',
        name: 'sign-up',
        component: SignUp
    },
    {
        path: 'profile',
        name: 'profile',
        component: Profile
    },
    {
        path: 'faq',
        name: 'faq',
        component: Faq
    },
    {
        path: 'privacypolicy',
        name: 'privacypolicy',
        component: PrivacyPolicy
    },
    {
        path: 'terms',
        name: 'terms',
        component: TermsAndCondition
    },
    {
        path: 'help',
        name: 'help',
        component: Help
    },
    {
        path: 'support',
        name: 'support',
        component: Support
    },
    {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPassword
    },
    {
        path: 'wallet',
        name: 'wallet',
        component: Wallet
    },
    {
        path: 'wallet-payment',
        name: 'wallet-payment',
        component: WalletPayment
    },
    {
        path: 'notfound',
        name: 'notfound',
        component: notfound
    }
]

export default user;