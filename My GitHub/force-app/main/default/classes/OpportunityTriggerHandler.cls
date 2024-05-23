public class OpportunityTriggerHandler implements IT_TriggerInterface{
	void beforeInsert(List<sObject> newItems){
        //Get object from child Query
		Account acc = [Select Id , (Select Id From Contacts LIMIT 1) From Account Where Id = '0012w000004zC6SAAU'];
		Contact con = (Contact)acc.Contacts;
		
        //Get Parent Object from Child
		Contact conn = [Select Id, Account.Name, Account.Website From Contact where Id = '0032w0000031qHdAAI'];
		Account act = (Account)conn.getSObject('Account');
	}
	void beforeUpdate(Map<Id, sObject> newItems, Map<Id, sObject> oldItems){}
	void beforeDelete(Map<Id, sObject> oldItems){}
	void AfterInsert(Map<Id, sObject> newItems){}
	void AfterUpdate(Map<Id, sObject> newItems, Map<Id, sObject> oldItems){}
	void afterDelete(Map<Id, sObject> oldItems){}
	void afterUndelete(Map<Id, sObject> oldItems){}
}