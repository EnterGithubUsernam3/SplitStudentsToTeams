

const fs = require('fs-extra');
const Member = require("./models/member");
const prompt = require("prompt-sync")();
const arrayOfRoles = ["Scrum Master", "UX Developer", "Tester", "Designer"];
var teams = [];
var organisedTeams = []
const javascriptArray = ["Andreas Mpompos", "Dimitris Gewrgiou", "Yiorgos Pavlou", "Timos Kalavrezos", "Elissaos Dimitriou", "Giwta Negga", "Dimitra Panouklia", "Gewrgia Mpitska", "Evaggelia Tzioli", "Nena Mendi", "Eli Papadopoulou"];
const pythonArray = ["Linda Tripi", "Swtiris Kwstakis", "Aggelos Spyropoulos", "Vassia Koutsilianou", "Giwta Papadimitriou", "Dimitris Kahrimanis", "Olga Koutroumanou", "Danai Batsi"];


// const theMixedArray = javascriptArray.concat(pythonArray);
// console.log(theMixedArray);

// shuffleArray(theMixedArray);






//Runing the functions
compositeFunctions();
// divider(shuffleArray(mergeArrays(javascriptArray, pythonArray)));





//Functions that are used to accomplish this excercise 


//This function merges two- till 4 arrays into one array

function mergeArrays(theFirstArray, theSecondArray, theThirdArray, theFourthArray) {
    var firstMixArray = theFirstArray.concat(theSecondArray);
    if (theThirdArray == undefined) {
        return firstMixArray;
    }
    else {
        var secondMixArray = firstMixArray.concat(theThirdArray);
        if (theFourthArray == undefined) {
            return secondMixArray;
        }
        else {
            var thirdMixArray = secondMixArray.concat(theFourthArray);
            return thirdMixArray;
        }
    }

}



//This function shuffles the elements contained in the resulting array after the merge
function shuffleArray(arrayInput) {
    var shuffledArray = [];
    for (i in arrayInput) {
        let j = Math.floor(Math.random() * arrayInput.length);
        while (shuffledArray[j] !== undefined) {
            j = Math.floor(Math.random() * arrayInput.length);
        }
        shuffledArray[j] = arrayInput[i];
    }
    // console.log(shuffledArray);
    let finalShuffle = shuffledArray.filter(elements => {
        return elements !== null && typeof elements !== undefined;
    });
    // console.log(finalShuffle);
    shuffledArray = finalShuffle;
    console.log(shuffledArray);
    return shuffledArray;
}





//This function divides the randomised elements of the resulting array into the number of teams 
// that the user chooses
function divider(arrayInput) {

    let noOfTeamMembers = parseInt(prompt("Give me the minimum number of team members per team :"));
    // console.log("I am in divider");
    if (isNaN(noOfTeamMembers)) {
        noOfTeamMembers = parseInt(prompt("Give me the minimum number of team members per team :"));
    }


    let noOfteams = Math.floor(arrayInput.length / noOfTeamMembers);
    let remainder = arrayInput.length % noOfTeamMembers;

    for (let i = 0; i < arrayInput.length; i + (noOfTeamMembers - 1)) {
        // console.log("I am in the for loop");
        if (i > arrayInput.length) {
            console.log(teams);
            return teams;
        }
        let team = arrayInput.splice(i, (noOfTeamMembers));
        teams.push(team);
    }

    //If the number of students cannot be perfectly divided to the resulting teams
    //the following code make certain that the last team that is created with less members by the rest
    //gets destroyed and each student contained in this team is assigned to another team.
    //So we get some teams with more members 
    //BUT all the teams have the minimum ammount of members that the user requested.

    if (remainder !== 0) {
        let k = 0;
        while (teams[teams.length - 1].length !== 0) {
            // console.log(teams[teams.length - 1]);
            let interimElement = teams[teams.length - 1].pop()
            // console.log(interimElement);
            if(teams[k])
            {

                teams[k].push(interimElement);
            }
            else{
                teams[0].push(interimElement);
            }
            k++;

        }
        teams.splice(teams.length - 1, 1);
        // console.log(teams);
    }
    return teams;
}

//This a function that informs that user that creates the teams
//from which class does every Student comes.
function findSource(anInput) {
    if (javascriptArray.includes(anInput)) {
        return "Javascript";
    }
    else (pythonArray.includes(anInput))
    {
        return "Python";
    }
}

//This is a function to assign each team member a team role 
function chooseRole() {
    console.log("To assign the role of scrum Master press 1 :");
    console.log("To assign the role  of UX developer press 2 :");
    console.log("To assign the role of tester press 3 :");
    console.log("To assign the role of designer  press 4 :");
    let userChoice = parseInt(prompt("Give a number between 1-4 :"));
    if (isNaN(userChoice)) {
        userChoice = parseInt(prompt("Give a number between 1-4 :"));
    }
    else if (userChoice < 1 || userChoice > 4) {
        userChoice = parseInt(prompt("Give a number between 1-4 :"));
    }

    switch (userChoice) {
        case 1:
            return "Scrum Master";
        case 2:
            return "UX Developer";
        case 3:
            return "Tester";
        case 4:
            return "Designer";
    }
}


//After the teams have been divided by the divider function
//now we assign more information about each member of a team
//This includes the class that this student comes from as well as his role in the team that he
//participates 
function createdStructuredTeams(inputArray) {
    for (let k = 0; k < inputArray.length; k++) {
        var interimTeam = [];
        console.log(`\n Team${k + 1}`);
        inputArray[k].forEach(element => {
            console.log(`\t ${element} from: ${findSource(element)} \n`);
            let organisedMember = new Member(element, findSource(`${element}`), chooseRole());
            interimTeam.push(organisedMember)
        });
        organisedTeams.push(interimTeam);
    }
    console.log(organisedTeams);
    return organisedTeams;
}


//This function prints the resulting teams in the console
//This function also exports those teams into a file named teams.txt
function printTeams(inputArray) {
    let outputText = "";
    for (let j = 0; j < inputArray.length; j++) {
        console.log(`\n Team${j + 1}`)
        outputText += `\n Team${j + 1} :`;
        inputArray[j].forEach(rows => {
            console.log(`Team member : ${rows.fullname} from : ${rows.source} and her/his role in the team is :${rows.role}`);
            outputText += ` \n \t Team member : ${rows.fullname} from : ${rows.source} and her/his role in the team is :${rows.role}`;
        });
    fs.writeFile("teams.txt",outputText,(err) => {
        if(err) throw err;
        console.log('File is created succesfully');
    });
    }

}




function compositeFunctions() {
    printTeams(createdStructuredTeams(divider(shuffleArray(mergeArrays(javascriptArray, pythonArray)))));
    // exportTheTeamsIntoAFile(createdStructuredTeams(divider(shuffleArray(mergeArrays(javascriptArray,pythonArray)))));
}

