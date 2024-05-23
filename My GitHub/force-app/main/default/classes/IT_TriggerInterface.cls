public interface IT_TriggerInterface {
    void beforeInsert(List<sObject> newItems);
    void beforeUpdate(Map<Id, sObject> newItems, Map<Id, sObject> oldItems);
    void beforeDelete(Map<Id, sObject> oldItems);
    void AfterInsert(Map<Id, sObject> newItems);
    void AfterUpdate(Map<Id, sObject> newItems, Map<Id, sObject> oldItems);
    void afterDelete(Map<Id, sObject> oldItems);
    void afterUndelete(Map<Id, sObject> oldItems);
}