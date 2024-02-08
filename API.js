const URL ="https://cat-fact.herokuapp.com/facts";
const factPara = document.querySelector("#fact");
const button = document.querySelector("#btn");

const getFats = async ()=>{
    console.log("Getting Data.......");
    let response = await fetch(URL);
    console.log(response);//JSON Format
    let data = await response.json();
    factPara.innerText = data[0].text;
};

button.addEventListener("click",getFats);