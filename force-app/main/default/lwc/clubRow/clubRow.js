import { LightningElement, api, wire } from 'lwc';
import eplStaticResource from '@salesforce/resourceUrl/epl_logos';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class ClubRow extends LightningElement {
    @api club;
    @wire(CurrentPageReference) pageRef;

    clubLogoName = '';    
    get url(){
        return eplStaticResource + '/premierLeagueClugLogos/large-png/' + this.club.Club__r.Logo_name__c + '.png'
    }

    handleTileClick(){              
        fireEvent(this.pageRef, 'clubdetailsview', this.club);
    }
}