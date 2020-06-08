import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {registerListener, unregisterAllListeners} from 'c/pubsub';
import eplStaticResource from '@salesforce/resourceUrl/epl_logos';
import { getRecord } from 'lightning/uiRecordApi';
import refreshApex from '@salesforce/apex';

export default class ClubDetail extends LightningElement {        
    @track club;    
    @track mapMarkers;
    @track title;
    @wire(CurrentPageReference) pageRef; // Required by pubsub    
    
    connectedCallback(){
        this.title = 'Club details';
        registerListener('clubdetailsview', this.handleClubDetailsView, this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    
    get style(){
        const listOfProperties = [
            'background-color: '+ this.club.Club__r.Primary_Color__c
        ];
        listOfProperties.join(';');
    }

    get url(){
        return eplStaticResource + '/premierLeagueClugLogos/large-png/' + this.club.Club__r.Logo_name__c + '.png'
    }

    handleClubDetailsView(club){        
        this.club = club;
        this.title = club.Name;
        this.mapMarkers = [{
            location : {
                Latitude : club.Club__r.clubLocation__Latitude__s,
                Longitude : club.Club__r.clubLocation__Longitude__s          
            }
        }];     
    }

    renderedCallback(){
        if (this.club){            
            document.documentElement.style.setProperty('--clubBgColor', this.club.Club__r.Primary_Color__c);            
        }        
    }
}