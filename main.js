// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    let shirt_document = document.getElementsByClassName('T-SHIRTS')[0];
    for (let i =0; i < shirts.length;i++){
        let shirtElement = document.createElement('div');
        let shirtImageA = document.createElement('button');
        shirtImageA.setAttribute('class', 'shirtImageButton');
        shirtImageA.addEventListener("click", function() {
            localStorage.setItem('shirt_number', i);
            window.location.href = "details.html";
            localStorage.setItem('shirt_color', 'white');
        });
        let shirtImage = document.createElement('img');
        shirtImage.src = shirts[i].default.front;
        shirtImage.setAttribute('class','image');
        shirtImageA.appendChild(shirtImage);
        shirtElement.appendChild(shirtImageA);
        let shirtName = document.createElement('div');
        shirtName.innerHTML = shirts[i].name;
        shirtName.setAttribute('class','name');
        shirtElement.appendChild(shirtName);
        let shirtColor = document.createElement('div');
        let shirtcolors=Object.keys(shirts[i].colors).length;
        shirtColor.innerHTML = "Available in "+ shirtcolors +" colors";
        shirtColor.setAttribute('class','colors');
        shirtElement.appendChild(shirtColor);
        let button = document.createElement('div');
        button.setAttribute('class', 'shirt_button');
        let leftButton = document.createElement('button');
        leftButton.addEventListener("click", function() {
            window.location.href = "not_implemented.html";
        })
        leftButton.innerHTML = "Quick View";
        leftButton.setAttribute('class', 'leftAndRight_button');
        button.appendChild(leftButton);
        let rightButton = document.createElement('button');
        rightButton.addEventListener("click", function() {
            localStorage.setItem('shirt_number', i);
            window.location.href = "details.html";
            localStorage.setItem('shirt_color', 'white');
        });
        rightButton.innerHTML = "See Page";
        rightButton.setAttribute('class', 'leftAndRight_button');
        button.appendChild(rightButton);
        shirtElement.appendChild(button);
        
        
        shirtElement.setAttribute('class', 'shirt_box');
        shirt_document.appendChild(shirtElement);
    }
};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    let i = localStorage.getItem('shirt_number');
    let shirt_detail_name = document.getElementsByClassName('shirt_details_name')[0];
    let shirt_name = document.createElement('p');
    shirt_name.innerHTML = shirts[i].name;
    shirt_name.setAttribute('class', 'details_name');
    shirt_detail_name.appendChild(shirt_name);


    let shirt_detail_document = document.getElementsByClassName('shirt_details')[0];
    let shirtElement = document.createElement('div');
    shirtElement.setAttribute('class', 'details_element');
    let shirtElement_right = document.createElement('div');
    shirtElement_right.setAttribute('class', 'detail_element_right');
    let shirtImage = document.createElement('img');
    shirtImage.src = shirts[i].default.front;
    shirtImage.setAttribute('class','details_image');
    shirtElement.appendChild(shirtImage);
    let shirtcolors=Object.keys(shirts[i].colors).length;
    let button = document.createElement('div');
    button.setAttribute('class', 'details_buttons');
    let color_left = document.createElement('p');
    color_left.style = 'display:inline';
    color_left.innerHTML = "Color :";
    button.appendChild(color_left);
    let color_array = [];
    for (const [key] of Object.entries(shirts[i].colors)) {
        color_array.push(`${key}`);
    }
    for (let j =0; j < shirtcolors;j++){
        let color_Button = document.createElement('button');
        color_Button.innerHTML = color_array[j];
        color_Button.style = "background-color:" + color_array[j];
        color_Button.addEventListener("click", function() {
            localStorage.setItem('shirt_color', color_array[j]);
            let side = localStorage.getItem("shirt_side");
            let color = localStorage.getItem("shirt_color");
            shirtImage.src = shirts[i]["colors"][color][side];
        });
        color_Button.setAttribute('class', 'details_button');
        button.appendChild(color_Button);
    }
    let front_shirt = document.createElement('button');
    front_shirt.innerHTML = "Front";
    front_shirt.setAttribute('class','side_button');
    front_shirt.addEventListener("click", function() {
        localStorage.setItem('shirt_side', "front");
        let side = localStorage.getItem("shirt_side");
        let color = localStorage.getItem("shirt_color");
        shirtImage.src = shirts[i]["colors"][color][side];
    });
    
    let back_shirt = document.createElement('button');
    back_shirt.innerHTML = "Back";
    back_shirt.setAttribute('class','side_button');
    back_shirt.addEventListener("click", function() {
        localStorage.setItem('shirt_side', "back");
        let side = localStorage.getItem("shirt_side");
        let color = localStorage.getItem("shirt_color");
        shirtImage.src = shirts[i]["colors"][color][side];

    });
    let shirt_price = document.createElement('p');
    shirt_price.innerHTML = shirts[i].price;
    shirt_price.setAttribute('class', 'shirt_price');
    let shirt_description = document.createElement('p');
    shirt_description.innerHTML = shirts[i].description;
    shirt_description.setAttribute('class', 'shirt_description');
    let side = document.createElement('p');
    side.style = 'display:inline';
    side.innerHTML = "Side :";
    let color = document.createElement('p');
    color.style = 'display:inline';
    color.innerHTML = "Color :";



    shirt_detail_document.appendChild(shirtElement);


    shirtElement_right.appendChild(shirt_price);
    shirtElement_right.appendChild(shirt_description);
    shirtElement_right.appendChild(side);
    shirtElement_right.appendChild(front_shirt);
    shirtElement_right.appendChild(back_shirt);
    shirtElement_right.appendChild(button);
    shirt_detail_document.appendChild(shirtElement_right);
};