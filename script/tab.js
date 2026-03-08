
// bug and help related function
const createElements = (arr)=>{
    const htmlElements = arr.map(el => `<span class="rounded-full bg-red-200 text-red-500 px-4 py-1">${el}</span>`);
    return(htmlElements.join(' '));
}


let allIssue = [];


//load card 

const loadCard = ()=>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res=>res.json())
    .then(json =>{
         allIssue = (json.data);
        displayCard(allIssue);
    });
       
};


// filter function

const handleFilter =(status)=>{
    
    if(status === "all"){
        displayCard(allIssue);
    }
    else{
        const filterData = allIssue.filter(item => item.status === status);
        displayCard(filterData);

    }
};



// add eventlistener

document.getElementById("all-btn").addEventListener("click", ()=>{
    handleFilter("all")
});
document.getElementById("open-btn").addEventListener("click", ()=>{
    handleFilter("open")
});
document.getElementById("closed-btn").addEventListener("click", ()=>{
    handleFilter("closed")
});

 


// displaycard

const displayCard = (datas)=>{

    document.getElementById("issue-count").innerText = datas.length;
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    datas.forEach(data => {

        const statusCLass = data.status ==="open" ? "border-green-500" : "border-purple-500";
        const statusIcon = data.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png";
        const newDiv = document.createElement("div");
        // console.log(data);
        newDiv.innerHTML = `
            <div class="card w-full h-full  mx-[2px] mt-10 px-1 pt-4 pb-0 shadow-xl border-t-4 ${statusCLass} ">

                <div class="flex justify-between items-center  rounded-md ">

                    <div>
                        <img src="${statusIcon}" alt="">
                    </div>

                    <div class="bg-red-50 text-red-500 rounded-full px-5 py-1 ">
                        <p>${data.priority}</p>
                    </div>

                </div>

                <div class="mt-8">
                    <h2 class="font-semibold">${data.title}</h2>
                    <p class="text-[#64748B]">${data.description}</p>
                </div>



                <div class="mt-5 ">
                    <div class="flex flex-wrap gap-2">
                        ${createElements(data.labels)}
                    </div>
                </div>

                <hr class="mt-5 border-gray-400">

                <div class="mt-5 text-[#64748B]">
                    <p>${data.author}</p>
                    <p>1/15/2024</p>
                </div>
            </div>
        
        `;
        cardContainer.append(newDiv);
    });

};
loadCard();


