


const filterArray = [];


const getAllJobs = async ()  => {
    const res = await fetch("data.json");
    const data = await res.json();

   showAllJobs(data);
}


const showAllJobs = (data) => {

const listingHTML = data.map((card) => {
const {new: newJob, company, logo, position, featured, postedAt, contract, location} = card;
    const skills = [card.role, card.level, ...card.tools, ...card.languages];
    const skillsButtons = skills.map((skill) => `<button type="button" onclick="addToFilter(event)" class="skill-btn btn" value="${skill}" >${skill}</button>`);

     return `
        <div class="card ${newJob && featured ? "hl" : ''}" data-skills="${skills.join(' ')}">
                <div class="job-container">
                    <img class="logo" src="${logo}" alt="${company}"></img>

                   <div class="job-content">
                        <div class="job-info">
                              <h3>${company}</h3>

                              ${newJob ? `<div class="badge new">NEW!</div>`: ''}
                              
                             ${featured ? `<div class="badge featured">FEATURED</div>` : ''}
                        </div>

                        <h3 class="job-title">${position}</h3>

                        <div class="job-details">
                               <span>${postedAt}</span> 
                               <span>${contract}</span> 
                               <span>${location}</span>
                        </div>
                        
                     </div> 
            

                </div>

                <div class="skills-wrapper">
                    ${skillsButtons.join('')}
                </div>
        </div>
        `;
     }).join('');

 $(".listing-wrapper").html(listingHTML);
}







const  addToFilter = (e) => {
    const skillValue = $(e.target).val();

    if(filterArray.indexOf(skillValue) > -1) {
        return;  
    }else{
        filterArray.push(skillValue);
        createCatergory(filterArray);
    }

}


const removeFromFilter = (e) => {
    const skillValue = $(e.target).val();
    const skillIndex =  filterArray.indexOf(skillValue);
    filterArray.splice(skillIndex, 1);
    createCatergory(filterArray);
}



const clearFilter = () =>{
    filterArray.length = 0;
    createCatergory(filterArray);
}


const createCatergory = (arr) => {
    if(arr.length === 0) {
        getAllJobs();
        $('.filter-wrapper').removeClass('show');
        return;
    }

    $('.filter-wrapper').addClass('show');
    showOrHideCard(arr);

 const categoryHTML = arr.map((val) =>{
    return `
      <div class="catergory">
        <span>${val}</span>
        <button type="button" onclick="removeFromFilter(event)" value="${val}" class="remove btn"></button>
      </div>
    `
  }).join('');

  $(".catergory-wrap").html(categoryHTML);

}




const showOrHideCard = (arr) => {

    $('.card').each((index, card) => {
        const cardSkills = $(card).data("skills");
        let showCard = false;

        arr.forEach(skill => {
            if (cardSkills.includes(skill)) {
                showCard = true;
                return; 
            }
        });

        if (showCard) {
            $(card).show(); 
        } else {
            $(card).hide(); 
        }
    });

}





$('.clearAll').click(clearFilter);

getAllJobs();