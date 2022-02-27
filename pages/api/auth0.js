
const domain = process.env.AUTH0_ISSUER_BASE_URL
const clientID = Process.env.AUTH0_CLIENT_ID
import { Auth0Provider } from '@auth0/auth0-react';


const auth0Thing = () => {return(
    <Auth0Provider>
        domain = {domain}
        clientId = {clientID}
        redirectURi = {window.location.origin}
    </Auth0Provider>
)}

export default auth0Thing