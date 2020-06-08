import { LightningElement, wire, track } from 'lwc';
import searchClubsByLeague from '@salesforce/apex/FootballManagerController.searchClubsByLeague';

export default class ClubSites extends LightningElement {
    @track clubs;

    @wire(searchClubsByLeague, { leagueName : 'English Premier League' })
    loadClubData(result){                        
            if (result.data){        
                //sort clubs by club name        
                let clubObjects = result.data.slice().sort(this.compare);                
                this.clubs = clubObjects;                
            }            
    }

    compare(clubA, clubB){
        let clubNameA = clubA.Name.toUpperCase();
        let clubNameB = clubB.Name.toUpperCase();

        let comparison = 0;

        if (clubNameA > clubNameB){
            comparison = 1;
        } 
        else if (clubNameB > clubNameA) {
            comparison = -1;
        } 

        return comparison;
    }
}