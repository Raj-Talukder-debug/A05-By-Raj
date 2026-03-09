
// bug and help related function
const createElements = (arr)=>{
    const htmlElements = arr.map(el => `<span class="rounded-full bg-red-200 text-red-500 px-4 py-1">${el}</span>`);
    return(htmlElements.join(' '));
}



const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }
    else{
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};






let allIssue = [];

//load card 

const loadCard = ()=>{
    manageSpinner(true);
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



// highlight btn

const highlightBtn = (clicked)=>{
    const btnId = ["all-btn", "open-btn", "closed-btn"];

    btnId.forEach(id =>{
        const btn = document.getElementById(id);

        if(id == clicked ){
            btn.classList.add("bg-primary" ,"text-white")
        }
        else{
             btn.classList.remove("bg-primary" ,"text-white")
        }
    });
};






// add eventlistener

document.getElementById("all-btn").addEventListener("click", ()=>{
    handleFilter("all");
    highlightBtn("all-btn");
});
document.getElementById("open-btn").addEventListener("click", ()=>{
    handleFilter("open");
    highlightBtn("open-btn");
});
document.getElementById("closed-btn").addEventListener("click", ()=>{
    handleFilter("closed");
    highlightBtn("closed-btn");
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

        newDiv.onclick=()=>{
            modalDisplay(data)       // modal call from here
        };
        // console.log(data);
        newDiv.innerHTML = `
            <div class="card  h-full  mx-[2px] mt-10 px-4 pt-4 pb-0 shadow-xl border-t-4 ${statusCLass} ">

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
    manageSpinner(false);
};
loadCard();








// modal

const modalDisplay = (data)=>{
    console.log(data);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    
             
                <div class="">
                    <h2 class="font-semibold text-2xl">Fix broken image uploads</h2>
                    <div class="flex gap-4 mt-2">
                        <div class="rounded-md bg-green-500 text-[#FFFFFF] px-2">${data.status}</div>
                        <span class="text-[#64748B]">Opened by ${data.author}</span>
                        <span class="text-[#64748B]">22/02/2026</span>
                    </div>

                    <div class="mt-5 ">
                        <div class="flex flex-wrap gap-2">
                           ${createElements(data.labels)}
                        </div>
                    </div>

                    <p>${data.description}</p>

                    <div class="bg-gray-100 ">

                       
                        <div class="flex gap-30 px-4 py-4 m-4">
                            <div>
                                <p>Assignee:</p>
                                <h3>${data.assignee}</h3>
                            </div>
                            <div>
                                <p>Priority:</p>
                                <div class="rounded-md px-4 bg-red-500 text-[#FFFFFF]">${data.priority}</div>
                            </div>
                        </div>




                    </div>
                </div>

        

    
    `;
    document.getElementById("my_modal_5").showModal();
};








// search

document.getElementById("btn-search").addEventListener("click",()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase() ;
    console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(data=>{
        const allWords = data.data;
        const filterWords = allWords.filter(item=>{
            return item.title.toLowerCase().includes(searchValue);
        })
      displayCard(filterWords);
    });
    
});