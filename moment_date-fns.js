
const df = require("date-fns")
function isAlpha(str) {
        return /^[A-Za-z]+$/.test(str);
      }
module.exports= class moment{

  constructor(date=new Date(),format){

        if(!format){
          this.date = date;
        }
        else{
          if(date.length<format.length){
            let s = "";
            var frm = "";
            for(var i=date.length;i<format.length;i+=1){
              if(isAlpha(format.charAt(i))){
                frm+=format.charAt(i)
              }
              else{

                if(frm)
                  switch(frm){
                    case "hh":
                      s+="12"
                      break;
                    case "mm":
                      s+="00"
                      break;
                    case "ss":
                      s+="00"
                      break;
                    case "a":
                      s+="AM";
                      break;

                    case "MM":
                      s+="01"
                      break;
                    case "dd":
                      s+="01"
                      break;
                    case "yyyy":
                      s+=(new Date).getFullYear();
                      break;

                    default:
                      s+="0"
                    break;
                  }

                frm = "";

                s+=format.charAt(i);
              }
            }
            if(frm)
              switch(frm){
                case "hh":
                  s+="12"
                  break;
                case "mm":
                  s+="00"
                  break;
                case "ss":
                  s+="00"
                  break;
                case "a":
                  s+="AM";
                  break;

                case "MM":
                  s+="01"
                  break;
                case "dd":
                  s+="01"
                  break;
                case "yyyy":
                  s+=(new Date).getFullYear();
                  break;

                default:
                  s+="0"
                break;
              }

            date+=s;
            console.log(date);
            console.log(format)
          }
          this.date = df.parse(date,format/*.substring(0,date.length)*/,new Date())
        }
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

        let parseInterval = function(interval){
          return {
            "m":"minutes",
            "h":"hours",
            "d":"days",
            "w":"weeks",
            "M":"months",

            "minute":"minutes",
            "minutes":"minutes",
            "hour":"hours",
            "hours":"hours",
            "day":"days",
            "days":"days",
            "week":"weeks",
            "month":"months",

          }[interval]
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
          interval = parseInterval(interval)
          /*
          if(interval.charAt(interval.length-1)!="s"){
            interval+="s";
          }
          */
          mmnt.date = df.add(mmnt.date, {
            [interval]:duration
          })

          return mmnt;
        }

        this.subtract=function(duration,interval){
          interval = parseInterval(interval)
          /*if(interval.charAt(interval.length-1)!="s"){
            interval+="s";
          }*/

          mmnt.date = df.sub(mmnt.date, {
            [interval]:duration
          })

          return mmnt;
        }

        this.utc = function(){
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
          interval = parseInterval(interval)
          //console.log(interval)
          /*if(interval.charAt(interval.length-1)!="s"){
            interval+="s";
          }*/
          interval = interval.charAt(0).toUpperCase() + interval.substring(1,interval.length);
          var diff = df["differenceIn"+interval](mmnt.date,m.date);
          return diff
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
