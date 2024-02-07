function buildCourseInputs(count, list) {
    const defaultCourses = {
        course1: `WEB215 - Advanced Markup and Scripting: Increase confidence and proficiency in building web applications with JS frameworks.`,
        course2: `WEB250 - Database Driven Websites: Learn what PHP was doing behind the scenes in WordPress and harness its capabilities.`,
        course3: `CSC221 - Advanced Python Programming: Test my capacity to understand and utilize advanced algorithms.`,
        course4: `ENG112 - Writing/Research in the Disciplines: Revisit my love of writing and face my fear of citations.`,
        course5: ``       
    }
    for (i = 0; i < count; i++){
        let item = document.createElement("li")
        let input = document.createElement("textArea")
        input.setAttribute('name', `course${i + 1}`)
        input.value = defaultCourses[`course${i + 1}`];
        item.appendChild(input);
        list.appendChild(item);
    }
}

function courseForm() {
    
    let inputContainer = document.querySelector('fieldset[id="courseInputs"')
    let courseRadioButtons = document.querySelectorAll('input[name="courseCount"]')
    
    window.addEventListener("load", () => {
        let defaultCount = document.querySelector('input[name="courseCount"]:checked').value;
        let defaultList = document.createElement("ol")
        defaultList.setAttribute('id', 'courseList');
        buildCourseInputs(defaultCount, defaultList);
        inputContainer.appendChild(defaultList);
    })

    const updateInputs = () => {
        let newCount = document.querySelector('input[name="courseCount"]:checked').value;
        let courseList = document.createElement("ol")
        courseList.setAttribute('id', 'courseList');
        buildCourseInputs(newCount, courseList);
        document.querySelector('ol[id="courseList').replaceWith(courseList);
    }
    
    courseRadioButtons.forEach(radioBtn => {
        radioBtn.addEventListener("change", updateInputs);
    })
}

function populateDefaults() {
    courseForm()

    const defaultUser = {
        introName: "Benjamin Ferrell",
        personalBG: `NC > FL > NC > SC > NC. Have lived in the Charlotte area most of my life.`,
        professionalBG: `Worked retail and warehouse jobs for too many years. Now estimating insulation projects and drafting shop drawings.`,
        academicBG: `Studied animation about 20 years ago, now majoring in Full Stack Programming.`,
        subjectBG: `HTML & Visual Basic in high school, then the prerequisites for this course, and some SQL Server experience.`,
        computerPlatform: "Windows 11",
        funnyItem: `My 8yo told me “you are Kenough,” so maybe I should watch the Barbie movie…`
    }

    const formInputs = {
        introName: document.querySelector('input[name="introName"]'),
        personalBG: document.querySelector('textarea[name="personalBG"]'),
        professionalBG: document.querySelector('textarea[name="professionalBG"]'),
        personalBG: document.querySelector('textarea[name="personalBG"]'),
        academicBG: document.querySelector('textarea[name="academicBG"]'),
        subjectBG: document.querySelector('textarea[name="subjectBG"]'),
        computerPlatform: document.querySelector('input[name="computerPlatform"]'),
        funnyItem: document.querySelector('textarea[name="funnyItem"]')
    }

    for (const property in defaultUser) {
        formInputs[property].value = defaultUser[property];
    }
}

window.onload = populateDefaults();

document.querySelector('button[type="submit"]').onclick = function printIntroduction() {
    // hide input form
    const completedForm = document.querySelector('form[id="introForm"]');
    completedForm.style.display = "none";
    
    // load photo and caption & reveal hidden figure element
    const main = document.querySelector('main');
    const userFigure = document.createElement('figure');
    const photoFile = document.getElementById('photoFile');
    const userPhoto = new Image();
    userPhoto.setAttribute('id', 'userPhoto');
    if(photoFile.value) {
        userPhoto.src = URL.createObjectURL(photoFile.files[0])
    } else {
        userPhoto.src = "images/jump_cell_small.jpg";
    }
    userFigure.appendChild(userPhoto);
    const photoCaption = document.getElementById('photoCaption').value;
    const userCaption = document.createElement('figcaption');
    userCaption.setAttribute('id', 'userCaption');
    userCaption.innerText = photoCaption;
    userFigure.appendChild(userCaption);
    main.append(userFigure);
    
    // create unordered list and add name
    const introduction = document.createElement('ul');
    let introName = document.querySelector('input[name="introName"]').value;
    let nameItem = document.createElement("li");
    nameItem.style.listStyleType = "none";
    let nameHeading = document.createElement("h4");
    nameHeading.innerText = introName;
    nameItem.appendChild(nameHeading);
    introduction.appendChild(nameItem);

    // load additional inputs and create list items
    const userBackground = {
        "Personal Background: ": document.querySelector('textarea[name="personalBG"]').value,
        "Professional Background: ": document.querySelector('textarea[name="professionalBG"]').value,
        "Academic Background: ": document.querySelector('textarea[name="academicBG"]').value,
        "Subject Background: ": document.querySelector('textarea[name="subjectBG"]').value,
        "Computer Platform: ": document.querySelector('input[name="computerPlatform"]').value,
    }
    let backgroundTitles = Object.keys(userBackground);
    let backgroundInfo = Object.values(userBackground);
    for (let i = 0; i < backgroundInfo.length; i++) {
        let bgListItem = document.createElement("li");
        bgListItem.innerHTML = `<strong>${backgroundTitles[i]}</strong> ${backgroundInfo[i]}`;
        introduction.appendChild(bgListItem);
    }

    // create nested list of courses
    let courseHeading = document.createElement("li");
    courseHeading.innerHTML = "<strong>Courses I am taking:</strong>";
    introduction.appendChild(courseHeading);
    let courseList = document.createElement("ul");
    let courseCount = document.querySelector('input[name="courseCount"]:checked').value;
    for (i = 0; i < courseCount; i++) {
        let courseItem = document.createElement("li");
        courseItem.innerText = document.querySelector(`textarea[name="course${i+1}"]`).value;
        courseList.appendChild(courseItem);
    }
    introduction.appendChild(courseList);

    // convert checkbox input into string output & add to list
    let languageBoxes = document.querySelectorAll('input[name="languages"]:checked');
    let languageArray = []
    for (var box of languageBoxes) {
        languageArray.push(box.value);
    }
    let languageOutput = "<strong>Languages I am learning:</strong> " + languageArray.join(' | ');
    let langItem = document.createElement("li");
    langItem.innerHTML = languageOutput;
    introduction.append(langItem);

    // add funny item last
    let funnyItem = document.querySelector('textarea[name="funnyItem"]').value;
    let funnyListItem = document.createElement("li");
    funnyListItem.innerHTML = "<strong>Funny/Interesting Item to Remember me by:</strong> " + funnyItem;
    introduction.appendChild(funnyListItem);

    // add introduction to main
    main.appendChild(introduction);

    return false;
} 