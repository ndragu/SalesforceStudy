import { LightningElement, api } from 'lwc';
import eplStaticResource from '@salesforce/resourceUrl/epl_logos';

export default class ClubLogoToWebsite extends LightningElement {
    @api club;
    get url(){
        return eplStaticResource + '/premierLeagueClugLogos/large-png/' + this.club.Club__r.Logo_name__c + '.png'
    }
}