$(document).ready(function() {

    // Create html of the timeblocks
    
    for (var i = 9; i <= 17; i++){
        //$('.container').append(`<div class="row time-block" data-time="${i}"> 
        //<div class="col-sm col-md-2 hour"> 
          //  <p>${i}00hrs</p> 
        //</div> 
        //<div class="col-sm col-md-8 d-flex description"> 
           // <textarea></textarea> 
        //</div> 
        //<div class="col-sm col-md-2 saveBtn"> 
          //  <i class="far fa-save fa-2x"></i> 
        //</div> 
        //</div>`);
        if (i <= 11){
            var t1 = i + ":00 "
            $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t1}AM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
        }
        else if(i == 12){
                var t2 = i +":00 "
                $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t2}PM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
            }
        else{
            var t3 = (i - 12)+":00 ";
            $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t3}PM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
            }
    }
    
    
    let timeTrackObject = {};
        //Checks if local storage exists, if it doesn't load preset data to array.<fixed>
        if (localStorage.getItem('timeTrackObject')) {
            timeTrackObject = JSON.parse(localStorage.getItem('timeTrackObject'));
        }else{
            timeTrackObject = {
                '9': { time: "9", value: ""},
                '10':{ time: "10", value: ""},
                '11':{ time: "11", value: ""},
                '12':{ time: "12", value: ""},
                '13':{ time: "13", value: ""},
                '14':{ time: "14", value: ""},
                '15':{ time: "15", value: ""},
                '16':{ time: "16", value: ""},
                '17':{ time: "17", value: ""}
            };
        }
    
    //Load data loaded from code under comment 1 into page <fixed>
    $(".time-block").each(function(){
        $(this).find(".description textarea").val(timeTrackObject[$(this).attr("data-time")].value);
    });
    
    // moment.js to show what day it is.
    let dateString = moment().format('dddd') + ", " +moment().format("MMM Do YY");
    $("#currentDay").html(dateString.substring(0, dateString.length - 5) + "th");
    
    //checks the hour of the current day to the hour for HTML data-element to decide it's background color.
    const m = moment();
    $.each($(".time-block"), function(index, value){
        let dateHour = $(value).attr("data-time");
        if (Number(dateHour) === m.hour()) {
            $(this).find("textarea").addClass('present');
        } else if(Number(dateHour) < m.hour()){
            $(this).find("textarea").addClass('past');
        } else {
            $(this).find("textarea").addClass('future');
        } 
    });
    
    //When a user clicks the save button data is saved to the objects 
    //and to local storage changing the data loaded in new sessions.
    $("body").on('click', ".saveBtn", function(e){
    
    //Sets variables for calling data
    let hour = $(this).closest(".time-block").attr("data-time");
    let textValue = $(this).closest(".time-block").find(".description textarea").val();
    //let day = moment().format("MMM Do YY").substring(0,5);
    
    // Value is overrided by for the objects value
    timeTrackObject[hour].value = textValue;
    
    //Sends value to local storage for later use.
    localStorage.setItem('timeTrackObject', JSON.stringify(timeTrackObject));
    
    });
    
    // Button to clear all data.
    
    $("body").on('click', "#clearData", function(e){
        localStorage.setItem('timeTrackObject', "");
        $(".time-block").each(function(){
            $(this).find(".description textarea").val('');
        });
    });
    
});