export default function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if(values.surname === "") {
        error.surname = "Surname should not be empty"
    }
    else {
        error.surname = ""
    }

    if(values.age === "") {
        error.age = "age should not be empty"
    }
    else {
        error.age = ""
    }

    if(values.dob === "") {
        error.dob = "dob should not be empty"
    }
    else {
        error.dob = ""
    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ""
    }

    return error;
}