const URL ="https://cat-fact.herokuapp.com/facts";

const getFats = async ()=>{
    console.log("Getting Data.......");
    let response = await fetch(URL);
    console.log(response);
}