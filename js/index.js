
const categoryData=()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res=>res.json())
    .then(data=>displayCategory(data.data.news_category))
    .catch(er=>console.log(er))
}
const displayCategory=datas=>{
    const categoriesContainer=document.getElementById('category-container')
    categoriesContainer.innerText='';
    datas.forEach(data => {
        const categoriesDiv=document.createElement('span')
        // console.log(data)
        categoriesDiv.innerHTML=`

        <p onclick="dataCategoryId('${data.category_id}')">${data.category_name}</p>
       
        `
        categoriesContainer.appendChild(categoriesDiv)
    });

}
const dataCategoryId=(id)=>{
 const url=(`https://openapi.programming-hero.com/api/news/category/${id}`)
 fetch(url)
 .then(res=> res.json())
 .then(data=>dataDisplay(data.data))
}
const dataDisplay=datas=>{
    const mainContainer=document.getElementById('main-container')
    mainContainer.innerText='';

    const notFound=document.getElementById('not-found')
    if(datas.length === 0){
      notFound.classList.remove('d-none')
    }else{
      notFound.classList.add('d-none')
    }

datas.forEach(data=>{
    // console.log(data)
    const mainDiv=document.createElement('div')
    mainDiv.classList.add('col')
    mainDiv.innerHTML=`
    <div class="card h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
       <img src="${data.thumbnail_url}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${data.title}</h5>
           <p class="card-text">${data.details.slice(0, 300)}</p>
           <div class="d-flex justify-content-between align-items-center">
           <div class="d-flex align-items-center">
           <img src="${data.author.img}" class="img-fluid w-25 h-25 rounded-circle">
           <h5>${data.author.name? data.author.name:'There is no data '}</h5>
             </div>
            <h5>${data.total_view? data.total_view:'There is no data'}</h5>
          </div>
    
         </div>
      </div>
    `
    mainContainer.appendChild(mainDiv)
})
}
categoryData()