trigger OpportunityTrigger on Opportunity (before insert, after insert, before update, after update) {
    TriggerRouter.route(new OpportunityTriggerHandler());
}