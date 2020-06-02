import { LightningElement, wire, track } from 'lwc';
import searchClubsByLeague from '@salesforce/apex/FootballManagerController.searchClubsByLeague';


export default class CompetitionStandings extends LightningElement {
    @track clubSearchText;
    @track clubs;

    @wire(searchClubsByLeague, { leagueName : 'English Premier League' })
    loadClubData(result){
            if (result.data){                
                this.clubs = result.data;
            }                    
    }
}