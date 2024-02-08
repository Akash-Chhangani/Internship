
function getData (dataId) {
    return new Promise ((resolve, reject) =>{
        setTimeout (()=>{
            console.log("data1",dataId);
           resolve(200);
        },2000);
    });
}

// Call Back
getData(1,()=>{
    console.log("Getting Data 2 ......");
    getData(2,()=>{
        console.log("Getting Data 3 ......");
        getData(2,()=>{
            console.log("Getting Data 4 ......");
            getData(4);
        });
    });
});

// Promise Chain

console.log("fetching the data 1........");
getData(1)
.then((res)=>{
    return getData(2);
})
.then((res)=>{
    return getData(3);
})
.then((res)=>{
    return getData(4);
});


// Async - Await
async function gatingData(){
    console.log("Getting Data 1 ...... ");
    await getData(1);
    console.log("Getting Data 2 ...... ");
    await getData(2);
    console.log("Getting Data 3 ...... ");
    await getData(3);
    console.log("Getting Data 4 ...... ");
    await getData(4);
    console.log("Getting Data 5 ...... ");
    await getData(5);
    console.log("Getting Data 6 ...... ");
    await getData(6);
}

// IIFE : Immediately Invoked Function Expression

(async function () {
    console.log("Getting Data 1 ...... ");
    await getData(1);
    console.log("Getting Data 2 ...... ");
    await getData(2);
    console.log("Getting Data 3 ...... ");
    await getData(3);
    console.log("Getting Data 4 ...... ");
    await getData(4);
    console.log("Getting Data 5 ...... ");
    await getData(5);
    console.log("Getting Data 6 ...... ");
    await getData(6);
})();


gatingData(); // Not Necessary in IIFE Function 