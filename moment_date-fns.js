const df = require("date-fns")

class moment{

  constructor(date=new Date(),format){

        if(!format){
          this.date = date;
        }
        else
          this.date = df.parse(date,format,new Date())

        var mmnt = this;

        //"MM/dd/yyyy hh:mm:ss a"
        this.format=function(format){
          return df.format( mmnt.date,format)
        }

        this.formatISO = function(){
          return df.formatISO(mmnt.date)
        }

        this.toDate = function(){
          return mmnt.date;
        }

        /*
        {
          years: 2,
          months: 9,
          weeks: 1,
          days: 7,
          hours: 5,
          minutes: 9,
          seconds: 30,
        }
        */
        this.add=function(duration,interval){

          if(interval.charAt(interval.length-1)!="s"){
            interval+="s";
          }

          mmnt.date = df.add(mmnt.date, {
            [interval]:duration
          })

          return mmnt;
        }

        this.isBefore = function(m){
          return df.isBefore(mmnt.date,m)
        }
        this.isAfter = function(m){
          return df.isAfter(mmnt.date,m)
        }
        this.isSameOrAfter=function(m){
          return df.isAfter(mmnt.date,m) || df.isEqual(mmnt.date,m)
        }
        this.isSameOrBefore=function(m){
          return df.isBefore(mmnt.date,m) || df.isEqual(mmnt.date,m)
        }
        this.diff = function(m,interval){
          if(interval.charAt(interval.length-1)!="s"){
            interval+="s";
          }
          interval = interval.charAt(0).toUpperCase() + interval.substring(1,interval.length);
          return df["differenceIn"+interval](mmnt.date,m.date)
        }

        this.valueOf = function(){
          return (mmnt.date.valueOf())
        }

  }

  static min(m1,m2){
    if(df.isBefore(
      m1.date,
      m2.date
    )){
      return m1
    }
    else{
      return m2
    }
  }

}
