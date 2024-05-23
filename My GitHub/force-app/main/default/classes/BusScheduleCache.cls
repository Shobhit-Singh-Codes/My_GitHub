public class BusScheduleCache {
    private Cache.OrgPartition part;
    public  BusScheduleCache(){
        Cache.OrgPartition partNew = new Cache.OrgPartition('local.BusSchedule');
        part = partNew;
    }
    public void putSchedule(String busLine, Time[] schedule){
        part.put(busLine, schedule);
    }
    public Time[] getSchedule(String busLine){
        Time[] tArray = new Time[]{};
        if(part != null && part.get(busLine) != null){
            tArray = (Time[])(part.get(busLine));
        }
        else{
            tArray.add(Time.newInstance(8,0,0,0));
            tArray.add(Time.newInstance(17,0,0,0));
        }
        return tArray;
    }
}