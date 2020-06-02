public with sharing class FootballManagerController {

    @AuraEnabled (Cacheable = true)
    public static List<Competition_Participation__c> getAllClubs(){
        return [SELECT Id, Games_played__c, Goal_difference__c, Points__c, Club__r.Logo_name__c, Club__c, Competition__c, Name, Position__c,
                       Club__r.website__c, Club__r.stadiumName__c, Club__r.Primary_Color__c, Club__r.clubLocation__Longitude__s, Club__r.clubLocation__Latitude__s
                  FROM Competition_Participation__c 
                  ORDER BY Position__c ASC LIMIT 40];        
    }

    @AuraEnabled (Cacheable = true)
    public static List<Competition_Participation__c> searchClubsByLeague(String leagueName){

        if (leagueName == ''){
            return getAllClubs();
        } else {
            //to replace where clause
        leagueName = '%' + leagueName + '%';
        return [SELECT Id, Games_played__c, Goal_difference__c, Points__c, Club__r.Logo_name__c, Club__c, Competition__c, Name, Position__c,
                       Club__r.website__c, Club__r.stadiumName__c, Club__r.Primary_Color__c, Club__r.clubLocation__Longitude__s, Club__r.clubLocation__Latitude__s
                  FROM Competition_Participation__c 
                 WHERE Competition__r.Name LIKE :leagueName ORDER BY Position__c ASC];
        }        
    }

    @AuraEnabled (Cacheable = true)
    public static List<Competition__c> getAllCompetitions(){
        return [SELECT Id, Name FROM Competition__c];
    }

    @AuraEnabled (Cacheable = true)
    public static List<Competition__c> getCompetitionByName(String competitionName){
        if (competitionName == '') {
            return getAllCompetitions();
        } else {
            competitionName = '%' + competitionName + '%';
            return [SELECT Id, Name FROM Competition__c WHERE Name LIKE :competitionName];
        }
    }
}