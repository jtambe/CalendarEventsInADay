// JavaScript source code

$(document).ready(function () {    

var Calendar = (function () {

    function layOutDay(eventList) {

        eventList.sort(function (x, y) {
            return (x.start - y.start);
        });

        var heightCovered = 0;
        var maxEventEnd = 0;
        var top = 0;        

        var subContainerId = 1;
        var eventDiv = "";
        for (var i = 0 ; i < eventList.length; i++) {

            // get height for each event div
            var eventHeight = eventList[i].end - eventList[i].start;

            // because top of each event is relevant to heigth of previous subcontainer
            top = eventList[i].start - heightCovered;
            
            if (i == 0)
            {
                // for first entry, simply create a subContainer and append data
                var subContainer = "<div id=\"sub" + subContainerId + "\" class=\"containEvents\"> </div>";
                $(".events-container").append(subContainer);
                eventDiv = "<div class=\"event\" style=\"height: " + eventHeight + "px; top:" + top + "px;\"> event " + i + ": " + eventList[i].start + " - " + eventList[i].end + " </div>";
                $("#sub" + subContainerId).append(eventDiv);
            }
            if (i > 0 && eventList[i].start < eventList[i - 1].end)
            {
                eventDiv = "<div class=\"event\" style=\"height: " + eventHeight + "px; top:" + top + "px;\"> event " + i + ": " + eventList[i].start + " - " + eventList[i].end + " </div>";
                $("#sub" + subContainerId).append(eventDiv);                
            }
            if (i > 0 && eventList[i].start > eventList[i - 1].end)
            {
                // once a new event occurs in list, with its start outside of previous subContainer's divs' end
                // 1. find maxheight covered by previous subContainer
                // 2. create a new subcontainer
                // 3. calculate new top value on basis of new heightCovered
                // 4. append current event div to subContainer and let iteration continue
                for (var d = 0; d <= i-1; d++)
                {
                    if (maxEventEnd < eventList[d].end) {
                        maxEventEnd = eventList[d].end;
                    }
                }

                heightCovered = maxEventEnd;
                subContainerId = subContainerId + 1;
                var subContainer = "<div id=\"sub"+subContainerId+"\" class=\"containEvents\"> </div>";
                $(".events-container").append(subContainer);

                top = eventList[i].start - heightCovered;
                eventDiv = "<div class=\"event\" style=\"height: " + eventHeight + "px; top:" + top + "px;\"> event " + i + ": " + eventList[i].start + " - " + eventList[i].end + " </div>";
                $("#sub" + subContainerId).append(eventDiv);                                       
                                
            }            
            
        }

    }

    return { layOutDay: layOutDay }

})();
var eventList = [{ start: 30, end: 90 }, { start: 540, end: 600 }, { start: 560, end: 620 }, { start: 610, end: 670 }];
Calendar.layOutDay(eventList);

});

