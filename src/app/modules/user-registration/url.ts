import { CONSTANTS } from "../../classes/constants";

const PREFIX = CONSTANTS.api_base_url + '';

export const URL = {
    sign_up: PREFIX + '/user/sign-up',
    sign_up_verified: PREFIX + '/user/sign-up/verified',
    get_registration_details: PREFIX + '/user/sign-up/details'
};