// Jacob Sullivan
// Jacob_sullivan@student.uml.edu
// 11/1/2022
// HW4
// script.js

// This file serves to create the Multiplication Table, as well as check for the validity of the form input from the HTML file. It edits the HTML file to add the table in

// This function first validates that the form has been filled out properly. It then, creates a multiplication table from the inputs.
// It takes the form as an input
// It can return false if the validation comes back as a failure
function multTable(form) {
    if(validateForm(form) == false) {   
        return false;
    }
    var fhorz = Number(form.fhorz.value);   //converts the values to Numbers, this is because they will be strings initally
    var shorz = Number(form.shorz.value);
    var fvert = Number(form.fvert.value);
    var svert = Number(form.svert.value);
    var table = document.createElement("table"); //creates an HTML table 
    table.setAttribute('border', 1);
    var row = document.createElement("thead"); //creates a HTML thead, to differentiate from the rest of the table
    var col = document.createElement("th"); //creates the corner cell that will be empty
    var text = document.createTextNode("");
    col.appendChild(text);  //takes the cell and appends it to the column
    row.appendChild(col); //takes the column and appends it to the row
    for(var j = fhorz; j <= shorz; j++) {   //for loop to get the first header row
        var col = document.createElement("th");
        var text = document.createTextNode(j);
        col.appendChild(text);
        row.appendChild(col);
    }
    table.appendChild(row); //adds the header row to the table
    var body = document.createElement("tbody"); //creates HTML tbody for the rest of the rows.
    for (var i = fvert; i <= svert; i++) { // for loop for each column
        var row = document.createElement("tr"); // creating the HTML row
        var col = document.createElement("th"); // the first element of the row is also a header cell
        var text = document.createTextNode(i);
        col.appendChild(text);
        row.appendChild(col);
        for (var j = fhorz; j <= shorz; j++) { //nested loop to make a column in each row
            var col = document.createElement("td");
            var text = document.createTextNode(i * j); //multiplication calculation
            col.appendChild(text);
            row.appendChild(col);
        }
        body.appendChild(row); //adding newly made row to body 
    }
    table.appendChild(body); //adding body to the table

    if(document.getElementById("table").hasChildNodes()) { //this is here to allow re-generation of the table
        document.getElementById("table").replaceChild(table, document.getElementById("table").firstChild); //replaces the table if one exists
    }
    else {
        document.getElementById("table").appendChild(table);
    }

}
// This function checks the form for invalid inputs. It checks each text box and then compares the min and max values to confirm min <= max.
// Takes the form along with all of it's children values
// Returns a false if a test is failed.
function validateForm(form) {
    document.getElementById("fhorz").style.backgroundColor = "#ffffff"; //first sets the textboxes and table space to normal, as the errors could change them
    document.getElementById("shorz").style.backgroundColor = "#ffffff";
    document.getElementById("fvert").style.backgroundColor = "#ffffff";
    document.getElementById("svert").style.backgroundColor = "#ffffff";
    document.getElementById("table").style = "background-color:white; color:black;";
    if(validateText("fhorz", form.fhorz.value) == false) { return false; }  //checks each text box for individual validations
    if(validateText("shorz", form.shorz.value) == false) { return false; }
    if(Number(form.fhorz.value) > Number(form.shorz.value)) {   //checks if the min is less than the max
        document.getElementById("table").innerHTML = "The Maximum value must be greater than or equal to the minimum."; //Writes over the table to notify the user of failure
        document.getElementById("table").style = "background-color:yellow; color:red;"; 
        document.getElementById("fhorz").style = "background-color:yellow;"; //Gives the correct textbox a highlight to notify the user
        document.getElementById("shorz").style = "background-color:yellow;";
        return false;
    }
    if(validateText("fvert", form.fvert.value) == false) { return false; }
    if(validateText("svert", form.svert.value) == false) { return false; }
    if(Number(form.fvert.value) > Number(form.svert.value)) {
        document.getElementById("table").innerHTML = "The Maximum value must be greater than or equal to the minimum."; //Writes over the table to notify the user of failure
        document.getElementById("table").style = "background-color:yellow; color:red;"; 
        document.getElementById("fvert").style = "background-color:yellow;"; //Gives the correct textbox a highlight to notify the user
        document.getElementById("svert").style = "background-color:yellow;";
        return false;
    }
}

// This function checks the Text Box for empty values, non-number characters, numbers outside of the range and numbers that are not integers.
// Takes the string that is the name of the ID of the text box and the value in the text box.
// Returns a false if the test is failed.
function validateText(input, formValue) {
    if(formValue == "") {
        document.getElementById("table").innerHTML = "No Value can be left empty."; //Writes over the table to notify the user of failure
        document.getElementById("table").style = "background-color:yellow; color:red;"; 
        document.getElementById(input).style = "background-color:yellow;"; //Gives the correct textbox a highlight to notify the user
        return false;
    }
    if(isNaN(formValue)) {
        document.getElementById("table").innerHTML = "The Value must be an numerical value."; //Writes over the table to notify the user of failure
        document.getElementById("table").style = "background-color:yellow; color:red;"; 
        document.getElementById(input).style = "background-color:yellow;"; //Gives the correct textbox a highlight to notify the user
        return false;
    }
    var num = Number(formValue);
    if(num > 50 || num < -50 || Number.isInteger(num) == false) {
        console.log(formValue);
        document.getElementById("table").innerHTML = "The Value must be an integer between -50 and 50."; //Writes over the table to notify the user of failure
        document.getElementById("table").style = "background-color:yellow; color:red;"; 
        document.getElementById(input).style = "background-color:yellow;"; //Gives the correct textbox a highlight to notify the user
        return false;
    }
}