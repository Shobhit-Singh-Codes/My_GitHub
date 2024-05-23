public class TriggerRouter {
        //Enumeration for trigger event.
        public static Boolean stopTriggerExecution = false;
        public static void route(IT_TriggerInterface handler){
            if(stopTriggerExecution) return;  
            if(Trigger.IsBefore){
                if (Trigger.IsInsert)
                    handler.beforeInsert(trigger.new);
                
                if (Trigger.IsUpdate)
                    handler.beforeUpdate(trigger.newMap, trigger.oldMap);
                
                if (Trigger.IsDelete)
                    handler.beforeDelete(trigger.oldMap);
            } else {
                if (Trigger.IsInsert)
                    handler.afterInsert(Trigger.newMap);
                
                if (Trigger.IsUpdate)
                    handler.afterUpdate(trigger.newMap, trigger.oldMap);
                
                if (trigger.IsDelete)
                    handler.afterDelete(trigger.oldMap);
                
                if (trigger.isUndelete)
                    handler.afterUndelete(trigger.oldMap);
            }
        }
}