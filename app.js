// get data from local storage
const storedState = localStorage.getItem('state')

// load state or initialise if not state in local storage
let state = JSON.parse(storedState) || { cookieCount: 0, cps: 1, lifetimeCount:0, buildingCount:0,};

// get cookie 
const cookie = document.getElementById('cookie');

// get counter
const counter = document.getElementById('counter');

// number formatter
const formatter = Intl.NumberFormat('en')

// setInterval to make the cookies go up each second
setInterval(() => {
    state.cookieCount += state.cps;
    state.lifetimeCount += state.cps;
    let n = formatter.format(state.cookieCount);
    counter.innerText = n;
    // updat the dom to show the new value of cookie count
}, 1000);

// setInterval to save state
// used seperate setInterval for testing purposes, adjusting time
setInterval(() => {
    // stringify state
    const stringState = JSON.stringify(state);
    // save the value into local storage
    localStorage.setItem('state', stringState);
}, 1000);

// increase cookieCount onclick
cookie.addEventListener("click", (event) => {
    state.cookieCount ++; 
    state.lifetimeCount ++;
    let n = formatter.format(state.cookieCount);
    counter.innerText = n;
})

// upgrades
// fetch data from api 
// link: 'https://cookie-upgrade-api.vercel.app/api/upgrades'
async function getUpgrades() {
    try {
        const response = await fetch(`https://cookie-upgrade-api.vercel.app/api/upgrades`);
        // check for HTTP error
        if(!response.ok){
            throw new error("HTTP error");
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
        // redirect user
        window.location.href = 'error.html';
    }
}
// get upgrade container
const upgradeDisplay = document.getElementById('upgradesContainer');

// create upgrades section
async function createUpgrades() {
    const upgrades = await getUpgrades();
    // console.log(upgrades);
    upgrades.forEach((upgrade) => {
        const upgradeBtn = document.createElement('form');
        // format values for a better display
        const cost = formatter.format(upgrade.cost);
        const increase = formatter.format(upgrade.increase);
        upgradeBtn.className = 'upgrade upgrade${upgrade.name}';
        // set form inputs to get data on submit
        upgradeBtn.innerHTML = `
        <button type="submit" class="upgradeBtn"><h2>${upgrade.name}</h2>
        <input name="cost" type="hidden" value="${upgrade.cost}">
        <input name="name" type="hidden" value="${upgrade.name}">
        <input name="increase" type="hidden" value="${upgrade.increase}">
        <h3>Cost: ${cost}</h3><h3>CPS: +${increase}</h3></button>`;
        upgradeBtn.addEventListener("submit", (event) => {
            event.preventDefault();
            // console.log(event);
            const formData = new FormData(upgradeBtn);
            const upgradeObject = Object.fromEntries(formData);
            // console.log(upgradeObject);
            purchase(upgradeObject);
        })
        upgradeDisplay.appendChild(upgradeBtn);
    });
}

createUpgrades();


// get error modal
const errorModal = document.getElementById('errorModal');
// enable closing modal
const errorClose = document.getElementById('errorClose');
document.addEventListener('click',() => {
    errorModal.close();
})
// purchase upgrades
async function purchase(upgrade) {
    // convert upgrade inputs back into ints
    const cost = parseInt(upgrade.cost);
    const increase = parseInt(upgrade.increase);
    // check if user can afford upgrade
    if (state.cookieCount < cost){
        //TODO
        errorModal.showModal();
    } else {
        state.cookieCount = state.cookieCount - cost;
        state.cps = state.cps + increase;
        state.buildingCount = state.buildingCount + 1;
        await track(upgrade.name);
        // update display on purchase
        await createUpgradeDisplay();
        await updateCps();
    }
}


// track upgrades bought
async function track(name) {
    // initialise found
    let found = false;
    // check if key exists
    for (const key in state) {
        if (key == name){
            state[key]++;
            found = true;
            break;
        };
    }
    // if not found, create new key 
    if (!found){
        state[name] = 1;
    }
}

// update cps
const cpsDisplay = document.getElementById('cps');
async function updateCps() {
    const cps = formatter.format(state.cps);
    // console.log(cps);
    cpsDisplay.innerText = `${cps}`;
}
// call for initial display
updateCps();

// create upgrades display
// create array of images
let images = [
    {
        'Auto-Clicker': 'assets/images/cursor.png',
    },
    {
        'Enhanced Oven': 'assets/images/oven.png',
    },
    {
        'Cookie Farm': 'assets/images/farm.png',
    },
    {
        'Robot Baker': 'assets/images/robot.png',
    },
    {
        'Cookie Factory': 'assets/images/factory.png',
    },
    {
        'Magic Flour': 'assets/images/flour.png',
    },
    {
        'Time Machine': 'assets/images/time-machine.png',
    },
    {
        'Quantum Oven': 'assets/images/quantum.png',
    },
    {
        'Alien Technology': 'assets/images/alien.png',
    },
    {
        'Interdimensional Baker': 'assets/images/interdimensional-baker.png',
    },
]

// get display
const display = document.getElementById('accordion');

async function createUpgradeDisplay() {
    // clear display to update
    display.innerHTML = ``;
    // loop through state
    for (const key in state){
        if (key == "cookieCount" || key == "cps" || key == "lifetimeCount" || key == "buildingCount"){
            continue;
        } else{
            // create display elements
            // console.log(key);
            const acElement = document.createElement('li');
            acElement.innerHTML = `
            <input class="toggle" type="checkbox" name="${key}" id="${key}">
            <label for="${key}">${key}</label>
            <div id="${key}-image-container" class="asset-image-container">
                
            </div>`
            display.appendChild(acElement);
            // get image container
            const keyIC = document.getElementById(`${key}-image-container`);
            // get asset count from state
            for (let i = 0; i < state[key]; i++){
                // console.log(state[key]);
                const image = document.createElement('img');
                image.className = "asset";
                // TODO
                // get correct image src
                // loop through images array
                for (const icon of images){
                    // get key for comparison 
                    const imgKey = Object.keys(icon);
                    if (imgKey == key){
                        image.src = icon[imgKey];
                        break;
                    };
                };
                keyIC.appendChild(image);
            };
            // console.log(keyIC);
        }
    };
};

createUpgradeDisplay();


//get stats button
const statBtn = document.getElementById('statBtn');
const closeModal = document.getElementById('modalClose');
const modal = document.getElementById('modal');
const statDisplay = document.getElementById('statsContainer');
statBtn.addEventListener('click', () => {
    modal.showModal();
    createStats();
});

closeModal.addEventListener('click', () => {
    modal.close();
});

// populate modal
async function createStats() {
    // decided to keep track of building purchases in state so that a for loop if not being ran every time
        // let buildingCount = 0;
        // for (const key in state){
        //     if (key == "cookieCount" || key == "cps" || key == "lifetimeCount"){
        //             continue;
        //     } else{
        //        buildingCount += state[key];
        //        console.log(buildingCount);
        //     }
        // }
    const cookies = formatter.format(state.cookieCount);
    const allTime = formatter.format(state.lifetimeCount);
    const building = formatter.format(state.buildingCount);
    statDisplay.innerHTML = ``;
    const stats = document.createElement('div');
    stats.innerHTML = `
    <li>Cookies in bank: ${cookies}</li>
    <li>Cookies baked(all time): ${allTime}</li>
    <li>Buildings owned: ${building}</li>`
    statDisplay.appendChild(stats);
    
};

createStats();
