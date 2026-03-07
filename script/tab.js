const loadCard = ()=>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res=>res.json())
    .then(json => displayCard(json.data))
};



// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }



const displayCard = (datas)=>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    datas.forEach(data => {
        const newDiv = document.createElement("div");
        console.log(data)
        newDiv.innerHTML = `
                        <div class="card w-[280px] mx-1 mt-10 p-4 shadow-xl">

                <div class="flex justify-between items-center  rounded-md ">

                    <div>
                        <img src="assets/Open-Status.png" alt="">
                    </div>

                    <div class="bg-red-50 text-red-500 rounded-full px-5 py-1 ">
                        <p>High</p>
                    </div>

                </div>

                <div class="mt-8">
                    <h2 class="font-semibold">${data.title}</h2>
                    <p class="text-[#64748B]">${data.description}</p>
                </div>



                <div>
                    <div class=" rounded-md flex gap-2 mt-5">

                        <div class=" rounded-full bg-red-200 text-red-500 px-4 py-1">
                            <p><i class="fa-solid fa-bug"></i>BUG</p>
                        </div>
                        <div class=" rounded-full bg-[#D97706]/30 text-[#D97706]/90 px-4 py-1">
                            <p><i class="fa-solid fa-circle-h"></i>help wanted</p>
                        </div>


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